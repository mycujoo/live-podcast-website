export function connect({ serverUrl, roomName }) {
    return new Promise((resolve, reject) => {
        const client = Primus.connect(serverUrl, {
            websockets: true,
            reconnect: {
                min: 2000,
                retries: 1000
            },
            transport: {
                binaryType: 'arraybuffer'
            }
        })

        client.on('open', function() {
            resolve(client)
        })
    })
}

export function disconnect({ client, recorder }){
    if (recorder) recorder.disconnect()
    if (client) client.end()
}


export function startBroadcast({ client, roomName, drawBuffer }) {
    const audioContext = window.AudioContext || window.webkitAudioContext

    const constraints = {
        audio: true,
        video: false
    }

    client.send('join', roomName)
    client.send('broadcast_started', roomName)

    return navigator.mediaDevices.getUserMedia(constraints)
        .then(function(rawStream) {
            const context = new audioContext()
            const audioInput = context.createMediaStreamSource(rawStream)
            const bufferSize = 2048
            const inputChannelsNum = 1
            const outputChannelsNum = 1
            const playbackCtx = (new audioContext)
            const recorder = context.createScriptProcessor(bufferSize, inputChannelsNum, outputChannelsNum)

            recorder.onaudioprocess = function onAudio(e) {
                // since we're recording mono, we only have the left channel
                var left = e.inputBuffer.getChannelData(0)
                client.write(left)

                drawBuffer && drawBuffer(left)
            }

            audioInput.connect(recorder)
            recorder.connect(context.destination)

            return {
                recorder,
                context
            }
        })
}

export function stopBroadcast({ client, roomName }){
    client.send('broadcast_stopped', roomName)
}

export function startListening({ client, roomName, drawBuffer }) {
    const audioContext = window.AudioContext || window.webkitAudioContext
    const context = new audioContext()

    client.send('join', roomName)

    let nextTime = 0
    let init = false
    let audioCache = []

    client.on('data', function (data) {
        const array = new Float32Array(data)
        const bufferSize = 2048
        const sampleRate = 44100
        const channelsNum = 1
        const buffer = context.createBuffer(channelsNum, bufferSize, sampleRate)

        buffer.copyToChannel(array, 0)
        audioCache.push(buffer)

        drawBuffer && drawBuffer(array)

        // make sure we put at least 5 chunks in the buffer before starting
        if (init === true || (init === false && audioCache.length > 5)) {
            init = true

            while (audioCache.length) {
                const buffer = audioCache.shift()
                const source = context.createBufferSource()

                // buffering 5 chunks yields about 0.25 seconds (each buffer chunk duration is 0.05 seconds) and it allows for reasonably smooth playback
                const delay = 0.05

                source.buffer = buffer
                source.connect(context.destination)

                if (nextTime === 0) {
                    // context.currentTime, gives you the current time as far as the audio context is concerned
                    nextTime = context.currentTime + delay
                }

                source.start(nextTime)
                nextTime += source.buffer.duration
            }

        }
    })

    return Promise.resolve(context)
}

export function stopListening({ client, roomName }){
    client.send('leave', roomName)
}


export function drawBuffer(canvas, data) {
    const width = canvas.width
    const height = canvas.height
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, width, height)

    const step = Math.ceil(data.length / width)
    const amp = height / 2

    for (let i = 0; i < width; i++) {
        let min = 1.0
        let max = -1.0

        for (let j = 0; j < step; j++) {
            const datum = data[(i * step) + j]

            if (datum < min) min = datum
            if (datum > max) max = datum
        }

        ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp))
    }
}


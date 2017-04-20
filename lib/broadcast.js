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
            client.send('join', roomName)
            client.send('broadcast_started', roomName)

            resolve(client)
        })
    })
}

export function disconnect({ client, recorder }){
    if (recorder) recorder.disconnect()
    if (client) client.end()
}


export function startBroadcast({ client, onAudioProcess }) {
    const audioContext = window.AudioContext || window.webkitAudioContext

    const constraints = {
        audio: true,
        video: false
    }

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

                onAudioProcess && onAudioProcess(left)
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


export function drawBuffer({ canvas }) {
    const width = canvas.width
    const height = canvas.height
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, width, height)

    const step = Math.ceil(data.length / width)
    const amp = height / 2

    for (var i = 0; i < width; i++) {
        var min = 1.0
        var max = -1.0

        for (var j = 0; j < step; j++) {
            var datum = data[(i * step) + j]

            if (datum < min) min = datum
            if (datum > max) max = datum
        }

        ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp))
    }
}


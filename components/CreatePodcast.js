import React from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import H1 from '../components/H1'
import Brand from '../components/Brand'
import Page from '../components/Page'
import A from '../components/A'

class CreatePodcast extends React.Component {
    render() {
        const {
            isRecording,
            roomName,
            handleStopRecording,
            handleStartRecording,
            handleChangeRoomName,
            children,
        } = this.props

        const listenUrl = process.browser
            ? `${window.location.href}listen?room=${roomName}`
            : `/listen?room=${roomName}`

        return <article>
                    <H1>Create your podcast</H1>

                    <div className="create-room">
                        {children}

                        <Input
                            big={true}
                            value={roomName}
                            onChange={handleChangeRoomName}
                            placeholder="e.g. React Amsterdam"
                            type="text"
                            name="room"
                            disabled={isRecording}
                        />

                        { isRecording
                            &&
                            <A target="_blank" href={listenUrl}>{listenUrl}</A>
                        }

                        { isRecording
                            ?
                            <Button
                                onClick={handleStopRecording}>
                                Stop
                            </Button>
                            :
                            <Button
                                disabled={!roomName}
                                onClick={handleStartRecording}>
                                Start
                            </Button>
                        }

                    </div>

                    <style jsx>{`

                        .create-room {
                            position: relative;
                        }

                        .create-room :global(button) {
                            display: block;
                            margin: 30px auto;
                        }

                        .create-room :global(canvas) {
                            position: absolute;
                            right: 0;
                            top: 0;
                            height: 122px;
                            width: 50%;
                        }

                        .create-room :global(a) {
                            display: inline-block;
                            margin-top: 10px;
                        }

                        article {
                            padding: 15px;
                        }

                    `}</style>

                </article>

    }
}


export default CreatePodcast


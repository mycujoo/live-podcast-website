import React from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import H1 from '../components/H1'
import Brand from '../components/Brand'
import Page from '../components/Page'

class CreatePodcast extends React.Component {
    render() {
        const {
            isRecording,
            roomName,
            handleStopRecording,
            handleStartRecording,
            handleChangeRoomName,
        } = this.props

        return <article>
                    <H1>Create your podcast</H1>

                    <div className="create-room">
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

                        .create-room :global(button) {
                            display: block;
                            margin: 30px auto;
                        }

                        article {
                            padding: 15px;
                        }

                    `}</style>

                </article>

    }
}


export default CreatePodcast


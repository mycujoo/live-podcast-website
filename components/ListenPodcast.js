import React from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import H1 from '../components/H1'
import Brand from '../components/Brand'
import Page from '../components/Page'

class ListenPodcast extends React.Component {
    render() {
        const {
            isListening,
            roomName,
            handleStopListening,
            handleStartListening,
        } = this.props

        return <article>
                    <H1>Listening to podcast</H1>

                    <div className="create-room">
                        <Input
                            big={true}
                            value={roomName}
                            placeholder="e.g. React Amsterdam"
                            type="text"
                            name="room"
                            disabled={true}
                        />

                        <span>

                        </span>

                        { isListening
                            ?
                            <Button
                                onClick={handleStopListening}>
                                Stop
                            </Button>
                            :
                            <Button
                                disabled={!roomName}
                                onClick={handleStartListening}>
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


export default ListenPodcast

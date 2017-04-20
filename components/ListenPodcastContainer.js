import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import * as broadcast from '../lib/broadcast'

import {
    startRecording,
    stopRecording,
} from '../actions'

import ListenPodcast from './ListenPodcast'

class ListenPodcastContainer extends React.Component {
    handleStartListening = (e) => {
        const { dispatch } = this.props
        const { roomName } = this.state

        broadcast.connect({
            serverUrl: 'wss://live-commentary-rictorres.c9users.io',
            roomName,
        }).then((client) => {

            broadcast.startBroadcast({ client }).then(({ recorder, context}) => {
                dispatch(startRecording(roomName))

                this.client = client
                this.context = context
                this.recorder = recorder
            })
        })


    }

    handleStopListening = (e) => {
        const { dispatch } = this.props

        broadcast.stopBroadcast({ client: this.client, roomName: this.state.roomName })
        broadcast.disconnect({ client: this.client, recorder: this.recorder })

        dispatch(stopRecording())
    }

    render() {
        return <ListenPodcast
            isListening={this.props.isRecording}
            roomName={this.props.roomName}
            handleStartListening={this.handleStartListening}
            handleStopListening={this.handleStopListening}
        />
    }
}

function mapStateToProps(state) {
    return {
        isRecording: state.isRecording,
        roomName: state.roomName,
    }
}

export default connect(mapStateToProps)(ListenPodcastContainer)


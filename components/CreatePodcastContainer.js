import React from 'react'
import { connect } from 'react-redux'
import * as broadcast from '../lib/broadcast'

import {
    startRecording,
    stopRecording,
} from '../actions'

import CreatePodcast from './CreatePodcast'

class CreatePodcastContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomName: '',

        }
    }

    handleChangeRoomName = (e) => {
        this.setState({
            roomName: e.target.value
        })
    }

    handleStartRecording = (e) => {
        const { dispatch } = this.props
        const { roomName } = this.state

        broadcast.connect({
            serverUrl: 'wss://live-commentary-rictorres.c9users.io',
            roomName,
        }).then((client) => {

            broadcast.startBroadcast({ client, roomName }).then(({ recorder, context}) => {
                dispatch(startRecording(roomName))

                this.client = client
                this.context = context
                this.recorder = recorder
            })
        })


    }

    handleStopRecording = (e) => {
        const { dispatch } = this.props

        broadcast.stopBroadcast({ client: this.client, roomName: this.state.roomName })
        broadcast.disconnect({ client: this.client, recorder: this.recorder })

        dispatch(stopRecording())
    }

    render() {
        return <CreatePodcast
            isRecording={this.props.isRecording}
            roomName={this.state.roomName}
            handleStartRecording={this.handleStartRecording}
            handleStopRecording={this.handleStopRecording}
            handleChangeRoomName={this.handleChangeRoomName}
        />
    }
}

function mapStateToProps(state) {
    return {
        isRecording: state.isRecording,
        roomName: state.roomName,
    }
}

export default connect(mapStateToProps)(CreatePodcastContainer)


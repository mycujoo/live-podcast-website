import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import * as broadcast from '../lib/broadcast'

import {
    startListening,
    stopListening,
} from '../actions'

import {
    drawBuffer
} from '../lib/broadcast'

import ListenPodcast from './ListenPodcast'

class ListenPodcastContainer extends React.Component {
    handleStartListening = (e) => {
        const { dispatch, roomName } = this.props

        broadcast.connect({
            serverUrl: 'wss://live-commentary-rictorres.c9users.io',
            roomName,
        }).then((client) => {

            const drawInCanvas = (data) => drawBuffer(this.canvas, data)

            broadcast.startListening({ client, roomName, drawBuffer: drawInCanvas }).then((context) => {
                dispatch(startListening(roomName))

                this.client = client
                this.context = context
            })
        })


    }

    handleStopListening = (e) => {
        const { dispatch } = this.props

        broadcast.stopListening({ client: this.client, roomName: this.props.roomName })
        broadcast.disconnect({ client: this.client })

        dispatch(stopListening())
    }

    render() {
        return <ListenPodcast
            isListening={this.props.isListening}
            roomName={this.props.roomName}
            handleStartListening={this.handleStartListening}
            handleStopListening={this.handleStopListening}>

            <canvas ref={(canvas) => this.canvas = canvas }></canvas>
        </ListenPodcast>
    }
}

function mapStateToProps(state) {
    return {
        isListening: state.isListening,
        roomName: state.roomName,
    }
}

export default connect(mapStateToProps)(ListenPodcastContainer)


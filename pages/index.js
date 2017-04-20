import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import {
    startRecording,
    stopRecording,
} from '../actions'

import Brand from '../components/Brand'
import Page from '../components/Page'

import CreatePodcastContainer from '../components/CreatePodcastContainer'

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomName: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            roomName: e.target.value
        })
    }

    handleStartRecording = (e) => {
        const { dispatch } = this.props
        const { roomName } = this.state

        dispatch(startRecording(roomName))
    }

    handleStopRecording = (e) => {
        const { dispatch } = this.props

        dispatch(stopRecording())
    }

    render() {
        const {
            isRecording,
        } = this.props

        return <Page title="Live Podcast">
            <div className="root">
                <div className="content">
                    <header>
                        <Brand />
                    </header>

                    <CreatePodcastContainer />
                </div>
            </div>

            <style jsx>{`
                .root {
                    position: relative;
                    width: 100%;
                    min-height: auto;
                    overflow-y: hidden;
                    background: url(/static/bg-pattern.png),#7b4397;
                    background: url(/static/bg-pattern.png),-webkit-linear-gradient(to left,#7b4397,#dc2430);
                    background: url(/static/bg-pattern.png),linear-gradient(to left,#7b4397,#dc2430);
                    color: #fff;
                    min-height: 100vh;
                }

                .content {
                    max-width: 1170px;
                    margin: 0 auto;
                }

            `}</style>
        </Page>
    }
}

function mapStateToProps(state) {
    return {
        isRecording: state.isRecording,
        roomName: state.roomName,
    }
}

export default withRedux(initStore, mapStateToProps)(Index)

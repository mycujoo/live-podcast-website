import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import {
    startRecording,
    stopRecording,
} from '../actions'

import Button from '../components/Button'
import Input from '../components/Input'
import H1 from '../components/H1'
import Body from '../components/Body'
import Brand from '../components/Brand'
import Page from '../components/Page'

class Index extends React.Component {

    render() {
        const { dispatch } = this.props

        return <Page title="Live Podcast">
            <div className="root">
                <div className="content">
                    <header>
                        <Brand />
                    </header>

                    <article>
                        <H1>Create your podcast</H1>

                        <div className="create-room">
                            <Input big ref={(input) => this.input = input} placeholder="e.g. React Amsterdam" type="text" name="room" />

                            { this.props.isRecording
                                ? <Button onClick={() => dispatch(stopRecording())}>Stop ({this.props.roomName})</Button>
                                : <Button onClick={() => dispatch(startRecording(this.input.value))}>Start</Button>
                            }

                        </div>

                    </article>
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

                article {
                    padding: 15px;
                }

                .create-room :global(button) {
                    display: block;
                    margin: 30px auto;
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

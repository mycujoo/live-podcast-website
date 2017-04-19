import React from 'react'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import {
    startRecording,
    stopRecording,
} from '../actions'

class Index extends React.Component {

    render() {
        const { dispatch } = this.props

        return <div className="root">
            <div className="content">
                <header>
                    <a href="#" className="brand">Live Podcast</a>
                </header>

                <article>
                    <h1>Create your podcast</h1>

                    <div className="create-room">
                        <input ref={(input) => this.input = input} placeholder="e.g. React Amsterdam" type="text" name="room" />

                        { this.props.isRecording
                            ? <button onClick={() => dispatch(stopRecording())}>Stop ({this.props.roomName})</button>
                            : <button onClick={() => dispatch(startRecording(this.input.value))}>Start</button>
                        }

                    </div>

                </article>
            </div>

            <Head>
                <title>Live Podcast</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="https://fonts.googleapis.com/css?family=Catamaran" rel="stylesheet" />
                <style>{`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: Catamaran, sans-serif;
                        color: #fff;
                    }

                    a {
                        color: #fff; text-decoration: none;
                    }

                    input {
                        font-family: inherit;
                        font-size: 16px;
                        border: 0;
                        padding: 10px;
                        border-radius: 3px;
                        width: 100%;
                    }

                    button {
                        background: #eee;
                        border: 0;
                        font-family: inherit;
                        font-size: 16px;
                        padding: 10px 15px;
                        border-radius: 3px;
                        cursor: pointer;
                    }
                `}</style>
            </Head>

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

                .brand {
                    padding: 15px;
                    display: block;
                    color: rgba(255,255,255,.7);
                    font-weight: 200;
                    font-size: 18px;
                    transition: color 300ms ease;
                }

                .brand:hover {
                    color: rgba(255,255,255,.5);
                }

                .content {
                    max-width: 1170px;
                    margin: 0 auto;
                }

                h1 {
                    font-size: 50px;
                }

                article {
                    padding: 15px;
                }

                .create-room {

                }

                .create-room input {
                    font-size: 50px;
                    padding: 20px;
                }

                .create-room button {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    background-color: transparent;
                    color: #fff;
                    margin: 30px auto;
                    display: block;
                    border-radius: 300px;
                    border: 1px solid #fff;
                    text-transform: uppercase;
                    font-size: 40px;
                    padding: 20px 50px;
                    transition: all 300ms ease;

                }

                .create-room button:hover {
                    background: #fdcc52;
                    border-color: #fdcc52;
                }





            `}</style>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        isRecording: state.isRecording,
        roomName: state.roomName,
    }
}

export default withRedux(initStore, mapStateToProps)(Index)

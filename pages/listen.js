import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import { changeRoomName } from '../actions'

import Brand from '../components/Brand'
import Page from '../components/Page'
import Content from '../components/Content'

import ListenPodcastContainer from '../components/ListenPodcastContainer'

class Listen extends React.Component {
    componentDidMount() {
        this.props.dispatch(changeRoomName(this.props.query.room))
    }

    render() {
        return <Page title="Listen to a Live Podcast">
            <Content>
                <Brand />
                <ListenPodcastContainer />
            </Content>
        </Page>
    }
}

Listen.getInitialProps = ({ query }) => {
    return { query }
}


export default withRedux(initStore)(Listen)

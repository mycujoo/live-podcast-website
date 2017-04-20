import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'

import Brand from '../components/Brand'
import Page from '../components/Page'
import Content from '../components/Content'

import CreatePodcastContainer from '../components/CreatePodcastContainer'

class Index extends React.Component {
    render() {
        return <Page title="Live Podcast">
            <Content>
                <Brand />
                <CreatePodcastContainer />
            </Content>
        </Page>
    }
}

export default withRedux(initStore)(Index)

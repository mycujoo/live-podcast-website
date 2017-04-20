import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'

import Brand from '../components/Brand'
import Page from '../components/Page'
import Content from '../components/Content'

import CreatePodcastContainer from '../components/CreatePodcastContainer'

class Index extends React.Component {
    render() {
        return <Page title="Create a Live Podcast">
            <Content>
                <Brand />
                <CreatePodcastContainer />
            </Content>
        </Page>
    }
}

Index.getInitialProps = ({ pathname }) => {
    return { pathname }
}


export default withRedux(initStore)(Index)

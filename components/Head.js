import Head from 'next/head'

export default ({ title }) => {
    return <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://fonts.googleapis.com/css?family=Catamaran" rel="stylesheet" />
    </Head>
}


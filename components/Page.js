import { injectGlobal } from 'styled-components'
import Head from './Head'

injectGlobal`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }

    body {
        font-family: Catamaran, sans-serif;
    }
`

export default ({ children, title, ...props }) => {
    return <div {...props}>
        <Head title={title} />
        {children}
    </div>
}
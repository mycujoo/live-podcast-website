import { injectGlobal } from 'styled-components'
import HtmlHead from './HtmlHead'
import Bg from './Bg'

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
    return <Bg {...props}>
        <HtmlHead title={title} />
        {children}
    </Bg>
}
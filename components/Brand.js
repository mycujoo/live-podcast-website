import styled from 'styled-components'

const Brand = styled.a`
    text-decoration: none;
    padding: 15px;
    display: inline-block;
    color: rgba(255,255,255,.8);
    font-weight: 200;
    font-size: 18px;
    transition: color 300ms ease;

    &:hover {
        color: rgba(255,255,255,.5);
    }
`

export default () => {
    return <Brand href="/">Live Podcast</Brand>
}
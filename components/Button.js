import styled from 'styled-components'

const Button = styled.button`
    background: transparent;
    font-family: inherit;
    font-size: 16px;
    cursor: pointer;
    color: #fff;
    display: inline-block;
    border-radius: 300px;
    border: 1px solid #fff;
    text-transform: uppercase;
    font-size: 40px;
    padding: 20px 50px;
    transition: all 300ms ease;

    &:hover {
        background: #fdcc52;
        border-color: #fdcc52;
    }

    ${props => props.disabled && `
        opacity: .3;
        pointer-events: none;
    `}
`

export default Button
import styled from 'styled-components'

const Input = styled.input`
    font-family: inherit;
    border: 0;
    border-radius: 3px;
    width: 100%;
    font-size: 16px;
    padding: 10px;

    ${props => props.big && `
        font-size: 50px;
        padding: 20px;
    `}

    ${props => props.disabled && `
        background: #ddd;
    `}
`

export default Input
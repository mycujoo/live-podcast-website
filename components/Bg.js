import styled from 'styled-components'

const Bg = styled.div`
    position: relative;
    width: 100%;
    min-height: auto;
    overflow-y: hidden;
    background: url(/static/bg-pattern.png),#7b4397;
    background: url(/static/bg-pattern.png),-webkit-linear-gradient(to left,#7b4397,#dc2430);
    background: url(/static/bg-pattern.png),linear-gradient(to left,#7b4397,#dc2430);
    color: #fff;
    min-height: 100vh;
`
export default Bg
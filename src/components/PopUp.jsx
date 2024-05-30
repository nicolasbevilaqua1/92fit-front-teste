import styled from "styled-components"




export default function PopUp({active, children}) {

    return(
        <Overlay $active={active}>

            <Wrapper>
                {children}
            </Wrapper>

        </Overlay>
    )
}

const Overlay = styled.div`
    position: absolute;
    display: ${props => props.$active ? 'flex' : 'none'};
    background-color: #000000ca;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    width: 70%;
    max-width: 600px;
    background-color: white;
    padding: 2rem;
    border-radius: 18px;
`
import styled from "styled-components"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"
import { faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function Footer({children}){
    const navigate = useNavigate();
    const tiktok = 'https://www.tiktok.com/@92fit'
    const email = 'mailto:contato@92fit.app'
    const instagram = 'https://www.instagram.com/092fit/'

    return(
        <FooterContainer>
            <Img src={logo} alt="" onClick={() => navigate('/')}/>

            <FooterSection>
                <SectionTitle>Contato</SectionTitle>
                <SectionText>contato@92fit.app</SectionText>
                <SectionText>(92) 98448-6776</SectionText>
            </FooterSection>

            <FooterSection>
                <SectionTitle>Sobre</SectionTitle>
                <SectionText onClick={() => navigate('/sobre')}>Sobre a 92Fit</SectionText>
                <SectionText onClick={() => navigate('/historia')}>Nossa História</SectionText>
            </FooterSection>

            <FooterSection>
                <SectionTitle>Redes sociais</SectionTitle>
                <Social>
                    <FontAwesomeIcon icon={faEnvelope} onClick={() => window.open(email, '_blank')}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faInstagram} onClick={() => window.open(instagram, '_blank')}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faTiktok} onClick={() => window.open(tiktok, '_blank')}></FontAwesomeIcon>
                </Social>
            </FooterSection>
        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding-left: 0rem;
    padding-right: 4rem;
    background-color: #fff;
    align-items: center;
    height: 10rem;
    /* position: sticky; */
    /* bo: 0; */
    
    /* box-shadow: 2px 2px 20px #76767622; */
    border-top: 2px solid #f7f7f7;
    
    img {
        height: 2rem;
    }

    img:hover {
        cursor: pointer;
    }
    
    ul {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        font-family: Roboto;
        font-size: 1.2rem;
        font-weight: 500;
        color: #393e46;
    }
    
    li {
        cursor: pointer;
    }
    li:hover{
        /* color: #fff; */
        text-shadow: 4px 4px 20px #c31fff;
    }
    
    @media (max-width: 500px) {
        /* padding-left: .8rem; */
        padding-right: .8rem;
        height: 4rem;
        /* width: 100%; */
        
        ul {
            font-size: 1rem;
        }

        img {
            height: .6rem;
        }

        h2 {
            font-size: 2rem;
            line-height: 1rem;
        }
    }
    
`

const Img = styled.img`
    @media (max-width: 500px) {
        /* font-size: .5rem;
         */
        /* width: 2rem; */
        /* size: 1rem; */
    }
`

const FooterSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: .4rem;
    
    /* @media (max-width: 500px) {
        font-size: .8rem;
    } */
`

const SectionTitle = styled.h3`
    font-size: 1.4rem;
    font-family: Roboto;
    font-weight: 500;
    margin-bottom: .3rem;
    @media (max-width: 500px) {
        font-size: .7rem;
    }
    `

const SectionText = styled.p`
    font-size: 1rem;
    font-family: Roboto;
    font-weight: 400;

    @media (max-width: 500px) {
        font-size: .5rem;
    }
`

const Social = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: .5rem;
    margin-bottom: .5rem;
    gap: .6rem;
    justify-content: space-evenly;
    font-size: 1.4rem;
    
    & > * {
        cursor: pointer;
    }
    
    @media (max-width: 500px) {
        font-size: .8rem;
        margin-top: .3rem;
        margin-bottom: .3rem;
    }
`
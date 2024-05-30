import styled from "styled-components"
import HeroBanner from "./assets/heroBanner.png"
import Header from "./components/Header"
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { useSelector } from "react-redux"
import useAuth from "./hooks/useAuthHook";
import { ToastContainer } from "react-toastify";


export default function HomeView() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.app.token);
    const name = useSelector((state) => state.app.name);

    useAuth({secure: false});

    return(
        <Container>
            <ToastContainer/>
            <Header>
                { token != '' && <li onClick={() => navigate('/main/')}>
                    Demo
                </li>}
                { token === '' && <li onClick={() => navigate('/login')}>
                    Login
                </li>}
                { token === '' && <li onClick={() => navigate('/signup')}>
                    Cadastro
                </li>}
                <li onClick={() => navigate('/ranking')}>
                    Ranking
                </li>
                { token != '' && <li onClick={() => navigate('/main/profile/analisis')}>
                    Progresso
                </li>}
                <li onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('email');
                    localStorage.removeItem('name');
                    localStorage.removeItem('id');
                    window.location.reload();
                }}>
                    Logout
                </li>
            </Header>

            <MainSection>
                <BannerSection>
                    <h2>{token != '' && name && `Olá ${name.split(' ')[0].slice(0, 12)}! Essa é a `}Sua academia de Inteligência Artificial!</h2>
                    <img src={HeroBanner} alt="" />
                </BannerSection>
            </MainSection>

            <Footer></Footer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 100%; */
    user-select: none;
    background-color: #fff;
    `


const MainSection = styled.main`
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 2rem;
    
    @media (max-width: 500px) {
        height: 80vh;
    }
    `

const BannerSection = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    
    h2 {
        font-family: Roboto;
        font-weight: 500;
        padding-left: 4rem;
        font-size: 4rem;
        line-height: 6rem;
    }

    @media (max-width: 500px) {
        img {
            width: 40%;
        }
        
        h2 {
            font-size: 1.2rem;
            padding-left: 0rem;
            line-height: 2rem;
            width: 50%;
        }
    }
`
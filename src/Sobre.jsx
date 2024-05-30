import styled from "styled-components"
import Header from "./components/Header"
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { useSelector } from "react-redux"
import useAuth from "./hooks/useAuthHook";
import { ToastContainer } from "react-toastify";


export default function SobreView() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.app.token);

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

                <section>

                <h2>Missão: <br/></h2>
                <p>"Promover a saúde e o bem-estar através de soluções personalizadas de atividades físicas, 
                    impulsionadas pela inovação e pela tecnologia de machine learning."
                </p>

                <h2>Visão:</h2>
                <p>"Tornar-se a principal plataforma fitness em saúde e bem-estar,
                    oferecendo um aplicativo inovador de machine learning que personaliza e otimiza 
                    programas de atividades físicas, proporcionando experiências transformadoras para 
                    usuários em todo o Brasil."
                </p>
                <h2>Valores: </h2>
                    <p><strong>Saúde e Bem-Estar:</strong> Priorizar a saúde e o bem-estar dos clientes como a principal 
                        motivação por trás de todas as nossas ações e decisões.</p><br/>
                    <p><strong>Inovação:</strong>  Estar constantemente aberto à inovação e à adoção de novas tecnologias 
                        para melhorar continuamente nossos serviços e produtos.</p><br/>
                    <p><strong>Empoderamento:</strong>  Capacitar os clientes a assumirem o controle de sua saúde e bem-estar, 
                        fornecendo-lhes as ferramentas e o conhecimento necessários para alcançar seus objetivos.</p><br/>
                    <p><strong>Colaboração:</strong>  Fomentar um ambiente de colaboração e trabalho em equipe, reconhecendo 
                        que o sucesso surge da cooperação entre diferentes partes interessadas.</p><br/>
                    
                </section>

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
    align-items: center;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    
    @media (max-width: 500px) {
        /* height: 80vh; */
    }

    section {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        text-align: justify;
    }

    p {
        font-family: Roboto;
        line-height: 1.2rem;
    }

    h2 {
        font-family: Roboto;
        font-size: 2rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
`
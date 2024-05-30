import styled from "styled-components"
import Header from "./components/Header"
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { useSelector } from "react-redux"
import useAuth from "./hooks/useAuthHook";
import { ToastContainer } from "react-toastify";


export default function NossaHistoriaView() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.app.token);

    useAuth({secure: false});

    return(
        <Container>
            <ToastContainer/>
            <Header>
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

                    <h2><p>História</p></h2>
                    <br/>
                    <p>Inovando o Bem-Estar: A História por Trás da 92Fit</p>
                    <br/>

                    <p> No mundo moderno, a busca pelo bem-estar físico e mental tornou-se uma prioridade para muitos. No entanto, para muitos de nós, encontrar o equilíbrio entre compromissos, responsabilidades e autocuidado pode parecer uma tarefa monumental. Foi nesse contexto desafiador que nasceu a 92Fit.</p>
                    
                    <br/>
                    <p>A história da 92Fit começou com um indivíduo cansado dos aplicativos de exercícios tradicionais e suas abordagens estáticas e pouco envolventes. Este indivíduo, nosso fundador, experimentou inúmeras vezes a frustração de tentar seguir programas de exercícios genéricos, que não se adaptavam às suas necessidades específicas e não inspiravam motivação.
                    
                    Cansado dessas experiências limitadas e pouco inspiradoras, o fundador começou a questionar: "E se os exercícios pudessem ser dinâmicos, interativos e verdadeiramente adaptados às necessidades individuais de cada pessoa?"
                    
                    Foi dessa centelha de inspiração que nasceu a visão da 92Fit: utilizar inteligência artificial e machine learning para revolucionar a forma como as pessoas abordam o exercício físico. Com a convicção de que a tecnologia poderia ser aliada do bem-estar humano, nosso fundador reuniu uma equipe 
                    de mentes criativas e apaixonadas, determinadas a transformar essa visão em realidade.</p> 
                    
                    <br/>
                    <p>A jornada da 92Fit foi marcada por desafios e descobertas. Investimos tempo e recursos consideráveis na pesquisa e desenvolvimento de algoritmos avançados, capazes de compreender as necessidades individuais de cada usuário e adaptar-se dinamicamente para oferecer uma experiência personalizada e envolvente.
                    
                    Ao longo do caminho, enfrentamos dúvidas e obstáculos, mas cada desafio nos fortaleceu e nos aproximou ainda mais de nossa missão. O compromisso com a excelência e a inovação nos guiou em cada passo, impulsionando-nos a buscar soluções cada vez mais criativas e eficazes.</p> 
                    
                    <br/>
                    <p> Hoje, a 92Fit é mais do que uma empresa de tecnologia. Somos uma comunidade dedicada ao bem-estar e ao empoderamento pessoal. Através de nossa plataforma inovadora, capacitamos indivíduos de todas as origens e habilidades a alcançar seus objetivos de saúde e fitness de uma maneira que antes parecia inatingível.
                        Na 92Fit, acreditamos que o futuro do bem-estar está na interseção entre a humanidade e a tecnologia. 
                    </p>
                    <br/>
                    <p>Continuaremos a liderar essa revolução, capacitando as pessoas a viverem vidas mais saudáveis, mais plenas e mais conectadas do que nunca.
                    
                    Junte-se a nós nesta jornada emocionante enquanto continuamos a moldar o futuro do bem-estar, um algoritmo de cada vez. Seja bem-vindo à 92Fit. 
                    Seja bem-vindo ao futuro do fitness.
                    </p>
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
        font-size: 2rem;
        margin-bottom: 1rem;
    }
`
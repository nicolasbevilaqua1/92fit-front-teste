import styled from "styled-components";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import { API_URL, colors, peitoOmbroTriceps, pernasAbdomenCostas, routine1, routine2 } from "./constants";
import Polichinelo from "./assets/polichinelo_icon.png"
import Flexao from "./assets/flexao_icon.png"
import Agachamento from "./assets/agachamento_icon.png"
import Burpee from "./assets/burpee_icon.png"
import Abdominal from "./assets/abdominal_icon.png"
import Routine from "./assets/routine_icon.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"
import useAuth from "./hooks/useAuthHook";
import { ToastContainer } from "react-toastify";




export default function MainView() {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [customRoutines, setCustomRoutines] = useState([]);
    const token = useSelector((state) => state.app.token);
    const userId = useSelector((state) => state.app.id);

    useAuth({secure: true});    
    
    useEffect(() => {
        async function fetchExercises() {
            axios.get(`${API_URL}/exercises`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then( (response) => {
                console.log(response);
                setExercises(response.data);
            })
        }
        fetchExercises();
    }, []);
    
    useEffect(() => {
        async function fetchExercises() {
            axios.get(`${API_URL}/exercises/routines/all/${userId}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then( (response) => {
                console.log(response);
                setCustomRoutines(response.data);
            })
        }
        fetchExercises();
    }, []);

    const exerciseIconsSet = {
        Polichinelos: Polichinelo,
        Flexão: Flexao,
        Burpee: Burpee,
        Agachamento: Agachamento,
        Abdominal: Abdominal,
        "Flexão diamante": Flexao,
        "Flexão diamante com apoio":Flexao,
        "Flexão de braço com apoio":Flexao,
        "Abdominal remador":Abdominal,
    }

    return (
        <Container>
            <ToastContainer/>
            <Header>
                {/* <li onClick={() => navigate('exercise')}>Exercícios</li> */}
                <li onClick={() => navigate('/ranking')}>Ranking</li>
                <li onClick={() => navigate('routine')}>Criar Rotina</li>
                <li onClick={() => navigate('profile/analisis')}>Progresso</li>
            </Header>

            <Title>Exercícios</Title>
            <Grid>

                {customRoutines.length > 0 && customRoutines.map((item, i) => (
                    <ExerciseItem key={item.name} 
                    onClick={() => navigate(`exercise/custom/${item.id}/${JSON.parse(item.routine)[1].id}?step=1&tutorial=false&qtd=${JSON.parse(item.routine)[1].qtd}&descanso=${JSON.parse(item.routine)[1].descanso}&next=${JSON.parse(item.routine)[1].next}`)} 
                    name={item.name} 
                    icon={Routine} />
                ))}

                <ExerciseItem name={'Cardio rápido'} icon={Routine} onClick={() => navigate(`exercise/${routine2[1].id}?step=1&tutorial=false&qtd=${routine2[1].qtd}&routine=1&next=${routine2[1].next}`)}></ExerciseItem>
                <ExerciseItem name={'Peito, Ombros e Tríceps'} icon={Routine} onClick={() => navigate(`exercise/${peitoOmbroTriceps[1].id}?step=1&tutorial=false&qtd=${peitoOmbroTriceps[1].qtd}&routine=2&next=${peitoOmbroTriceps[1].next}`)}></ExerciseItem>
                <ExerciseItem name={'Pernas, Abdômen e Costas'} icon={Routine} onClick={() => navigate(`exercise/${pernasAbdomenCostas[1].id}?step=1&tutorial=false&qtd=${pernasAbdomenCostas[1].qtd}&routine=3&next=${pernasAbdomenCostas[1].next}`)}></ExerciseItem>

                {exercises.length > 0 && exercises.map((exercise, index) => (
                    <ExerciseItem key={index} onClick={() => navigate(`exercise/${exercise.id}`)} name={exercise.name} icon={exerciseIconsSet[exercise.name] ? exerciseIconsSet[exercise.name] : Polichinelo} />
                ))}

            </Grid>



        </Container>
    )
}

function ExerciseItem({name, icon, onClick}) {

    return(
        <ItemWrapper onClick={onClick}>
            <img src={icon} alt="" />
            <p>{name}</p>
        </ItemWrapper>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
`

const Title = styled.h1`
    width: 100%;
    text-align: center;
    margin-top: 4rem;
    font-family: Roboto;
    font-weight: 500;
    font-size: 2rem;
`

const Grid = styled.div`
    display: flex;
    padding: 2rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    /* max-width: 400px; */
`

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center ;
    align-items: center;
    background-color: white;
    border-radius: 12px;
    padding: 1rem;
    font-family: Roboto;
    font-weight: 500;
    gap: 1rem;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.082);
    max-width: 10vw;
    
    @media  (max-width: 500px) {
        max-width: none;
    }
    
    &:hover {
        cursor: pointer;
        box-shadow: 1px 1px 10px rgba(135, 212, 248, 0.575);
    }

    p {
        word-wrap: break-word;
        text-align: center;
    }

    img {
        width: 10rem;
        height: 10rem;
    }
`
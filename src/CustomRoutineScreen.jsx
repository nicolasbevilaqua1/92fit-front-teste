import Header from "./components/Header";
import styled from "styled-components"
import { API_URL, colors } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "./hooks/useAuthHook";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { toastError, toastPromise } from "./ToastEmitter";



export default function CustomRoutineView() {
    const [exercises, setExercises] = useState([]);
    const [exercisesQtd, setExercisesQtd] = useState([]);
    const [descanso, setDescanso] = useState(10);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const token = useSelector((state) => state.app.token);
    const userId = useSelector((state) => state.app.id);
    // const query = useQuery();

    useAuth({secure: true});

    function useQuery() {
        const { search } = useLocation();

        return useMemo(() => new URLSearchParams(search), [search]);
    }

    useEffect(() => {
        async function fetchExercises() {
            axios.get(`${API_URL}/exercises`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then( (response) => {
                setExercises(response.data);
                setExercisesQtd(new Array(response.data.length).fill(0));
            })
        }
        fetchExercises();
    }, []);

    function setQtd(index, qtd) {
        let temp = exercisesQtd;
        temp[index] = qtd;
        setExercisesQtd(temp);
    }


    function handleCreate() {
        let routine = {}
        let counter = 1;
        if(exercisesQtd.every((a) => a == 0)){
            toastError('Adicione algum exercício!')
            return
        }
        if(name == '') {
            toastError('Adicione um nome!')
            return
        }
        for(let i = 0; i < exercisesQtd.length; i++) {
            if(exercisesQtd[i] > 0) {
                routine[counter] = {
                    id: exercises[i].id,
                    qtd: exercisesQtd[i],
                    next: counter + 1,
                    descanso
                }
                counter += 1;
            }
        }

        routine[counter -1].next = false;

        toastPromise(axios.post(`${API_URL}/exercises/routines/create`, {
            userId,
            name,
            routine: JSON.stringify(routine)
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }), {
            pending: 'Criando rotina...',
            id: 'criando_rotina',
        })
        console.log(descanso)
        // navigate('/main')
        setTimeout(() => navigate('/main'), 3100)
    }

    return (
        <Container>
            <ToastContainer/>
            <Header>
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate('/main')}>Demo</li>
            </Header>

            <Body>
                <Title>Rotina Personalizada</Title>

                <LeaderBoardContainer>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da rotina"/>
                    {exercises.length > 0 && exercises.map((e, i) => <ExerciseItem qtd={exercisesQtd[i]} setQtd={setQtd} index={i} key={i} name={e.name}/>)}
                    <ExerciseItem qtd={descanso} setQtd={setDescanso} descanso={true} name={'Descanso (segundos)'} />
                    <Button onClick={handleCreate}>Criar</Button>
                </LeaderBoardContainer>

            </Body>

            


        </Container>
    );
}

function ExerciseItem({name, index, qtd, setQtd, descanso=false}) {
    const [actualQtd, setActualQtd] = useState(qtd)

    function handle(val) {
        setActualQtd((val == -1 && actualQtd <= 0) ? actualQtd : actualQtd + val);
        if(descanso) {
            setQtd((val == -1 && actualQtd <= 0) ? actualQtd : actualQtd + val)
            return
        }
        setQtd(index, (val == -1 && actualQtd <= 0) ? actualQtd : actualQtd + val);
    }

    return(
        <ExerciseRow>

            <p>{name}</p>
            <div>
                <FontAwesomeIcon icon={faMinusCircle} onClick={() => handle(-1)}  />
                <p>{actualQtd}</p>
                <FontAwesomeIcon icon={faPlusCircle} onClick={() => handle(1)} />
            </div>
        </ExerciseRow>
    )
}


const Container =  styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
    font-family: Roboto;
`

const Input = styled.input`
    width: calc(100% - 1rem - 4px);
    padding: .5rem;
    border: 2px solid ${colors.grayBorder};
    border-radius: 0.5rem;
    font-family: Roboto;
    font-weight: 300;
    color: ${colors.blackText};
    margin-bottom: 1rem;
`

const Body = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    min-height: 80vh;
    gap: 3rem;
    padding-bottom: 4rem;
`

const Title = styled.h1`
    color: ${colors.blackText};
    font-weight: 500;
    font-size: 2rem;
    text-align: center;
`

const LeaderBoardContainer = styled.main`
    display: flex;
    flex-direction: column;
    user-select: none;
    background-color: white;
    padding: 1.8rem;
    width: 70%;
    max-width: 400px;
    border-radius: 1rem;

`

const ExerciseRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #D9D9D9;
    
    &:last-child {
        border-bottom: 1px solid #fff;

    }

    & p {
        display: flex;
    }

    div {
        display: flex;
        gap: .5rem;
    }
`

const CustomRankingCode = styled.p`
    margin-top: -2rem;
    margin-bottom: -2rem;
`

const Button = styled.button`
    width: 100%;
    padding: 1rem 0rem;
    background-color: ${colors.confirm};
    border: none;
    border-radius: 8px;
    color: #fff;
    font-family: Roboto;
    font-weight: 500;
    font-size: 1.2rem;
    margin-top: 1rem;
    cursor: pointer;
`
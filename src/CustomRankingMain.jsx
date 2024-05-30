import Header from "./components/Header";
import styled from "styled-components"
import { API_URL, colors } from "./constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuthHook";
import { ToastContainer } from "react-toastify";
import { toastPromise } from "./ToastEmitter";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";




export default function CustomRankingMainView() {

    const [ranks, setRanks] = useState([]);
    const navigate = useNavigate();
    const token = useSelector((state) => state.app.token);
    // const userName = useSelector((state) => state.app.name);
    const userId = useSelector((state) => state.app.id);

    useAuth({secure: true});

    useEffect(() => {
        async function fetchRankings(){
            await axios.post(`${API_URL}/ranking/user/get`, {
                userId
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((result) => {
                console.log(result);
                setRanks(result.data)
            })
        }
        fetchRankings();
    } , [])


    return (
        <Container>
            <ToastContainer/>
            <Header>
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate('create')}>Criar/Entrar Ranking</li>
            </Header>

            <Body>

                <Title>Rankings personalizados</Title>

                {ranks.length > 0 && ranks.map((item, i) => <Item name={item.name} code={item.code} key={i}/>)}

                

            </Body>

            


        </Container>
    );
}

function Item({name, code}) {
    const navigate = useNavigate();

    return(
        <RankingItemWrapper onClick={() => navigate(`/ranking/${code}?title=${name}`)}>
            <p>{name.length > 20 ? name.slice(0,16) + '...' : name} - {code}</p>
            <FontAwesomeIcon icon={faArrowRight} />
        </RankingItemWrapper>
    )
}


const Container =  styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
    font-family: Roboto;
`

const Body = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    min-height: 80vh;
    gap: 2rem;
    padding-bottom: 4rem;
`

const Title = styled.h1`
    color: ${colors.blackText};
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;
    
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    gap: 2rem;
    background-color: white;
    padding: 2rem;
    border-radius: 16px;
    max-width: 300px;
`

const Input = styled.input`
    width: calc(100% - 1rem - 4px);
    padding: .5rem;
    border: 2px solid ${colors.grayBorder};
    border-radius: 0.5rem;
    font-family: Roboto;
    font-weight: 300;
    color: ${colors.blackText};
`

const SubmitButton = styled.button`
    width: 100%;
    padding: .5rem;
    background-color: ${colors.primary};
    border: 2px solid ${colors.primary};
    border-radius: 8px;
    color: #fff;
    font-family: Roboto;
    font-weight: 500;
    font-size: 1rem;
    margin-top: -1rem;
    cursor: pointer;
`

const RankingItemWrapper = styled.div`
    display: flex;
    background-color: white;
    width: 100%;
    justify-content: space-between;
    padding-right: 1rem;
    padding-left: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 10px;
    
    p {
        font-weight: 400;
        font-size: 1.3rem;
    }
`
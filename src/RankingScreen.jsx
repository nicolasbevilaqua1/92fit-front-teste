import Header from "./components/Header";
import styled from "styled-components"
import { API_URL, colors } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "./hooks/useAuthHook";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";



export default function RankingView({custom = false}) {
    const [leaderboard, setLeaderboard] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const token = useSelector((state) => state.app.token);
    const userId = useSelector((state) => state.app.id);
    const query = useQuery();

    useAuth({secure: false});

    function useQuery() {
        const { search } = useLocation();

        return useMemo(() => new URLSearchParams(search), [search]);
    }

    useEffect(() =>{
        async function fetchData() {

            if(custom) {
                axios.post(`${API_URL}/ranking/custom/get`, {
                    code: Number(id)
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }).then( response => {
                    console.log(response);
                    setLeaderboard(response.data)
                }).catch(error => console.log(error));
            } else {
                axios.get(`${API_URL}/ranking`).then( response => {
                    console.log(response);
                    setLeaderboard(response.data)
                }).catch(error => console.log(error));
            }
        }

        fetchData();
    }, []);

    return (
        <Container>
            <ToastContainer/>
            <Header>
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate('/ranking/custom')}>Rankings personalizados</li>
            </Header>

            <Body>
                <Title>{custom ? query.get('title') : 'Ranking'}</Title>
                {custom && <CustomRankingCode>{id}</CustomRankingCode>}
                <LeaderBoardContainer>
                    {leaderboard.length > 0 && token != '' && <Rowdiv>
                        <p>
                            Posição: {leaderboard.findIndex((item) => item.userId == userId) + 1}
                        </p>
                        <p>
                            Score: {leaderboard.find((item) => item.userId == userId).score}pts
                        </p>
                        <p>
                            Top {leaderboard.length == 1 ? 1 : ((leaderboard.findIndex((item) => item.userId == userId) + 1)/leaderboard.length * 100).toFixed(0)}%
                        </p>
                    </Rowdiv>}
                    {leaderboard && leaderboard.map((item, index) => (
                        <LeaderBoardRow isUser={item.userId == userId} key={index} position={index + 1} score={item.score} name={item.userName.length > 20 ? item.userName.split(' ')[0] : item.userName} />
                    ))}
                    { (!leaderboard || leaderboard.length == 0) && <p>Ainda não há registros, complete um exercício para ser o primeiro no ranking!</p>}
                </LeaderBoardContainer>

            </Body>

            


        </Container>
    );
}

function LeaderBoardRow({name, position, score, isUser}) {

    const colorRank = ['gold', 'silver', '#ca8e6a']

    return (
        <Rowdiv $isUser={isUser}>
            <p 
            // style={{paddingLeft: `${position <= 3 ? 'none' : '1.525rem'}`}}
            >
                {(position > 3) && <span>{position}</span>}
                {(position <= 3) && <FontAwesomeIcon icon={faTrophy} color={colorRank[position - 1]} />}
                {name}
            </p>
            <p>{score}pts</p>
        </Rowdiv>
    );
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

const Rowdiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #D9D9D9;
    background-color: ${(props) => props.$isUser ? '#daeef868': 'none'};
    
    &:last-child {
        border-bottom: 1px solid #fff;

    }

    & p {
        display: flex;
    }

    & p > svg {
        margin-right: 1rem;
        margin-left: 1rem;
    }

    & p > span {
        width: 3.125rem;
        text-align: center;
        /* font-size: 50%; */
        /* font-size: clamp(.5rem, 1rem, .7rem); */
    }
`

const CustomRankingCode = styled.p`
    margin-top: -2rem;
    margin-bottom: -2rem;
`
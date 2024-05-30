import styled from "styled-components"
import Header from "./components/Header"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import axios from "axios"
import { useSelector } from "react-redux"
import Chart from "react-apexcharts";
import { API_URL, exerciseDict } from "./constants"
import useAuth from "./hooks/useAuthHook"



export default function UserPerformanceView() {
    const [data, setData] = useState([]);
    const [points, setPoints] = useState([0,0,0,0,0,0,0]);
    const [perExercise, setPerExercise] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [categories, setCategories] = useState([]);
    const token = useSelector((state) => state.app.token)
    const id = useSelector((state) => state.app.id)

    useAuth({secure: true});

    useEffect(() =>{
        async function fetch(){
            await axios.get(`${API_URL}/exercises/performance/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then((response) =>{
                console.log(response)
                setData(response.data.map((item) => ({...item, createdAt: new Date(item.createdAt)})));

                let pointsTemp = [0,0,0,0,0,0,0];
                let perExTemp = [];
                let categoriesTemp = []
                response.data.map((item, i) => {
                    console.log(item)
                    if(item.points > 0) {
                        pointsTemp[new Date(item.createdAt).getDay() - 1] += item.points;
                        let exerciseFound = perExTemp.findIndex((a) => a.exerciseId == item.exerciseId)
                        console.log(exerciseFound);
                        if(exerciseFound != -1) {
                            perExTemp[exerciseFound].points += item.points;
                        } 
                        else {
                            categoriesTemp.push(exerciseDict[item.exerciseId].title)
                            perExTemp.push(item);
                        }
                    }
                })

                setPoints(pointsTemp);
                setCategories(categoriesTemp);
                setPerExercise(perExTemp);
            })
        }

        fetch();

    }, [])


    const options = {
        chart: {
            type: "line",
            fontFamily: "Roboto",
            toolbar: {
                show: false,
            },
            // plotOptions: {
            //     bar: {
            //       horizontal: true
            //     }
            // },
            // stacked: true,
            zoom: {
                enabled: false,
            },
            selection: {
                enabled: false,
            },

        },
        tooltip: {
            // enabled: false,
        },
        grid: {
            show: false,
            borderColor: '#90A4AE',
        },
        xaxis: {
          categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
        },
        yaxis: {
          tickAmount: 1,
          show: false,
        },
    }

    const perExerciseOptions = {
        ...options,
        xaxis: {
            categories: categories,
            // ['Polichinelos', 'Flexão', 'Burpee', 'Agachamento', 'Abdominal', 'Flexão diamante', 'Afundo', 'Flexão diamante com apoio', 'Flexão de braço com apoio', 'Abdominal remador', 'Crucifixo inverso', 'Remada', 'Ombros laterais', 'Remada alta', 'Laboral - Elevação de Ombros', 'Laboral - Rotação de Quadril', 'Laboral - Balão entre Pernas'],
            // tickPlacement: 'on',
            labels: {
                // rotate: 0,
                rotateAlways: false,
                show: true,
                trim: true,
            }
        },
        chart: {
            type: 'bar'
          },
        plotOptions: {
        bar: {
            // horizontal: true
        }
        },
    }

    const series = [
        {
            name: "pontos",
            data: points
        }
    ]

    const perExerciseSeries = [
        {
            name: "Pontos por exercício",
            data: perExercise.map((item) => item.points)
        }
    ]

    return(
        <Container>
            <ToastContainer/>
            <Header/>

            <MainWrapper>

                <ChartWrapper>
                    <h2>Pontuação em cada dia da semana</h2>
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        width="350"
                        />
                </ChartWrapper>

                <ChartWrapper>
                    <h2>Pontuação por exercício</h2>
                    
                    <Chart
                        options={perExerciseOptions}
                        series={perExerciseSeries}
                        type="bar"
                        width="350"
                        height='400'
                    />
                </ChartWrapper>

                <HistoryWrapper>
                    {data.length > 0 && data.map((item, i) => (
                        i < 10   && <HistoryRow key={i} name={exerciseDict[item.exerciseId].title} date={item.createdAt} points={item.points}/>
                    )) }
                    <h2>Histórico</h2>  
                </HistoryWrapper>
              </MainWrapper>


        </Container>
    )
}

function HistoryRow({name, points, date}) {

    return (
        <Rowdiv>
            <p>{name}</p>
            <p 
            // style={{paddingLeft: `${position <= 3 ? 'none' : '1.525rem'}`}}
            >
                <span>{points}pts</span>
                { (date.getHours() < 10 ? '0' : '') + (date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' - ' +date.getDate() + "/" + (date.getMonth() < 10 && '0') + (date.getMonth() + 1)}
            </p>
        </Rowdiv>
    );
}

const Rowdiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #D9D9D9;
    width: calc(350px - 1rem);
    
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
        margin-right: .3rem;
        /* font-size: 50%; */
        /* font-size: clamp(.5rem, 1rem, .7rem); */
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
    font-family: Roboto;

    h2 {
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
`

const MainWrapper = styled.main`
    /* height: 50vh; */
    padding-top: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ChartWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Roboto;
    align-items: center;
    background-color: white;
    margin-bottom: 1rem;
    border-radius: 1rem;

    h2 {
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
`
const HistoryWrapper = styled.div`
    display: flex;
    flex-direction: column-reverse;
    font-family: Roboto;
    align-items: center;
    background-color: white;
    margin-bottom: 1rem;
    border-radius: 1rem;
    /* padding-top: 1rem; */
    /* width: 100%; */

    h2 {
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
`
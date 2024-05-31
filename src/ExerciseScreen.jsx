import styled from "styled-components"
import React, { useEffect } from "react";
import Header from "./components/Header"
import { API_URL, MODEL_URL_Abdominal, MODEL_URL_Afundo, MODEL_URL_Agachamento, MODEL_URL_Burpees, MODEL_URL_Flexao, MODEL_URL_Polichinelo, MODEL_URL_PranchaDin, MODEL_URL_Superman, colors, exerciseDict, peitoOmbroTriceps, pernasAbdomenCostas, routine1, routine2 } from "./constants"
import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { toastError, toastPromise, toastSuccess } from "./ToastEmitter"
import { ToastContainer } from "react-toastify"
import beep from "./assets/beep.mp3"
import valendo from "./assets/valendo.mp3"
import end from "./assets/end.mp3"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import PopUp from "./components/PopUp"
import polichinelo_gif from "./assets/polichinelo_gif.mp4"
import flexao_gif from "./assets/flexao_gif.mp4"
import burpee_gif from "./assets/burpee_gif.mp4"
import agachamento_gif from "./assets/agachamento_gif.mp4"
import abdominal_gif from "./assets/abdominal_gif.mp4"
import abdominal_remador_gif from "./assets/abdominal_remador.mp4"
import afundo_gif from "./assets/afundo.mp4"
import crucifixo_inverso_gif from "./assets/crucifixo_inverso.mp4"
import flexao_apoio_gif from "./assets/flexao_apoio.mp4"
import flexao_diamante_apoio_gif from "./assets/flexao_diamante_apoio.mp4"
import flexao_diamante_gif from "./assets/flexao_diamante.mp4"
import ombros_laterais_gif from "./assets/ombros_laterais.mp4"
import remada_alta_gif from "./assets/remada_alta.mp4"
import remada_gif from "./assets/remada.mp4"

import laboral_elevacao_gif from "./assets/laboral_elevacao.mp4"
import laboral_rotacao_gif from "./assets/laboral_rotacao.mp4"
import laboral_balao_gif from "./assets/laboral_balao.mp4"

import PolichineloAudio from "./assets/Polichinelos.mp3"
import AgachamentoAudio from "./assets/Agachamento.mp3"
import AbdominaisAudio from "./assets/Abdominais.mp3"
import BurpeesAudio from "./assets/Burpees.mp3"
import FlexaoAudio from "./assets/Flexao.mp3"
import DescansoAudio from "./assets/Descanso.mp3"
import AbdominalRemadorAudio from "./assets/abdominal_remador.mp3"
import AfundoAudio from "./assets/afundo.mp3"
import CrucifixoInversoAudio from "./assets/crucifixo_inverso.mp3"
import FlexaoApoioAudio from "./assets/flexao_apoio.mp3"
import FlexaoDiamanteApoioAudio from "./assets/flexao_diamante_apoio.mp3"
import FlexaoDiamanteAudio from "./assets/flexao_diamante.mp3"
import OmbrosLateraisAudio from "./assets/ombros_laterais.mp3"
import RemadaAltaAudio from "./assets/remada_alta.mp3"
import RemadaAudio from "./assets/remada.mp3"
import useAuth from "./hooks/useAuthHook"


export default function ExerciseView ({custom=false}) {
    let query = useQuery();
    const { routineId } = useParams();
    const { exerciseId } = useParams();
    const [ routine, setRoutine] = useState(undefined);
    const [qtd, setQtd] = useState(isOnRoutine ? Number(query.get('qtd')) : 0);
    const [exerciseStarted, setExerciseStarted] = useState(false);
    const [exercisePopUpOpened, setExercisePopUpOpened] = useState(query.get('tutorial') == null ? true : (query.get('tutorial') === 'true'));
    // const [loadingCamera, setLoadingCamera] = useState(false);
    const userId = useSelector((state) => state.app.id);
    const token = useSelector((state) => state.app.token);
    const dontShowTutorial = useSelector((state) => state.app.dontShowTutorial);
    const navigate = useNavigate();
    const isRoutineOn = isOnRoutine();
    const [probability, setProbability] = useState();

    useAuth({secure: true});

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const routinesId = {
        1: routine2,
        2: peitoOmbroTriceps,
        3: pernasAbdomenCostas,
        // custom: 
    }

    function isOnRoutine() {
        return Boolean(query.get('step') || custom);
    }

    useEffect(() => {
        if(isRoutineOn) {
            const exerciseAudioID = {
                1: 'polichinelo',
                2: 'flexao',
                3: 'burpees',
                4: 'agachamento',
                5: 'abdominais',
                6: 'flexao_diamante',
                7: 'afundo',
                8: 'flexao_diamante_apoio',
                9: 'flexao_apoio',
                10: 'abdominal_remador',
                11: 'crucifixo_inverso',
                12: 'remada',
                13: 'ombros_laterais',
                14: 'remada_alta',
            }
            // TODO: remove this when fixed
            exerciseId <= 14 && document.getElementById(exerciseAudioID[exerciseId]).play();
            isRoutineOn ? routine && start(): start();
        }
    }, [routine])

    useEffect(() => {
        async function fetch(){
            axios.get(`${API_URL}/exercises/routines/${userId}/${routineId}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(({data}) => {
                // console.log(JSON.parse(data.routine));
                setRoutine(JSON.parse(data.routine));
            })
        }
        custom && fetch();
    }, []);
    
    function start(calibrate=false) {
        const URL = exerciseDict[exerciseId].URL;
        // console.log(URL, exerciseDict[exerciseId])

        let model, ctx, maxPredictions;
        let calibrating = calibrate;
        let quantity = calibrating ? 0 : qtd;
        const probabilityThreshold = 0.8;
        let previousPrediction = 0.5;
        let countingEnded = false;
        let audiobeep = document.getElementById('beep');
        let audiovalendo = document.getElementById('valendo');
        let audioend = document.getElementById('end');
        let progressive = qtd == 0;
        let frameRequest;
        let webcam = new tmPose.Webcam(300, 300, true); // width, height, flip
        let start =  Date.now();
        document.getElementById('start').addEventListener('click', () => {
            !calibrating && countingEnded && stop();
        })
        // if(isRoutineOn) {
        //     setQtd(query.get('qtd'));
        //     quantity = Number(query.get('qtd'));
        //     progressive = false;
        // }
        let exerciseEnded = false;


        setExerciseStarted(calibrating ? null : true);

        calibrating && toastSuccess('Calibrando!, faça 3 exercícios para verificar a execução e posição do celular!')
        calibrating && !progressive && setQtd(0)

        toastPromise(() => init(), {
            pending: "Abrindo câmera...",
            error: "Falha ao abrir a câmera!",
            success: "Sucesso!",
        })
        async function init() {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
            try {
                await webcam.setup()
            } catch (error) {
                'console'.error(error);
            }

            model = await tmPose.load(modelURL, metadataURL)
                
            // Convenience function to setup a webcam
            const size = 300;
                
            webcam.play();
            frameRequest = window.requestAnimationFrame(loop);
                
            // append/get elements to the DOM
            const canvas = document.getElementById("canvas");
            canvas.width = size; canvas.height = size;
            ctx = canvas.getContext("2d");


            let count = 3;
            const countdownInterval = setInterval(() => {
                if(document.URL.split("/").find((item) => item == "exercise")) {
                    audiobeep.play();
                    count--;
                    if (count === 0) {
                        clearInterval(countdownInterval);
                        audiovalendo.play();
                        countingEnded = true;
                    }
                } else {
                    webcam.stop();
                    cancelAnimationFrame(frameRequest);
                    exerciseEnded = true;
                }
            }, 1000);
        }
        // let lastFrameTime = 0;
        async function loop(timestamp) {
            if(exerciseEnded){
                return;
            };
            // const currentTime = Date.now();
            
            if(!document.URL.split("/").find((item) => item == "exercise")) {
                webcam.stop();
                cancelAnimationFrame(frameRequest);
                return
            }
            // if(currentTime - lastFrameTime >= 1000 / 25){
            webcam.update(); // update the webcam frame
            
            await predict();
            
            frameRequest = window.requestAnimationFrame(loop);

            // setTimeout(() => {
            //     window.requestAnimationFrame(loop);
            // }, 1000/40) 
        }

        function stop() {
            audioend.play();
            cancelAnimationFrame(frameRequest);
            exerciseEnded = true;
            webcam.stop();
            setQtd(progressive ? quantity : qtd - quantity);
            function routineStep() {
                if(isRoutineOn) {
                    // console.log(routine);
                    const actualRoutine = custom ? routine : routinesId[query.get('routine')];
                    const routineStep = custom ? routine[query.get('step')] : actualRoutine[query.get('step')]
                    const nextStep = custom ? routine[routineStep.next] : actualRoutine[routineStep.next]
                    const resolveAfter10Sec = new Promise(resolve => setTimeout(resolve, custom ? Number(query.get('descanso')) * 1000 : 10000));
                    if(query.get('next')){
                        document.getElementById('descanso').play();
                        toastPromise(resolveAfter10Sec, {
                            pending: "Descanso...",
                            success: 'Descanso finalizado!',
                            error: 'Erro!',
                            id: "descanso"
                        }, () => {
                            if(custom == true) {
                                console.log('oi')
                                navigate(`/main/exercise/custom/${routineId}/${nextStep.id}?&descanso=${nextStep.descanso}&step=${routineStep.next}&tutorial=false&qtd=${nextStep.qtd}&${nextStep.next && 'next=' + nextStep.next}`)
                                window.location.reload();
                            }
                            else {
                                navigate(`/main/exercise/${nextStep.id}?step=${routineStep.next}&tutorial=false&routine=${query.get('routine')}&qtd=${routineStep.qtd}&${nextStep.next && 'next=' + nextStep.next}`)
                                window.location.reload();
                            }
                        })
                    }
                }
            }
            if((progressive && quantity > 0) || (!progressive && qtd - quantity > 0)) {
                registerTrain(routineStep);
            }
            else {
                toastError('Treino finalizado sem execuções!', routineStep)
            }
        }

        async function predict() {
            // const deltaTime = Date.now() - lastFrameTimePredict;
            
            // Prediction #1: run input through posenet
            // estimatePose can take in an image, video or canvas html element
            const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
            drawPose(pose);

            // Prediction 2: run input through teachable machine classification model
            const prediction = await model.predict(posenetOutput);

            setProbability(prediction[0].probability)
            

            if(calibrating == true && quantity >= 3 ){
                calibrating = false;
                toastSuccess('Calibragem concluída!')
                progressive && setQtd(0);
                quantity = qtd;
                if(progressive){
                }
                else {
                    setQtd(qtd);
                }
                setExerciseStarted(true);
            }

            
            if (countingEnded && previousPrediction <= 0.3 && prediction[0].probability > probabilityThreshold){
                updatePredictionCounter();
            }
            previousPrediction = prediction[0].probability;
            
            

            function updatePredictionCounter() {
                audiobeep.play();
                quantity = calibrating ? quantity + 1 : progressive ? quantity + 1 : quantity <= 0 ? calibrating : quantity - 1;
                setQtd(quantity)
                if(!progressive && !calibrating && quantity <= 0){
                    stop();
                }
            }

        }
    
        function drawPose(pose) {
            if (webcam.canvas) {
                ctx.drawImage(webcam.canvas, 0, 0);
                // draw the keypoints and skeleton
                if (pose) {
                    const minPartConfidence = 0.5;
                    tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                    tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
                }
            }
        }

        async function registerTrain(callback=null){
            toastPromise(axios.post(`${API_URL}/exercises/registerTrain`, {
                userId,
                exerciseName: exerciseDict[exerciseId].title,
                qtd: progressive ? quantity : qtd - quantity
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }), {
                pending: 'Enviando o registro de treino...'
            }, callback)
    
        }
    }

    const tutorialIds = {
        1: polichinelo_gif,
        2: flexao_gif,
        3: burpee_gif,
        4: agachamento_gif,
        5: abdominal_gif,
        6: flexao_diamante_gif,
        7: afundo_gif,
        8: flexao_diamante_apoio_gif,
        9: flexao_apoio_gif,
        10: abdominal_remador_gif,
        11: crucifixo_inverso_gif,
        12: remada_gif,
        13: ombros_laterais_gif,
        14: remada_alta_gif,
        16: laboral_elevacao_gif,
        17: laboral_rotacao_gif,
        18: laboral_balao_gif,
    }

    return (
        <Container>
            <Header>
                <li onClick={() => navigate('/')}>Home</li>
            </Header>

            {/*----------------  Áudios -------------- */}
            <audio src={beep} id="beep"></audio>
            <audio src={valendo} id="valendo"></audio>
            <audio src={end} id="end"></audio>
            <audio src={PolichineloAudio} id="polichinelo"></audio>
            <audio src={AbdominaisAudio} id="abdominais"></audio>
            <audio src={AgachamentoAudio} id="agachamento"></audio>
            <audio src={FlexaoAudio} id="flexao"></audio>
            <audio src={BurpeesAudio} id="burpees"></audio>
            <audio src={DescansoAudio} id="descanso"></audio>

            <audio src={AbdominalRemadorAudio} id="abdominal_remador"></audio>
            <audio src={AfundoAudio} id="afundo"></audio>
            <audio src={CrucifixoInversoAudio} id="crucifixo_inverso"></audio>
            <audio src={FlexaoApoioAudio} id="flexao_apoio"></audio>
            <audio src={FlexaoDiamanteApoioAudio} id="flexao_diamante_apoio"></audio>
            <audio src={FlexaoDiamanteAudio} id="flexao_diamante"></audio>
            <audio src={OmbrosLateraisAudio} id="ombros_laterais"></audio>
            <audio src={RemadaAltaAudio} id="remada_alta"></audio>
            <audio src={RemadaAudio} id="remada"></audio>

            <ToastContainer/>
            <PopUp active={exercisePopUpOpened}>
                <PopUpTutorial>

                <h2>Tutorial</h2>
                <video src={tutorialIds[exerciseId]} controls={true} autoPlay={true}></video>
                <p>Importante: apoie o celular no chão, a câmera deve pegar seu corpo todo</p>
                <Button onClick={() => setExercisePopUpOpened(false)} id='tutorialOk' style={{backgroundColor: colors.confirm}}>
                    Ok!
                </Button>
                </PopUpTutorial>
            </PopUp>

            <Body>
                <TitleDiv>
                    <ExerciseTitle>
                        {exerciseDict[exerciseId].title}
                    </ExerciseTitle>
                    <FontAwesomeIcon onClick={() => setExercisePopUpOpened(true)} icon={faInfoCircle} style={{fontSize: '18px', marginLeft: '5px'}}></FontAwesomeIcon>
                </TitleDiv>



                <div><Canvas id="canvas"></Canvas></div>

                <Pab>{(probability?.toFixed(2) || '')}</Pab>

                { exerciseStarted == false && <p>Quantidade desejada:</p>}
                { exerciseStarted == false && <div style={{display: 'flex', alignItems: 'center', gap: '1rem',}}>
                    <FontAwesomeIcon cursor={'pointer'} icon={faMinus} onClick={() => setQtd((prev) => prev > 1 ? prev - 1 : 0)}></FontAwesomeIcon>
                    <QuantityText>{qtd != 0 ? qtd : 'Sem limite'}</QuantityText>
                    <FontAwesomeIcon cursor={'pointer'} icon={faPlus} onClick={() => setQtd((prev) => prev + 1)}></FontAwesomeIcon>
                </div>}
                { exerciseStarted != false && <QuantityText>{qtd}</QuantityText>}

                <ButtonsDiv>
                    { exerciseStarted == false && <ButtonCalibrar type="button" onClick={() => start(true)}>Calibrar</ButtonCalibrar>}
                    {/* <Button type="button" id="start" $exerciseStarted={exerciseStarted}  onClick={() => exerciseStarted == false ? start() : () => {} }>{`${exerciseStarted ? 'Finalizar': exerciseStarted == null ? 'Calibrando...' : 'Iniciar'}`}</Button> */}
                    <Button type="button" id="start" $exerciseStarted={exerciseStarted}  onClick={() => exerciseStarted == false ? start() : () => {} }>{`${exerciseStarted ? 'Finalizar': exerciseStarted == null ? 'Calibrando...' : 'Iniciar'}`}</Button>
                </ButtonsDiv>

            </Body>

        </Container>
    )
}

const Container = styled.div`
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
    padding-bottom: 2rem;
    min-height: 80vh;
    justify-content: space-around;
`

const Pab = styled.p`
font-size: 3rem;
font-weight: 500;
`

const ExerciseTitle = styled.h1`
    color: ${colors.blackText};
    font-weight: 500;
    font-size: 2rem;
    margin-left: 16px;
    text-align: center;
`

const TitleDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & > * :hover {
        cursor: pointer;
    }   
`

const Canvas = styled.canvas`
    border-radius: 1rem;
    background-color: gray;
    width: 300px;
    height: 300px;
`

const QuantityText = styled.p`
    font-size: 3rem;
    font-weight: 500;
`

// const Icon =

const Button = styled.button`
    width: 100%;
    padding: 1rem 0rem;
    background-color: ${(props) => props.$exerciseStarted ? colors.red : props.$exerciseStarted == null ? colors.calibrate : colors.confirm};
    border: none;
    border-radius: 8px;
    color: #fff;
    font-family: Roboto;
    font-weight: 500;
    font-size: 1.2rem;
    margin-top: 1rem;
    cursor: pointer;
`

const ButtonCalibrar = styled(Button)`
    background-color: ${colors.calibrate};
`

const ButtonsDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    gap: 1rem;
`

const PopUpTutorial = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    video {
        width: 100%;
        max-width: 400px;
        max-height: 400px;
        object-fit: cover;
    }

    h2 {
        font-weight: 500;
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.1rem;
        margin-top: .5rem;
    }
`
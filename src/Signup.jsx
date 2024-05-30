import styled from "styled-components";
import Header from "./components/Header";
import { API_URL, colors } from "./constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastError, toastPromise, toastSuccess } from "./ToastEmitter";
import axios from "axios";
import useAuth from "./hooks/useAuthHook";



export default function SignupView(){
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState();
    const [genre, setGenre] = useState('M');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const normalizedPhone = Number(phone.replace('(', '').replace(' ', '').replace(')', '').replace('-', '').replace('+', ''));
    
    useAuth({secure: false});

    function handleSubmit(event) {
        event.preventDefault();

        if(!isPhoneValid()){
            toastError('O Telefone inserido é inválido!')
        }
        else {
            toastPromise(axios.post(`${API_URL}/users/create`, {
                name,
                email,
                birthday,
                gender: genre,
                phone: normalizedPhone,
                password,
            }), {
                pending: 'Enviando dados...',
            },
                () => {
                    navigate('/login')
                }
            )

        }

        
    }

    function isPhoneValid() {
        console.log(normalizedPhone)
        return(!isNaN(normalizedPhone) && normalizedPhone.toString().length == 11)
    }

    return(
        <Container>
            <ToastContainer/>
            <Header>
                <li onClick={() => navigate('/login')}>Login</li>
                <li onClick={() => navigate('/ranking')}>Ranking</li>
            </Header>

            <FormContainer>


                <Form onSubmit={(e) => handleSubmit(e)}>
                    <h2>Cadastro</h2>
                        <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}></Input>
                    <Div1>
                        <Input type="date" placeholder="01/01/2000" value={birthday} onChange={(e) => setBirthday(e.target.value)}></Input>
                    <Select name="genre" id="" value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                        <option value="N">Prefiro não dizer</option>
                    </Select>
                    </Div1>
                    <Input type="tel" placeholder="(92) 91234-5678" value={phone} onChange={(e) => setPhone(e.target.value)}></Input>
                    <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                    <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                    <SubmitButton>Enviar</SubmitButton>
                </Form>

            </FormContainer>

        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
`

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    padding-left: 2rem;
    padding-right: 2rem;
    `

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 2rem;
    gap: .5rem;
    border-radius: 2rem;
    font-family: Roboto;

    h2 {
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 2rem;
    }
    `

const Input = styled.input`
    width: calc(100% - 1rem - 4px);
    padding: .5rem;
    border: 2px solid ${colors.grayBorder};
    border-radius: 0.5rem;
    font-family: Roboto;
    font-weight: 300;
    color: ${colors.blackText};
    &:focus {
        outline: none;
    }
    `


const Select = styled.select`
    width: calc(50% + 1.25rem) !important;
    padding: .5rem;
    border: 2px solid ${colors.grayBorder};
    border-radius: 0.5rem;
    font-family: Roboto;
    font-weight: 300;
    color: ${colors.blackText};

    &:focus {
        outline: none;
    }
`
const Div1 = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: .4rem;

    & > * {
        width: 50%;
    }
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
    margin-top: 1.5rem;
    cursor: pointer;
`
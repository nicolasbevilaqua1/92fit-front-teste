import styled from "styled-components"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"




export default function Header({children}){
    const navigate = useNavigate();

    
    return(
        <Headerv>
            <img src={logo} alt="" onClick={() => navigate('/')}/>

            <nav>
                <ul>
                    {children}
                </ul>
            </nav>
        </Headerv>
    )
}

const Headerv = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 2rem;
    padding-right: 2rem;
    background-color: #fff;
    align-items: center;
    height: 5rem;
    /* position: sticky;
    top: 0; */
    
    box-shadow: 2px 2px 20px #76767622;
    
    img {
        height: 2rem;
    }

    img:hover {
        cursor: pointer;
    }
    
    ul {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        font-family: Roboto;
        font-size: 1.2rem;
        font-weight: 500;
        color: #393e46;
    }
    
    li {
        cursor: pointer;
    }
    li:hover{
        /* color: #fff; */
        text-shadow: 4px 4px 20px #1fb4ff;
    }
    
    @media (max-width: 500px) {
        padding-left: .8rem;
        padding-right: .8rem;
        height: 4rem;
        /* width: 100%; */
        
        ul {
            font-size: 1rem;
        }

        img {
            height: 1rem;
        }

        h2 {
            font-size: 2rem;
            line-height: 1rem;
        }
    }
    
    `
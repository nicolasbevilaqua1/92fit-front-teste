import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastError } from "../ToastEmitter";



export default function useAuth({secure}){
    const navigate = useNavigate();
    const token = useSelector((state) => state.app.token);

    useEffect(() => {
        if(secure && token == '') {
            toastError('Faça login novamente!', () => navigate('/login'));
        }
        else {
            axios.post(`${API_URL}/auth/verify`, {
                token
            }).then((response) =>{
                if(!response.data && token != ''){
                    localStorage.clear();
                    // window.location.reload();
                    secure ? () => navigate('/') : () => window.location.reload();
                }
            })
        }

    }, []);
}
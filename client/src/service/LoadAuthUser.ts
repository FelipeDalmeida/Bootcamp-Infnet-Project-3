import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useGlobalStore } from "./useGlobalStore";
import { AuthToken } from "./authToken";
import useAxios from "axios-hooks";
import { User } from "../types/types";
import { getMyself } from "./api/getMyself";

//@TODO refatorar o código

export function LoadAuthUser() {  //em cada pagina irá verificar se o token está valido 
    const user = useGlobalStore((state) => state.user);
    const setUser = useGlobalStore((state) => state.setUser);
    const [token, setToken] = useState(AuthToken.get())
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(`${page}`) }

    const [
        ,
        getUsuario] = useAxios<Partial<User>>(
            {
                url: `/users/myself`,
                method: "get",
            },
            {
                manual: true,
            }
        );

    useEffect(() => {
        setToken(AuthToken.get());
      
        if (token || user.isAuthenticated) {
            getMyself().then((user) => {
                setUser({ ...user, isAuthenticated: true });
   
              });
        }

        if (!token) {
            console.log("Token inválido")
            setUser({
                isAuthenticated: false,
                isEmailVerified: false,
                nome: "",
                email: "",
                id: 0,
            });
            goToPage("/login")
        }

    }, []);

    return null;
}
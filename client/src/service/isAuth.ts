import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useGlobalStore } from "./useGlobalStore";
import { AuthToken } from "./authToken";
import useAxios from "axios-hooks";
import { User } from "../types/types";

//@TODO refatorar o código

export function LoadAuthUser() {  //em cada pagina irá verificar se o token está valido 
    const user = useGlobalStore((state) => state.user);
    const setUser = useGlobalStore((state) => state.setUser);
    const [token,setToken]=useState(AuthToken.get())
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

        if(token || user.isAuthenticated){

            getUsuario().then(usuario=>{
                if(usuario.data.id===user.id){
                    setUser({ ...usuario, isAuthenticated: true });
                }
            })
        }

      if (!token) {

        setUser({
            id:0,
            email:"",
            nome:"",
            isAuthenticated: false });
        goToPage("/login")
      }
   
    }, []);
  
    return null;
  }
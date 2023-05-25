import Nav from "../components/Nav"
import { Link, useNavigate } from 'react-router-dom';
import Button from "../components/Button";
import { useGlobalStore } from "../service/useGlobalStore";
import { AuthToken } from "../service/authToken";



const Header = () => {

    const user = useGlobalStore((state) => state.user);
    const setUser = useGlobalStore((state) => state.setUser);
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(page) }
    const logOut=()=>{

        AuthToken.remove()
        setUser({
              isAuthenticated: false,
              id:0,
              email:"",
              nome:"" 
            });
        
        goToPage("/login")
    }


    const anchor = [<Link to='/cadastro'>{"Cadastar Paciente"}</Link>, <Link to='/pacientes'>{"Pacientes"}</Link>]
    const anchor2 = [<Link to='/usuario'>{"Usuario"}</Link>,<Button className={"mt-6 md:mt-1"} title={"Logout"} onClick={() => logOut()} />]

    if(user.isAuthenticated && AuthToken.get()){
    return ( <>
   
    <Nav anchor={anchor} anchor2={anchor2} />
    
    </>)
    } else {
        return (<></>)
    }
}

export default Header
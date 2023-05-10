import Nav from "../components/Nav"
import { Link } from 'react-router-dom';
import Button from "../components/Button";
import { useGlobalStore } from "../service/useGlobalStore";
import { AuthToken } from "../service/authToken";



const Header = () => {

    const setUser = useGlobalStore((state) => state.setUser);
    const logOut=()=>{

        AuthToken.remove()
        setUser({
              isAuthenticated: false,
              id:0,
              email:"",
              nome:"" 
            });
            
    }


    const anchor = [<Link to='/cadastro'>{"Cadastar Paciente"}</Link>, <Link to='/pacientes'>{"Pacientes"}</Link>]
    const anchor2 = [<Link to='/usuario'>{"Usuario"}</Link>,<Button className={"mt-6 md:mt-1"} title={"Logout"} onClick={() => logOut()} />]

    return <>
    <Nav anchor={anchor} anchor2={anchor2} />
    </>
}

export default Header
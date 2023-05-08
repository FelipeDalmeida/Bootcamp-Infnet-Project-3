import Nav from "../components/Nav"
import { Link } from 'react-router-dom';
import Button from "../components/Button";
import { useGlobalStore } from "../service/useGlobalStore";



const Header = () => {

    const setUser = useGlobalStore((state) => state.setUser);
    const logOut=()=>{
        
        setUser({  isAuthenticated: false });
    }


    const anchor = [<Link to='/cadastro'>{"Cadastar Paciente"}</Link>, <Link to='/pacientes'>{"Pacientes"}</Link>]
    //const anchor2 = [<Button className={"mt-6 md:mt-1"} title={"Logout"} onClick={() => setIsAuth(false)} />,<div className={" self-center"}>{user}</div>]
    const anchor2 = [<Link to='/usuario'>{"Usuario"}</Link>,<Button className={"mt-6 md:mt-1"} title={"Logout"} onClick={() => logOut()} />]

    return <>
    <Nav anchor={anchor} anchor2={anchor2} />
    </>
}

export default Header
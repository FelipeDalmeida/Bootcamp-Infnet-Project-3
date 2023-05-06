import Axios from 'axios'
import { configure } from 'axios-hooks'
import { AuthToken } from '../authToken'
import { browserHistory } from '../browserHistory'
import { useGlobalStore } from './useGlobalStore'
export { default as useAxios } from 'axios-hooks'

const axios = Axios.create({
    baseURL: "http://127.0.0.1:8080",
})

//axios.get('')
//axios.post('')

axios.interceptors.request.use((config) => {
    const token = AuthToken.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(`Error: ${error}`)
        const status: number = error.request.status;
        console.log(`Status: ${status}`)
        if (status >= 401) {
            AuthToken.remove();
            console.log("Token Expirado")
            const setUser = useGlobalStore((state) => state.setUser);
            setUser({isAuthenticated:false})
            browserHistory.push("/login")
        }
    }
)

configure({ axios });


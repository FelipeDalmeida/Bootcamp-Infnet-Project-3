import Axios from 'axios'
import { configure } from 'axios-hooks'
import { AuthToken } from './authToken'
import { browserHistory } from './browserHistory'
import { useGlobalStore } from './useGlobalStore'
export { default as useAxios } from 'axios-hooks'



const axios = Axios.create({
    baseURL: "http://localhost:8080",
})


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
    
        const status = error.request.status;
        if (status === 401) {
            AuthToken.remove();
            console.log("Token Expirado")
            browserHistory.push("/login")
        }
    }
)

configure({ axios });


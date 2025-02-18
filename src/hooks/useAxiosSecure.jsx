import { useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'

const axiosSecure = axios.create({
    baseURL: 'https://server.havitshopbd.com',
})

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `bearer ${token}`
            }
            return config;
        })

        axiosSecure.interceptors.response.use(
            response => response,
            async error => {
                if (
                    error.response &&
                    (error.response.status === 401 || error.response.status === 403)
                ) {
                    await logOut()
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        )
    }, [logOut, navigate])

    return [axiosSecure];
}

export default useAxiosSecure;
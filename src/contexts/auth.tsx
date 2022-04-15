import { NextPage } from "next";
import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { api } from "../services/api";
import useAuth from "./useAuth";
import Login from "../pages/login";
import { useRouter } from "next/router";

const TOKEN_KEY = '@mxtoken'
const USER_KEY = '@mxuser'

type User = {
    id?: number
    username: string
    password: string
}

type AuthContextProps = {
    isAuthenticated: boolean
    user: User | null
    signIn: (user: User)=> void
    logout: ()=> void
}

type AxiosResponseProps = {
    token: string,
    user: User
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider: NextPage = ({children})=>{

    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        async function loadUserFromCookies() {
            const token = Cookies.get(TOKEN_KEY);
            const user = Cookies.get(USER_KEY);
            
            if (token && user) {
                const userData = JSON.parse(user);
                setUser(userData);
                api.defaults.headers.common.Authorization = `Bearer ${token}`
            }
        }
        loadUserFromCookies()
    },[])


    const signIn = async({ username, password }: User)=>{
        const { data } = await api.post<AxiosResponseProps>('/auth/authenticate',{
            username, password
        });

        Cookies.set(TOKEN_KEY, data.token);
        Cookies.set(USER_KEY, JSON.stringify(data.user));

        setUser(data.user);
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    }

    const logout = ()=>{
        Cookies.remove(TOKEN_KEY);
        Cookies.remove(USER_KEY);
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated: !!user, logout, signIn }}>
            {children}
        </AuthContext.Provider>
    )

}

export const ProtectedRoute: NextPage = ({ children })=>{
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated && router.pathname !== '/login') return <Login/>

    return (<>{children}</>);
}
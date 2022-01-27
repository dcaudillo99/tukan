import axios from "axios";
import jwtDecode from "jwt-decode";

const setToken = (token) => {
    console.log('here')
    localStorage.setItem('accessToken', token);
}

const removeToken = () => {
    localStorage.removeItem('accessToken');
}

export const getToken = () => {
    return localStorage.getItem('accessToken');
}

export const getUsername = (token) => {
    return jwtDecode(token).username;
}

export const signIn = async (credentials) => {
    const me = {
        ok: true,
        data: null
    }
    try{
        const { data } = await axios.post('http://localhost:3000/auth/signin', credentials);
        setToken(data.accessToken);
        return {...me, data: jwtDecode(data.accessToken)};
    } catch ({response}) {
        const {data} = response;
        me.ok = false;
        me.data = data.message
        return me;
    }
}
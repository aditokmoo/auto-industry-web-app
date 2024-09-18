import axios from "../../../../api/http";

interface createUserType {
    username: string,
    email: string,
    password: string
}

interface loginUserType {
    email: string,
    password: string
}

export async function createAccount(credentials: createUserType) {
    try {
        const res = await axios.post('/api/auth/signup', credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function login(credentials: loginUserType) {
    try {
        const res = await axios.post('/api/auth/login', JSON.stringify(credentials), {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return res?.data;
    } catch (error) {
        return error
    }
}

export async function refreshToken() {
    try {
        const res = await axios.get('/api/auth/refresh', {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
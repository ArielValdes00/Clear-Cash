import type { FormLogin, FormRegister } from '@/types/types';
import axios from 'axios';

export const register = async (formRegister: FormRegister) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`, formRegister);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
};

export const login = async (formLogin: FormLogin) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`, formLogin);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
};

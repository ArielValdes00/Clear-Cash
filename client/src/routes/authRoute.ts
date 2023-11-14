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

export const getUsers = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`);
        return res.data.users;
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
};

export const getUser = async (id: any) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forgot-password`, { email });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
};

export const resetPassword = async (formPassword: any) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reset-password`, formPassword);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
};

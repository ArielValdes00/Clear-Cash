import Login from '@/components/Login';
import Register from '@/components/Register';
import React from 'react';
import { toast } from 'react-toastify';

const login = (): JSX.Element => {
    return (
        <div className='grid grid-cols-2 gap-5'>
            <Login toast={toast} />
            <Register toast={toast} />
        </div>
    );
};

export default login;

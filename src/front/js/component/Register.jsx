import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Navigate } from 'react-router-dom';


const Register = () => {
    const { store, actions } = useContext(Context)
    if (!!store.user) return <Navigate to="/" replace />

    return (
        <form onSubmit={actions.handleSubmitRegister} className='w-50 mx-auto my-5'>
            <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Name</label>
                <input className='form-control' type='text' name='username' id='username' placeholder='User name' value={store.registerUser.username} onChange={actions.handleChangeRegister}></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input className='form-control' type='text' name='email' id='email' placeholder='Email' value={store.registerUser.email} onChange={actions.handleChangeRegister}></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input className='form-control' type='password' name='password' id='password' placeholder='Contraseña' value={store.registerUser.password} onChange={actions.handleChangeRegister}></input>
            </div>
            <button className='btn btn-primary w-100'>Register</button>
        </form>
    );
}

export default Register
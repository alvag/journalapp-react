import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator/es';

import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { registerUser } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( state => state.ui );

    useEffect( () => {
        dispatch( removeError() );
    }, [dispatch] );

    const handleRegister = () => {

        if ( data.password !== data.confirm_password ) {
            dispatch( setError( 'Las contraseñas no coinciden' ) );
            return;
        }

        dispatch( removeError() );

        const { email, password, name } = data;

        dispatch( registerUser( email, password, name ) );


    };

    const { data, handleChange, handleSubmit, errors } = useForm( {
        name: 'Test 1',
        email: 'test1@gmail.com',
        password: '123456',
        confirm_password: '123456'
    }, {
        name: [
            {
                validator: validator.isEmpty,
                params: { ignore_whitespace: true },
                message: 'El nombre es requerido'
            }
        ],
        email: validator.isEmail,
        password: [
            validator.isEmpty,
            {
                validator: validator.isLength,
                params: { min: 6 }
            }
        ],
        confirm_password: [
            {
                validator: validator.isLength,
                params: { min: 6 },
                message: 'Debe tener al menos 6 digitos'
            }
        ]
    }, handleRegister );


    return (
        <>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={handleSubmit}>

                <input
                    className={'auth__input ' + ( errors.name ? 'invalid' : '' )}
                    type='text'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    value={data.name}
                    onChange={handleChange}
                />
                <input
                    className={'auth__input ' + ( errors.email ? 'invalid' : '' )}
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value={data.email}
                    onChange={handleChange}
                />
                <input
                    className={'auth__input ' + ( errors.password ? 'invalid' : '' )}
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                />
                <input
                    className={'auth__input ' + ( errors.confirm_password ? 'invalid' : '' )}
                    type='password'
                    placeholder='Confirm password'
                    name='confirm_password'
                    value={data.confirm_password}
                    onChange={handleChange}
                />

                {
                    msgError &&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                }


                <button
                    className='btn btn-primary btn-block mb-5'
                    disabled={loading}
                    type='submit'
                >
                    Register
                </button>

                <Link to='/auth/login' className='link'>
                    Already registered?
                </Link>
            </form>
        </>
    );
};

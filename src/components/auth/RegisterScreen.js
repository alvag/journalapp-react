import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator/es';

export const RegisterScreen = () => {

    const form = useForm( {
        name: [
            'Test 1', [
                [validator.isEmpty, { ignore_whitespace: true }]
            ]
        ],
        email: ['test1@gmail.com', [validator.isEmail, validator.isEmpty]],
        password: ['123456', [validator.isEmpty, [validator.isLength, { min: 6 }]]],
        confirm_password: ['123456', [validator.isEmpty, [validator.isLength, { min: 6 }]]]
    } );

    const { name, email, password, confirm_password } = form.values;

    const handleRegister = ( e ) => {
        e.preventDefault();

        if ( form.isValid && password === confirm_password ) {
            console.log( 'Formulario correcto' );
            console.log( form.values );
        }

    };

    return (
        <>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={handleRegister}>

                <div className='auth__alert-error'>
                    Hola Mundo
                </div>

                <input
                    className='auth__input'
                    type='text'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    value={name}
                    onChange={form.handleChange}
                />
                <input
                    className='auth__input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value={email}
                    onChange={form.handleChange}
                />
                <input
                    className='auth__input'
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={form.handleChange}
                />
                <input
                    className='auth__input'
                    type='password'
                    placeholder='Confirm password'
                    name='confirm_password'
                    value={confirm_password}
                    onChange={form.handleChange}
                />
                <button
                    className='btn btn-primary btn-block mb-5'
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

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { googleLogin, loginWithEmailPassword } from '../../actions/auth';
import validator from 'validator/es';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );

    const handleLogin = () => {
        const { email, password } = data;
        dispatch( loginWithEmailPassword( email, password ) );
    };

    const { data, handleSubmit, handleChange, errors } = useForm( {
        email: 'test1@gmail.com',
        password: '123456'
    }, {
        email: validator.isEmail,
        password: [
            validator.isEmpty,
            validator.isLength
        ]
    }, handleLogin );


    const handleGoogleLogin = () => {
        dispatch( googleLogin() );
    };

    return (
        <>
            <h3 className='auth__title'>Login</h3>

            <form onSubmit={handleSubmit}
                  className='animate__animated animate__fadeIn animate__faster'>
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

                <button className='btn btn-primary btn-block'
                        disabled={loading}
                        type='submit'>
                    Login
                </button>

                <div className='auth__social-networks'>
                    <p>Login with social networks</p>

                    <div className='google-btn' onClick={handleGoogleLogin}>
                        <div className='google-icon-wrapper'>
                            <img
                                className='google-icon'
                                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                alt='google button'
                            />
                        </div>
                        <p className='btn-text'>
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to='/auth/register' className='link'>
                    Create new account
                </Link>
            </form>
        </>
    );
};

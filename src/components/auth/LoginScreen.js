import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { googleLogin, loginWithEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const { values: formValues, handleChange: formChange } = useForm( {
        email: 'test@gmail.com',
        password: '123'
    } );

    const { email, password } = formValues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( loginWithEmailPassword( email, password ) );
    };

    const handleGoogleLogin = () => {
        dispatch( googleLogin() );
    };

    return (
        <>
            <h3 className='auth__title'>Login</h3>

            <form onSubmit={handleLogin}>
                <input
                    className='auth__input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value={email}
                    onChange={formChange}
                />
                <input
                    className='auth__input'
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={formChange}
                />
                <button className='btn btn-primary btn-block' type='submit'>
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

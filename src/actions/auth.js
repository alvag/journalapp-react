import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import Swal from 'sweetalert2';
import { finishLoading, removeError, startLoading } from './ui';

export const loginWithEmailPassword = ( email, password ) => {
    return async ( dispatch ) => {
        try {
            dispatch( startLoading() );
            dispatch( removeError() );
            const { user } = await firebase.auth().signInWithEmailAndPassword( email, password );
            dispatch( finishLoading() );
            const { uid, displayName } = user;
            dispatch( login( uid, displayName ) );
        } catch ( e ) {
            console.log( e );
            Swal.fire( 'Error!', e.message, 'error' );
            dispatch( finishLoading() );
        }
    };
};

export const registerUser = ( email, password, name ) => {
    return async ( dispatch ) => {
        try {
            dispatch( startLoading() );
            const { user } = await firebase.auth().createUserWithEmailAndPassword( email, password );
            await user.updateProfile( { displayName: name } );
            const { uid, displayName } = user;
            dispatch( login( uid, displayName ) );
            dispatch( finishLoading() );
        } catch ( e ) {
            console.log( e );
            dispatch( finishLoading() );
            Swal.fire( 'Error!', e.message, 'error' );
        }
    };
};

export const googleLogin = () => {
    return async ( dispatch ) => {
        try {
            const { user } = await firebase.auth().signInWithPopup( googleAuthProvider );
            const { uid, displayName } = user;
            dispatch( login( uid, displayName ) );
        } catch ( e ) {
            console.log( e );
        }
    };
};

export const login = ( uid, displayName ) => ( {
    type: types.login,
    payload: { uid, displayName }
} );

export const startLogout = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut();
        dispatch( logout() );
    };
};

export const logout = () => ( {
    type: types.logout
} );

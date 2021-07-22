import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';

export const loginWithEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
        setTimeout( () => {
            dispatch( login( 123, 'Max' ) );
        }, 3500 );
    };
};

export const googleLogin = () => {
    return async ( dispatch ) => {
        try {
            const userCredential = await firebase.auth().signInWithPopup( googleAuthProvider );
            const { uid, displayName } = userCredential.user;
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

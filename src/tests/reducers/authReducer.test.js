import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe( 'Pruebas en authReducer', () => {

    test( 'debe de realizar el login', () => {
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Max'
            }
        };
        const state = authReducer( initState, action );

        expect( state ).toEqual( {
            uid: 'abc',
            name: 'Max'
        } );
    } );

    test( 'debe de realizar el logout', () => {
        const initState = {
            uid: 'abc',
            name: 'Max'
        };
        const action = {
            type: types.logout
        };
        const state = authReducer( initState, action );

        expect( state ).toEqual( {} );
    } );

    test( 'no debe de realizar cambios en el state', () => {
        const initState = {
            uid: 'abc',
            name: 'Max'
        };
        const action = {
            type: 'asasasasa'
        };
        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
    } );
} );

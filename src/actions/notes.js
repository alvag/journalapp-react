import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        try {
            const { uid } = getState().auth;

            const newNote = {
                title: '',
                body: '',
                date: new Date().getTime()
            };

            const doc = await db.collection( `${uid}/journal/notes` ).add( newNote );
            dispatch( activeNote( doc.id, newNote ) );
            dispatch( notesAddNew( { id: doc.id, ...newNote } ) );
        } catch ( e ) {
            console.log( e );
        }
    };
};

export const notesAddNew = ( note ) => ( {
    type: types.notesAddNew,
    payload: note
} );

export const activeNote = ( id, note ) => ( {
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
} );

export const startLoadingNotes = ( uid ) => {
    return async dispatch => {
        try {
            const notes = await loadNotes( uid );
            dispatch( setNotes( notes ) );
        } catch ( e ) {
            console.log( e );
        }

    };
};

export const setNotes = ( notes ) => ( {
    type: types.notesLoad,
    payload: notes
} );

export const updateNote = ( note ) => {
    return async ( dispatch, getState ) => {
        try {
            const { uid } = getState().auth;
            const { id } = note;
            delete note.id;
            if ( !note.url ) {
                delete note.url;
            }
            await db.doc( `${uid}/journal/notes/${id}` ).update( note );
            dispatch( refreshNote( id, note ) );
            Swal.fire( 'Saved', note.title, 'success' );
        } catch ( e ) {
            console.log( e );
            Swal.fire( 'Error', e.message, 'error' );
        }
    };
};

export const refreshNote = ( id, note ) => ( {
    type: types.notesUpdated,
    payload: { id, note: { id, ...note } }
} );

export const uploadFile = ( file ) => {
    return async ( dispatch, getState ) => {
        try {
            const { active: note } = getState().notes;

            Swal.fire( {
                title: 'Uploading...',
                text: 'Please wait...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            } );

            note.url = await fileUpload( file );
            dispatch( updateNote( note ) );

            Swal.close();

        } catch ( e ) {
            console.log( e );
            Swal.fire( 'Error', e.message, 'error' );
        }
    };
};

export const deletingNote = ( id ) => {
    return async ( dispatch, getState ) => {
        try {
            const { uid } = getState().auth;
            await db.doc( `${uid}/journal/notes/${id}` ).delete();
            dispatch( deleteNote( id ) );
        } catch ( e ) {
            console.log( e );
            Swal.fire( 'Error', e.message, 'error' );
        }
    };
};

export const deleteNote = ( id ) => ( {
    type: types.notesDelete,
    payload: id
} );

export const cleanNotes = () => ( {
    type: types.notesLogoutCleaning
} );

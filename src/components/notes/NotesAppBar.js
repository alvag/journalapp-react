import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, uploadFile } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector( state => state.notes );

    const handleSave = () => {
        dispatch( updateNote( { ...note } ) );
    };

    const handlePictureUpload = () => {
        document.getElementById( 'uploadFile' ).click();
    };

    const handleFileChange = ( e ) => {
        const file = e.target.files[ 0 ];
        if ( file ) {
            dispatch( uploadFile( file ) );
            document.getElementById( 'uploadFile' ).value = '';
        }
    };

    return (
        <div className='notes__appbar'>
            <span>28 de Agosto 2020</span>

            <input
                id='uploadFile'
                type='file'
                accept='.jpg, .jpeg, .png'
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div>
                <button
                    className='btn'
                    onClick={handlePictureUpload}
                >Picture
                </button>

                <button
                    className='btn'
                    onClick={handleSave}
                >Save
                </button>
            </div>
        </div>
    );
};

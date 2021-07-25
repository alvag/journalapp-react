import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import validator from 'validator/es';
import { activeNote } from '../../actions/notes';

export const NoteScreen = () => {
    const dispatch = useDispatch();

    const { active: note } = useSelector( state => state.notes );
    const activeId = useRef( note.id );

    const { data, handleChange, reset } = useForm( note, {
        title: validator.isEmpty,
        body: validator.isEmpty
    } );

    useEffect( () => {
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
    }, [note, reset] );

    useEffect( () => {
        dispatch( activeNote( data.id, { ...data } ) );
    }, [dispatch, data] );

    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input
                    className='notes__title-input'
                    type='text'
                    name='title'
                    autoComplete='of'
                    placeholder='Title'
                    onChange={handleChange}
                    value={data.title}
                />

                <textarea
                    className='notes__textarea'
                    name='body'
                    placeholder='What happened today'
                    onChange={handleChange}
                    value={data.body}
                />

                {
                    note.url &&
                    <div className='notes__image'>
                        <img
                            src={note.url}
                            alt=''
                        />
                    </div>
                }
            </div>
        </div>
    );
};

import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    className="notes__title-input"
                    type="text"
                    autoComplete="of"
                    placeholder="Title"
                />

                <textarea
                    className="notes__textarea"
                    placeholder="What happened today"
                ></textarea>

                <div className="notes__image">
                    <img
                        src="https://neilpatel.com/wp-content/uploads/2017/09/image-editing-tools.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

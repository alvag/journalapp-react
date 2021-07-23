import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';


export const JournalEntry = ( { id, date, title, body, url } ) => {
    const noteDate = moment( date );

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch( activeNote( id, { date, title, body, url } ) );
    };

    return (
        <div className='journal__entry' onClick={handleClick}>
            {
                url &&
                <div
                    className='journal__entry-picture'
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                />
            }

            <div className='journal__entry-body'>
                <div className='journal__entry-title'>{title}</div>

                <div className='journal__entry-content'>
                    {body}
                </div>
            </div>

            <div className='journal__entry-date-box'>
                <span>{noteDate.format( 'dddd' )}</span>
                <h4>{noteDate.format( 'D' )}</h4>
            </div>
        </div>
    );
};

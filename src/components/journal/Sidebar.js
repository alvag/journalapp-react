import React from 'react';
import { JournalEntries } from './JournalEntries';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Sidebar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() );
    };

    return (
        <div className='journal__sidebar'>
            <div className='journal__sidebar-navbar mt-5'>
                <h3>
                    <i className='far fa-moon' />
                    <span> Max</span>
                </h3>

                <button
                    className='btn'
                    onClick={handleLogout}
                >Logout
                </button>
            </div>

            <div className='journal__new-entry'>
                <i className='far fa-calendar-plus fa-5x' />
                <p className='mt-5'>New entry</p>
            </div>

            <JournalEntries />
        </div>
    );
};

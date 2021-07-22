import React from 'react';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
    return (
        <div className='journal__sidebar'>
            <div className='journal__sidebar-navbar mt-5'>
                <h3>
                    <i className='far fa-moon' />
                    <span> Max</span>
                </h3>

                <button className='btn'>Logout</button>
            </div>

            <div className='journal__new-entry'>
                <i className='far fa-calendar-plus fa-5x' />
                <p className='mt-5'>New entry</p>
            </div>

            <JournalEntries />
        </div>
    );
};

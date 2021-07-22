import React from 'react';
import ReactDom from 'react-dom';
import { JournalApp } from './JournalApp';
import './styles/styles.scss';

require( 'dotenv' ).config();

ReactDom.render( <JournalApp />, document.getElementById( 'root' ) );

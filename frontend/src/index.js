// #region  H E A D E R
// <copyright file="index.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Bad Bank 3-Tier App - FRONT-END
 *      Module:   Modules (./index.js)
 *      Project:  MicroCODE 3-Tier MERN App 'BadBank'
 *      Customer: Internal+MIT xPRO Course
 *      Creator:  MicroCODE Incorporated
 *      Date:     October 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the MicroCODE's Bad Bank React App Entry Point.
 *      This started with MicroCODE's JavaScript Template Class for 'frontend\client'
 *      to implement the template MERN 'BadBank' project.
 *
 *      This implements the Client-side, the 'FRONT-END'.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      ---------------------
 *
 *      1. ...
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  03-Jun-2022   TJM-MCODE  {0001}    New module implementing the Bad Bank App Entry.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

import App from './App';
import {AppContextProvider} from './Components/AppContext';

// include our common MicroCODE Server Library
import {log} from './mcodeClient.js';

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// support .env file variables -- this bring the .env file variables into the 'process.env' object
require('dotenv').config();

// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

// #region  C O N S T A N T S

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

// #endregion

// #region  C O M P O N E N T - E X P O R T S


// log our Environment Variables in sorted order for reference
const envSorted = Object.keys(process.env)
    .sort()
    .reduce((accumulator, key) =>
    {
        accumulator[key] = process.env[key];
        return accumulator;
    }, {});

log(`process.env (sorted):${JSON.stringify(envSorted)}`, logSource, `Information`);

ReactDOM.render(

    <React.StrictMode>

        <AppContextProvider>

            <App />

        </AppContextProvider>

    </React.StrictMode>,

    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// #endregion

// #endregion
// #endregion
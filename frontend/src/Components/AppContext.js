// #region  H E A D E R
// <copyright file="context.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Bad Bank Context
 *      Module:   Modules (./context.js)
 *      Project:  MicroCODE Common Code
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     June 2022
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
 *      This module implements the MicroCODE's Common React Component Template.
 *      This file is copied to start all MicroCODE React Component files.
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
 *  02-Jun-2022   TJM-MCODE  {0001}    New module for Bad Bank as a React App.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React, {useState} from 'react';

// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

const defaultValue = {

    // App version
    Version: "<No Context Provider>",
    setVersion: () => { },

    // Index to the active User, currently logged in
    UserIndex: 0,
    setUserIndex: () => { },

    // Value indicating whether or not anyone is currently logged in
    LoggedIn: false,
    setLoggedIn: () => { },

    // Value indicating who is currently logged in
    CurrentUser: '',
    setCurrentUser: () => { },

    // User List
    Users: {},
    setUsers: () => { },

};

// App Context holding User information
const AppContext = React.createContext(defaultValue);

// Our global Context Provider
const AppContextProvider = (props) =>
{
    const [Version, setVersion] = useState("Version 0.3.0");
    const [LoggedIn, setLoggedIn] = useState(false);
    const [UserIndex, setUserIndex] = useState(0);
    const [CurrentUser, setCurrentUser] = useState('');
    const [Users, setUsers] = useState([]);

    return (
        <AppContext.Provider

            value={{

                Version,
                setVersion,

                Users,
                setUsers,

                LoggedIn,
                setLoggedIn,

                UserIndex,
                setUserIndex,

                CurrentUser,
                setCurrentUser,
            }}
        >
            {props.children}

        </AppContext.Provider>
    );
};

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export {AppContext, AppContextProvider};

// #endregion

// #endregion
// #endregion
// #region  H E A D E R
// <copyright file="alldata.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Bad Bank React All Data
 *      Module:   Modules (./alldata.js)
 *      Project:  MicroCODE Bad Bank React App
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
 *      This module implements the MicroCODE's Bad Bank React Login.
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
 *  02-Jun-2022   TJM-MCODE  {0001}    New module implementing the Bad Bank Context Display (All Data).
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from './AppContext';
import BankCard from './BankCard';
import axios from 'axios';

// include our common MicroCODE Client Library
import {log, simplifyText} from '../mcodeClient.js';

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

//    localhost:8080 for development
//    https://appname.tjmcode.io/backend for frontend
// or http://appname.tjmcode.io:8080 for backend
//
const API_URL = `${process.env.REACT_APP_BACKEND_URL}`;

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

/**
 * AllData() – returns all data from our Bad Bank Accounts.
 *
 * @api public
 *
 * @param {nil} no properties.
 *
 * @returns JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      AllData();
 *
 */
function AllData()
{
    // validate PROPS input(s)

    // initialize STATE and define accessors...
    const [accounts, setAccounts] = useState(null);

    // access CONTEXT for reference...
    const ctx = useContext(AppContext);

    // #region  P R I V A T E   F U N C T I O N S

    // useEffect with an empty dependency array
    useEffect(() =>
    {
        (async () =>
        {
            log(`Getting all Accounts from DB...`, logSource, "Information");

            let res = await fetchJsonData(API_URL + `/account/all`);
            setAccounts(res.data);

        })();

    }, []);

    // generic routine to get JSON data from a URL
    const fetchJsonData = async (url) =>
    {
        return await axios.get(url);
    };

    // Build an HTML List of all our User Accounts
    function buildAccountList()
    {
        const accountArray = [];
        var key = 0;

        if (accounts)
        {
            // Update our App Context
            ctx.Users = accounts;

            log(`Returning All Data listing...`, logSource, "Information");

            for (var i in ctx)
            {
                if (i === "Users")
                {
                    for (var j in ctx[i])
                    {
                        if (ctx[i][j])
                        {
                            key++;

                            // pick up the Users array, skipping "users" tag (which is not an array)
                            accountArray.push(<li key={key} className="list-group-item">{simplifyText(JSON.stringify(ctx[i][j]))}</li>);
                        }
                    }
                }
            }
        }
        else
        {
            log(`Awaiting Server response...`, logSource, "Warning");

            accountArray.push(<li key={key} className="list-group-item">Awaiting badbank-backend response...</li>);
        }

        return accountArray;
    };

    // #endregion

    // #region  E V E N T   H A N D L E R S
    /*
     * *_Click() - 'on click' event handlers for UI elements.
     */

    // #endregion

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <BankCard
            bgcolor="warning"
            header="Account Data"
            width="60rem"
            body={(
                <ul className="list-group">
                    {/* the rest of the list is build from the Account array held within our Context */}
                    {buildAccountList()}
                </ul>
            )}
        />
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default AllData;

// #endregion

// #endregion
// #endregion
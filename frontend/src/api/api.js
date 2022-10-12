// #region  H E A D E R
// <copyright file="api.js" company="MicroCODE Incorporated">Copyright © 2021 MicroCODE Incorporated Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    Bad Bank API
 *      Module:   api (badbank-frontend:api.js)
 *      Project:  MicroCODE Version of MIT 'Bad Bank'
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     December 2021
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2021,2022 MicroCODE Incorporated
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
 *      This module implements the MicroCODE JavaScript Class for 'api'
 *      to implement the MIT 'Bad Bank' Fire Hydrant project.
 *
 *      This module defines HTML calls into the API functions of our Server.
 *      Also known as the 'Function Hooks' for each UI Widget.
 *      This implements the Client-side, the 'FRONT-END'.
 *
 *      The goal: Fire Hydrant Award, and prepare to build LADDERS Web Services.
 *
 *      UPDATE: Reused and updated to use AXIOS and our new LOG facility.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. Starter Code Repository (Front end and API)
 *         https://github.com/1125f16/badbank
 *      2. Starter Code Repository (Simple database)
 *         https://github.com/1125f16/littledb
 *         This is a repository that will get you familiar with the process of storing data with the lowdb package.
 *
 *
 *      VIDEOS:
 *      -------
 *
 *      1. Three Tiers - HTTP Server (Links to an external site.)
 *         https://youtu.be/TL9GyGWqjp4
 *      2. Three Tiers - Data Store (Links to an external site.)
 *         https://youtu.be/yM8nFgkeD-c
 *      3. Three Tiers - HTTP Server + Data Store (Links to an external site.)
 *         https://youtu.be/E9VJ2de654M
 *      4. Three Tiers - HTTP Server + Data Store + HTML Client
 *         https://youtu.be/vcXdW4V8GNs
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  24-Dec-2021   TJM-MCODE  {0001}    New module for MIT Fire Hydrant assignment.
 *  05-Mar-2022   TJM-MCODE  {0002}    Documentation updates.
 *  11-Oct-2022   TJM-MCODE  {0003}    Brought into React App version to encapsulate the API.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

// include SuperAgent for HTTP requests
import axios from 'axios';

// include our common MicroCODE Client Library
import {log} from '../mcodeClient.js';

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

// Axios Success Status
const RES_SUCCESS = 200;

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  F U N C T I O N S – P R I V A T E

//

/**
 * getRes() -- Common execution and event logging for every API function.
 *
 * @api private
 *
 * @param {string} functionName name to display in the event log.
 * @param {string} url the path to the Back-End Entry Point.
 * @returns the Axios Response.
 *
 * @example
 *
 *    var functionName = "Account Login";
 *    var url = `${API_URL}/account/login/${email}/${password}`;
 *    return getRes(functionName, url);
 *
 */
const getRes = async (functionName, url) =>
{
    let res = {};
    try
    {
        res = await axios.get(url);

        if (res.status === RES_SUCCESS)
        {
            log(`API: ${functionName} - Data: ${JSON.stringify(res.data)}`, logSource, `Information`);
        }
        else
        {
            const resMessage = JSON.parse(res.text);
            log(`API: ${functionName} - Error: ${resMessage.error}`, logSource, `Error`);
        }
    }
    catch (error)
    {
        log(`API: ${functionName} - Exception: ${error}`, logSource, `Fatal`);
    }

    return res;
};

// #endregion

// #region  F U N C T I O N S – P U B L I C

var api = {};

/**
 * create() -- Create USER ACCOUNT on Back-End.
 *
 * @api public
 *
 * @param {string} username user selected display name.
 * @param {string} email user's email - UNIQUE ACCOUNT KEY.
 * @param {string} password user's password.
 * @param {string} deposit initial deposit.
 * @returns the Axios Response.
 *
 * @example
 *
 *    res = api.create("username", "user@company.com", "secret01", 1111.22);
 *
 */
api.create = async (username, email, password, deposit) =>
{
    var functionName = "Create Account";
    var url = `${API_URL}/account/create/${username}/${email}/${password}/${deposit}`;
    return getRes(functionName, url);
};

/**
 * login() -- Confirm USER CREDENTIALS on Back-End.
 *
 * @param {string} email user's email - UNIQUE ACCOUNT KEY.
 * @param {string} password user's password.
 * @returns the Axios Response.
 *
 * @example
 *
 *    res = api.create("username", "user@company.com", "secret01", 1111.22);
 *
 */
api.login = async (email, password) =>
{
    var functionName = "Account Login";
    var url = `${API_URL}/account/login/${email}/${password}`;
    return getRes(functionName, url);
};

/**
 * deposit() -- DEPOSIT funds to Account in Back-End.
 *
 * @api public
 *
 * @param {string} email user's email - UNIQUE ACCOUNT KEY.
 * @param {string} deposit deposit amount.
 * @returns the Axios Response.
 *
 * @example
 *
 *    res = api.create("username", "user@company.com", "secret01", 1111.22);
 *
 */
api.deposit = async (email, deposit) =>
{
    var functionName = "Deposit Funds";
    var url = `${API_URL}/account/deposit/${email}/${deposit}`;
    return getRes(functionName, url);
};

/**
 * withdraw() -- WITHDRAW funds from Account in Back-End.
 *
 * @api public
 *
 * @param {string} email user's email - UNIQUE ACCOUNT KEY.
 * @param {string} withdraw withdraw amount.
 * @returns the Axios Response.
 *
 * @example
 *
 *    res = api.create("username", "user@company.com", "secret01", 1111.22);
 *
 */
api.withdraw = async (email, withdraw) =>
{
    var functionName = "Withdraw Funds";
    var url = `${API_URL}/account/withdraw/${email}/${withdraw}`;
    return getRes(functionName, url);
};

/**
 * transactions() -- Get all user TRANSACTIONS from Back-End.
 *
 * @api public
 *
 * @param {string} email user's email - UNIQUE ACCOUNT KEY.
 * @returns the Axios Response.
 *
 * @example
 *
 *    res = api.create("username", "user@company.com", "secret01", 1111.22);
 *
 */
api.transactions = async (email) =>
{
    var functionName = "View Transactions";
    var url = `${API_URL}/account/transactions/${email}`;
    return getRes(functionName, url);
};

/**
 * balance() -- Get user BALANCE from Back-End.
 *
 * @param {string} email user's email - UNIQUE ACCOUNT KEY.
 * @returns the Axios Response.
 *
 * @example
 *
 *    res = api.create("username", "user@company.com", "secret01", 1111.22);
 */
api.balance = async (email) =>
{
    var functionName = "View Balance";
    var url = `${API_URL}/account/balance/${email}`;
    return getRes(functionName, url);
};

/**
 * allData() -- Get ALL DATA from Back-End.
 *
 * @api public
 *
 * @returns the Axios Response.
 *
 * @example
 *
 *    res = api.create("username", "user@company.com", "secret01", 1111.22);
 *
 */
api.allData = async () =>
{
    var functionName = "Get All Data";
    var url = `${API_URL}/account/all`;
    return getRes(functionName, url);
};

// #endregion

// #region  M O D U L E - E X P O R T S

export {api};

// #endregion

// #endregion
// #endregion
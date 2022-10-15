// #region  H E A D E R
// <copyright file="server.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE
 *      Module:   index (.\backend\server.js)
 *      Project:  MicroCODE 3-Tier MERN App `BadBank`
 *      Customer: MIT xPRO Course
 *      Creator:  MicroCODE Incorporated
 *      Date:     October 2022
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
 *      This module implements the MicroCODE JavaScript Class for `backend\server`
 *      to implement the MIT `Bad Bank` Fire Hydrant project.
 *      This was reused in the refactoring of the React App version of my `Bad Bank` app.
 *
 *      This implements the Server-side, the `BACK-END`.
 *
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
 *  25-Aug-2022   TJM-MCODE  {0002}    Copied from `Fire Hydrant` project to move React App to MERN Architecture.
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

// #region  C O N S T A N T S

//    localhost:8080 for development
//    https://badbank.tjmcode.io/backend for frontend
// or https://badbank.tjmcode.io:8080 for backend
//
const APP_PORT = parseInt(`${process.env.APP_BACKEND_PORT}`);
const APP_URL = `https://${process.env.APP_SUBDOMAIN}:${APP_PORT}`;

// #endregion

// #region  P R I V A T E   F I E L D S

/*
 * SERVER: FILE SYSTEM, STORAGE, and STRUCTURES
 * --------------------------------------------
 * These define the Server it`s File System, Storage mechanisms, and stored Objects/Structures.
 *
 */

// load ExpressJS
const express = require(`express`);

// allow Cross Origin Resource Sharing (for development only)
const cors = require(`cors`);

// support .env file variables -- this bring the .env file variables into the `process.env` object
require(`dotenv`).config();

// instantiate ExpressJS
const app = express();

// load Faker to generate test data

// include our common MicroCODE Server Library
var mcode = require(`./src/mcodeServer.js`);

// load our Data Abstraction Layer (DAL)
const dal = require(`./src/dal.js`);

// load our DB Scheme and Constructors
const model = require(`./src/models/account.model.js`);

// get our current file name for logging events
var path = require(`path`);
var logSource = path.basename(__filename);

// Required data store structure
/*
{
    account:
    {
        name        : "",
        email       : "",
        password    : "",
        balance     : 0.00,
        created     : "YYYY-MM-DD HH:MM:SS.mmm"
        transaction : []
    }

    transaction:
    {
        type      : <DEPOSIT, WITHDRAW, BALANCE>
        amount    : 0.00
        balance   : 0.00
        timestamp : "YYYY-MM-DD HH:MM:SS.mmm"
    }
}
*/
// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

// #endregion

// #region  A P I – P U B L I C

/*
 * API: INITIALIZATION
 * -------------------
 * This instantiates our Application Programming Interface (API)
 * and listens for Client requests.
 *
 */

// configure express to serve static files from public directory
app.use(express.static(`public`));

// configure CORS to share resources
app.use(cors());

// Startup Server
// Define a LISTENER with a simple Callback function that logs a response in the console...
app.listen(APP_PORT, function ()
{
    // show that our listener is alive
    mcode.log(`SERVER -- Running on Port: ${APP_PORT}!  Path: ${APP_URL}`, logSource, `info`);
});

/*
 * API: UI ROUTES
 * --------------
 * These make up our Application Programming Interface (API)
 * and correspond to the UI Widgets.
 *
 */

/**
 * Define a ROUTE - from Browser to Server.
 *
 * `/` = ROOT
 * `req` = REQUEST
 * `res` = RESPONSE
 *
 */
app.get(`/`, function (req, res)
{
    // a simple response to a request
    res.send("Bad Bank Server is online. [NOTE: This should never be seen if the React App is being served properly.]");
});

app.get(`/test`, function (req, res)
{
    // a simple response to a request
    res.send("Bad Bank Server was test scucessful. [NOTE: Changes to this file are *not* dynamic, they are loaded at Page Display.]");
});

/**
 * @function api.create() -- create account route
 *
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/account/create/:username/:email/:password/:deposit`, function (req, res)
{
    mcode.log(`CREATE -- Creating Account for ${req.params.email}`, logSource, `info`);

    // Check for existing Account from Database
    dal.findAccount(req.params.email)
        .then((res_find) =>
        {
            if (res_find)
            {
                const find_msg = `CREATE -- Create Account FAILED, account exists for: ${req.params.email}`;
                mcode.log(find_msg, logSource, `error`);
                res.status(401).json({error: find_msg});
            }
            else
            {
                let account = model.accountRecord(req.params.username, req.params.email, req.params.password, parseFloat(req.params.deposit));

                dal.createAccount(account)
                    .then(() =>
                    {
                        mcode.log(`CREATE -- Successfully created User Account: ${account.email}`, logSource, `info`);
                        res.send(account);
                    })
                    .catch((exp_create) =>
                    {
                        const exp_msg = mcode.exp(`CREATE -- dal.createAccount CRASHED.`, logSource, exp_create);
                        res.status(401).json({error: exp_msg});
                    })
                    .finally(() =>
                    {

                    });
            }
        })
        .catch((exp_find) =>
        {
            res.status(401).json({error: exp_find});
        })
        .finally(() =>
        {

        });
});

/**
 * @function api.delete() -- delete account route
 *
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/account/delete/:username/:email/:password`, function (req, res)
{
    mcode.log(`DELETE -- Deleting Account for ${req.params.email}`, logSource, `info`);

    // Check for existing Account from Database
    dal.findAccount(req.params.email)
        .then((res_find) =>
        {
            if (!res_find)
            {
                const find_msg = `DELETE -- Delete Account FAILED, account does not exists for: ${req.params.email}`;
                mcode.log(find_msg, logSource, `error`);
                res.status(401).json({error: find_msg});
            }
            else
            {
                let account = model.accountRecord(req.params.username, req.params.email, req.params.password, 0);

                dal.deleteAccount(account)
                    .then(() =>
                    {
                        mcode.log(`DELETE -- Successfully delete User Account: ${account.email}`, logSource, `info`);
                        res.send(account);
                    })
                    .catch((exp_create) =>
                    {
                        const exp_msg = mcode.exp(`DELETE -- dal.deleteAccount CRASHED.`, logSource, exp_create);
                        res.status(401).json({error: exp_msg});
                    })
                    .finally(() =>
                    {

                    });
            }
        })
        .catch((exp_find) =>
        {
            const exp_msg = mcode.exp(`DELETE -- dal.findAccount CRASHED.`, logSource, exp_find);
            res.status(401).json({error: exp_find});
        })
        .finally(() =>
        {

        });
});
/**
 * @function api.login() -- user confirm credentials
 *
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/account/login/:email/:password`, function (req, res)
{
    mcode.log(`LOGIN -- Logging into Account of ${req.params.email}`, logSource, `info`);

    // Get Account from Database
    dal.findAccount(req.params.email)
        .then((res_find) =>
        {
            if (!res_find)
            {
                const find_msg = `LOGIN -- Login to Account FAILED, account does not exists for: ${req.params.email}`;
                mcode.log(find_msg, logSource, `error`);
                res.status(401).json({error: find_msg});
            }
            else
            {
                mcode.log(`LOGIN -- Login to Account SUCEEDED with ${res_find.email}`, logSource, `info`);
                res.send(res_find);
            }
        })
        .catch((exp_find) =>
        {
            const exp_msg = mcode.exp(`LOGIN -- dal.findAccount CRASHED.`, logSource, exp_find);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        });
});

/**
 * @function api.deposit() -- deposit money to account by email
 *
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/account/deposit/:email/:amount`, function (req, res)
{
    mcode.log(`DEPOSIT -- Depositing Funds into Account of ${req.params.email}`, logSource, `info`);

    // Deposit directly into Account in Database
    dal.depositFunds(req.params.email, req.params.amount)
        .then((res_deposit) =>
        {
            if (!res_deposit)
            {
                const deposit_msg = `DEPOSIT -- Login to Account FAILED, account does not exists for: ${req.params.email}`;
                mcode.log(deposit_msg, logSource, `error`);
                res.status(401).json({error: deposit_msg});
            }
            else
            {
                mcode.log(`DEPOSIT -- Successfully deposited User funds, new balance: ${res_deposit.balance}`, logSource, `info`);
                res.send(res_deposit);
            }
        })
        .catch((exp_deposit) =>
        {
            const exp_msg = mcode.exp(`DEPOSIT -- dal.depositFunds CRASHED.`, logSource, exp_deposit);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        });
});

/**
 * @function api.withdraw() -- withdraw money from account by email
 *
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/account/withdraw/:email/:amount`, function (req, res)
{
    mcode.log(`WITHDRAW -- Withdrawing Funds from Account of ${req.params.email}`, logSource, `info`);

    // Withdraw directly from Account in Database
    dal.withdrawFunds(req.params.email, req.params.amount)
        .then((res_withdraw) =>
        {
            if (!res_withdraw)
            {
                const withdraw_msg = `WITHDRAW -- Login to Account FAILED, account does not exists for: ${req.params.email}`;
                mcode.log(withdraw_msg, logSource, `error`);
                res.status(401).json({error: withdraw_msg});
            }
            else
            {
                mcode.log(`WITHDRAW -- Successfully withdrew User funds, new balance: ${res_withdraw.balance}`, logSource, `info`);
                res.send(res_withdraw);
            }
        })
        .catch((exp_withdraw) =>
        {
            const exp_msg = mcode.exp(`WITHDRAW -- dal.withdrawFunds CRASHED.`, logSource, exp_withdraw);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        });
});

/**
 * @function api.balance() -- Return balance for specific accounts
 *
 * @returns {object} accounts JSON data object if successful
 */
app.get(`/account/balance/:email`, function (req, res)
{
    mcode.log(`BALANCE -- Returning Account Balance for ${req.params.email}`, logSource, `info`);

    // returns balance in the database
    dal.accountBalance(req.params.email)
        .then((res_balance) =>
        {
            mcode.log(`BALANCE -- Account Balance: $${res_balance.balance}`, logSource, `info`);
            res.send(res_balance);
        })
        .catch((exp_balance) =>
        {
            const exp_msg = mcode.exp(`BALANCE -- dal.accountBalance CRASHED.`, logSource, exp_balance);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        });
});

/**
 * @function api.allData() -- Return data for all accounts
 *
 * @returns {object} accounts JSON data object if successful
 */
app.get(`/account/all`, function (req, res)
{
    mcode.log(`ALL DATA -- Returning all Account Data...`, logSource, `info`);

    // returns all data in the database
    dal.allAccounts()
        .then((res_allAccounts) =>
        {
            mcode.log(`ALL DATA -- Get data succeeded, number = ${res_allAccounts.length}.`, logSource, `info`);
            // debug only --- mcode.log(`ALL DATA -- Users: ${JSON.stringify(res_allAccounts)}`, logSource, `info`);
            res.send(res_allAccounts);
        })
        .catch((exp_allAccounts) =>
        {
            const exp_msg = mcode.exp(`BALANCE -- dal.allAccounts CRASHED.`, logSource, exp_allAccounts);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        });
});

// #endregion

// #endregion
// #endregion
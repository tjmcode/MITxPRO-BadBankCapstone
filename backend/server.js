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
 *      1. Starter Code Repository (Front-End and API)
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
 *  Date:         By-Group:   Rev:    Description:
 *
 *  25-Aug-2022   TJM-MCODE  {0001}   Copied from 'Fire Hydrant' project to move React App to MERN Architecture.
 *  14-Oct-2022   TJM-MCODE  {0002}   Added Roles for controlling access to ALL DATA.
 *  15-Oct-2022   TJM-MCODE  {0003}   Added 'Send Money' feature.
 *  17-Oct-2022   TJM-MCODE  {0004}   Fix SEND MONEY by sequencing the DAL Promsises with 'Promise.all()'
 *  17-Oct-2022   TJM-MCODE  {0005}   Added APPLE ID Sign-In - https://badbank.tjmcode.io/backend/account/appleid/notification
 *
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

/**
 * @namespace mcodeServer
 * @desc MicroCODE's shared library for constructing the Back-End of a 3-Tier MERN Apps.
 */

/**
 * @namespace server
 * @desc Bad Bank's Express Route Handler (ERH).
 */

// #region  C O N S T A N T S

//    localhost:8081 for development
//    http://45.55.107.145/backend for staging
//    https://badbank.tjmcode.io/backend for frontend production
// or https://badbank.tjmcode.io:8081 for backend production
//
const APP_PORT = parseInt(`${process.env.APP_BACKEND_PORT}`);
const APP_URL = `${process.env.APP_SUBDOMAIN}:${APP_PORT}`;

// #endregion

// #region  P R I V A T E   F I E L D S

/*
 * SERVER: FILE SYSTEM, STORAGE, and STRUCTURES
 * --------------------------------------------
 * These define the Server it's File System, Storage mechanisms, and stored Objects/Structures.
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
//* const faker = require(`faker`);

// include our common MicroCODE Server Library
var mcode = require(`./src/mcodeServer.js`);

// load our Data Abstraction Layer (DAL)
const dal = require(`./src/dal/dal.js`);

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
        role        : "",
        balance     : 0.00,
        created     : "YYYY-MM-DD HH:MM:SS.mmm"
        transaction : [ ]
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

// configure CORS to share resources -- THIS MUST COME BEFORE ROUTES
app.use(cors());

// Startup Server
// Define a LISTENER with a simple Callback function that logs a response in the console...
app.listen(APP_PORT, function ()
{
    // show that our listener is alive
    mcode.log(`SERVER -- Running on Port: ${APP_PORT}!  Path: ${APP_URL}`, logSource, `success`);
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
 * @func appleid
 * @memberof server
 * @desc Responds to Apple Id notifications.
 * @api public
 * @returns {object} response to Apple
 * @returns {string} 401 status with error message if unsucessful
 */
app.post(`/account/appleid/notification`, async function (req, res)
{
    mcode.log(`Apple Request: ${req}`, logSource, `wait`);

    const user = await getAppleUserId(req.body.id_token);
    res.redirect(303, 'https://badbank.tjmcode.io/app?user=${JSON.stringify(req.body.id_token)}');

    // respond to Apple Id requests
    res.send("Response for Apple Id requests...");
});


/**
 * @func create
 * @memberof server
 * @desc Creates account route.
 * @api public
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/account/create/:username/:email/:password/:role/:deposit`, function (req, res)
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
                let account = model.accountRecord(req.params.username, req.params.email, req.params.password,
                    req.params.role, parseFloat(req.params.deposit));

                dal.createAccount(account)
                    .then(() =>
                    {
                        mcode.log(`CREATE -- Successfully created User Account: ${account.email}`, logSource, `success`);
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
 * @func delete
 * @memberof server
 * @desc Delete user account.
 * @api public
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
                        mcode.log(`DELETE -- Successfully delete User Account: ${account.email}`, logSource, `success`);
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
 * @func login
 * @memberof server
 * @desc Confirms user's credentials.
 * @api public
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
                mcode.log(`LOGIN -- Login to Account SUCCEEDED with ${res_find.email}`, logSource, `success`);
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
 * @func deposit
 * @memberof server
 * @desc Deposit money to account by email.
 * @api public
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
                mcode.log(`DEPOSIT -- Successfully deposited User funds, new balance: ${res_deposit.balance}`, logSource, `success`);
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
 * @func withdraw
 * @memberof server
 * @desc Withdraw money from account by email.
 * @api public
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
                mcode.log(`WITHDRAW -- Successfully withdrew User funds, new balance: ${res_withdraw.balance}`, logSource, `success`);
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
 * @func balance
 * @memberof server
 * @desc Return balance for a specific account.
 * @api public
 * @returns {object} accounts data object if successful
 */
app.get(`/account/balance/:email`, function (req, res)
{
    mcode.log(`BALANCE -- Returning Account Balance for ${req.params.email}`, logSource, `info`);

    // returns balance from the database
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
 * @func sendMoney
 * @memberof server
 * @desc Sends money from account to another by email.
 * @api public
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/account/sendMoney/:email/:amount/:receiver`, function (req, res)
{
    mcode.log(`SENDMONEY -- Sending Money from Account of ${req.params.email} to Account of ${req.params.receiver}`, logSource, `info`);

    let sendersAccount = {};  // init until 'Withdraw' gives us the Sender's Account Object

    // 1) Check for receiver in Bad Bank
    // 2) Attempt Withdraw from User (allow Overdraft to make money LOL, 'Bad Bank')
    // 3) Deposit the money in other personal Account

    // to seqeunce the Promises creates by the DAL I use an array of the created promises and 'Promise.all()' to sequence them...
    let sequence = [];

    // Set Step 1) Check for receiver in Bad Bank
    sequence.push(dal.findAccount(req.params.receiver)
        .then((res_find) =>
        {
            if (!res_find)
            {
                const sendMoney_msg = `SENDMONEY -- Receiver doesn't have a Bad Bank Account, email: ${req.params.receiver}`;
                mcode.log(sendMoney_msg, logSource, `error`);
                res.status(401).json({error: sendMoney_msg});
            }
        })
        .catch((exp_find) =>
        {
            const exp_msg = mcode.exp(`SENDMONEY -- dal.findAccount CRASHED.`, logSource, exp_find);
            res.status(401).json({error: exp_find});
        })
        .finally(() =>
        {

        }));

    // Set Step 2) Attempt Withdraw from User (allow Overdraft to make money LOL, 'Bad Bank')
    sequence.push(dal.withdrawFunds(req.params.email, req.params.amount)
        .then((res_withdrawMoney) =>
        {
            if (!res_withdrawMoney)
            {
                const sendMoney_msg = `SENDMONEY -- User access FAILED, account does not exists for: ${req.params.email}`;
                mcode.log(sendMoney_msg, logSource, `error`);
                res.status(401).json({error: sendMoney_msg});
            }
            else
            {
                sendersAccount = res_withdrawMoney;  // hold to return after deposit into Receiver's
                mcode.log(`SENDMONEY -- Successfully withdrew User funds, new balance: ${res_withdrawMoney.balance}`, logSource, `success`);
            }
        })
        .catch((exp_withdrawMoney) =>
        {
            const exp_msg = mcode.exp(`SENDMONEY -- dal.withdrawFunds CRASHED.`, logSource, exp_withdrawMoney);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        }));

    // Set Step 3) Deposit the money in other personal Account
    sequence.push(dal.depositFunds(req.params.receiver, req.params.amount)
        .then((res_depositMoney) =>
        {
            if (!res_depositMoney)
            {
                const deposit_msg = `SENDMONEY -- Receiver access FAILED, account does not exists for: ${req.params.receiver}`;
                mcode.log(deposit_msg, logSource, `error`);
                res.status(401).json({error: deposit_msg});
            }
            else
            {
                mcode.log(`SENDMONEY -- Successfully deposited User funds, new balance: ${res_depositMoney.balance}`, logSource, `success`);
            }
        })
        .catch((exp_depositMoney) =>
        {
            const exp_msg = mcode.exp(`SENDMONEY -- dal.depositFunds CRASHED.`, logSource, exp_depositMoney);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        }));

    // Now exeute all the DAL transactions in sequence...
    Promise.all(sequence)
        .then((result) =>
        {
            result.forEach((response) =>
            {
                mcode.log(`SENDMONEY -- Successfully deposited User funds, new balance: ${response}`, logSource, `success`);
            });
        })
        .catch((exp_sendMoney) =>
        {
            const exp_msg = mcode.exp(`SENDMONEY -- DAL Promise Sequence CRASHED.`, logSource, exp_sendMoney);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {
            if (sendersAccount)
            {
                // final response to API -- the original Sender's updated Account
                res.send(sendersAccount);
            }
            else
            {
                const exp_msg = mcode.exp(`SENDMONEY -- DAL Promise Sequence FAILED.`, logSource, 'error');
                res.status(401).json({error: exp_msg});
            }
        });
});

/**
 * @func transactions
 * @memberof server
 * @desc Returns transactions for a specific account.
 * @api public
 * @returns {object} accounts data object if successful
 */
app.get(`/account/transactions/:email`, function (req, res)
{
    mcode.log(`TRANSACTIONS -- Returning Account Transactions for ${req.params.email}`, logSource, `info`);

    // returns transactions from the database
    dal.accountTransactions(req.params.email)
        .then((res_transactions) =>
        {
            mcode.log(`TRANSACTIONS -- Number of Account Transactions: ${res_transactions.transactions.length}`, logSource, `info`);
            res.send(res_transactions);
        })
        .catch((exp_transactions) =>
        {
            const exp_msg = mcode.exp(`TRANSACTIONS -- dal.accountTransactions CRASHED.`, logSource, exp_transactions);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        });
});

/**
 * @func allData
 * @memberof server
 * @desc Returns all data for all accounts.
 * @api public
 * @returns {object} accounts data object if successful
 */
app.get(`/account/all`, function (req, res)
{
    mcode.log(`ALL DATA -- Returning all Account Data...`, logSource, `info`);

    // returns all data in the database
    dal.allAccounts()
        .then((res_allAccounts) =>
        {
            mcode.log(`ALL DATA -- Get data succeeded, number = ${res_allAccounts.length}.`, logSource, `success`);
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
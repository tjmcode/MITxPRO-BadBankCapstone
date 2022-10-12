// #region  H E A D E R
// <copyright file="server.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE
 *      Module:   index (.\backend\server.js)
 *      Project:  MicroCODE 3-Tier MERN App 'BadBank'
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
 *      This module implements the MicroCODE JavaScript Class for 'backend\server'
 *      to implement the MIT 'Bad Bank' Fire Hydrant project.
 *      This was reused in the refactoring of the React App version of my 'Bad Bank' app.
 *
 *      This implements the Server-side, the 'BACK-END'.
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
 *  25-Aug-2022   TJM-MCODE  {0002}    Copied from 'Fire Hydrant' project to move React App to MERN Architecture.
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
 * These define the Server it's File System, Storage mechanisms, and stored Objects/Structures.
 *
 */

// load ExpressJS
const express = require('express');

// allow Cross Origin Resource Sharing (for development only)
const cors = require('cors');

// support .env file variables -- this bring the .env file variables into the 'process.env' object
require('dotenv').config();

// instantiate ExpressJS
const app = express();

// load Faker to generate test data
const faker = require(`faker`);

// include our common MicroCODE Server Library
var mcode = require('./src/mcodeServer.js');

// load our Data Abstraction Layer (DAL)
const dal = require('./src/dal.js');

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// and our Account Schema
const User = require(`./src/models/account.model`);

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
app.use(express.static('public'));

// configure CORS to share resources
app.use(cors());

// Startup Server
// Define a LISTENER with a simple Callback function that logs a response in the console...
app.listen(APP_PORT, function ()
{
    // show that our listener is alive
    mcode.log(`Running on Port: ${APP_PORT}!  Path: ${APP_URL}`, logSource, `Information`);
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
 * '/' = ROOT
 * 'req' = REQUEST
 * 'res' = RESPONSE
 *
 */
app.get('/', function (req, res)
{
    // a simple response to a request
    res.send("Bad Bank Server is online. [NOTE: This should never be seen if the React App is being served properly.]");
});

app.get('/test', function (req, res)
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
app.get('/account/create/:username/:email/:password/:deposit', function (req, res)
{
    mcode.log(`Creating Account...`, logSource, `Information`);

    let amount = parseFloat(req.params.deposit);

    dal.createAccount(req.params.username, req.params.email, req.params.password, amount)
        .then((account) =>
        {
            mcode.log(`Successfully created User Account: ${account.email}`, logSource, `Information`);
            res.send(account);
        });
});

/**
 * @function api.login() -- user confirm credentials
 *
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get('/account/login/:email/:password', function (req, res)
{
    console.log();
    console.log("Logging into Account...");

    // done in Client with a current copy of 'AllData'

});

/**
 * @function api.deposit() -- deposit money to account by email
 *
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get('/account/deposit/:email/:amount', function (req, res)
{
    mcode.log(`Depositing Funds...`, logSource, `Information`);

    let amount = parseFloat(req.params.amount);

    mcode.log(`About to add ${amount} to balance.`, logSource, `Information`);

    dal.depositFunds(req.params.email, amount)
        .then((account) =>
        {
            mcode.log(`Successfully deposited User funds, new balance: ${account.balance}`, logSource, `Information`);
            res.send(account);
        });
});

/**
 * @function api.withdraw() -- withdraw money from account by email
 *
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get('/account/withdraw/:email/:amount', function (req, res)
{
    mcode.log(`Withdrawing Funds...`, logSource, `Information`);

    let amount = parseFloat(req.params.amount);

    console.log(`About to subtract ${amount} from balance.`);

    dal.withdrawFunds(req.params.email, amount)
        .then((account) =>
        {
            mcode.log(`Successfully withdrew User funds: ${account.balance}`, logSource, `Information`);
            res.send(account);
        });
});

/**
 * @function api.balance() -- Return balance for specific accounts
 *
 * @returns {object} accounts JSON data object if successful
 */
app.get('/account/balance/:email', function (req, res)
{
    mcode.log(`Returning Account Balance...`, logSource, `Information`);

    // returns balance in the database
    dal.balance()
        .then((balance) =>
        {
            mcode.log(`balance:${JSON.stringify(balance)}`, logSource, `Information`);
            res.send(balance);
        });
});

/**
 * @function api.allData() -- Return data for all accounts
 *
 * @returns {object} accounts JSON data object if successful
 */
app.get('/account/all', function (req, res)
{
    mcode.log(`Returning all Account Data...`, logSource, `Information`);

    // returns all data in the database
    dal.allAccounts()
        .then((users) =>
        {
            mcode.log(`users:${JSON.stringify(users)}`, logSource, `Information`);
            res.send(users);
        });
});

// #endregion

// #endregion
// #endregion
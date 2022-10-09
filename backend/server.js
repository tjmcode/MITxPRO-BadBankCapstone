// #region  H E A D E R
// <copyright file="server.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE
 *      Module:   index (.\backend\server.js)
 *      Project:  MicroCODE 3-Tier MERN Template 'AppName'
 *      Customer: Internal + MIT xPRO Course
 *      Creator:  MicroCODE Incorporated
 *      Date:     August 2022
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
 *      to implement the template MERN 'Appname' project.
 *
 *      This implements the Server-side, the 'BACK-END'.
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
//    https://appname.tjmcode.io/backend for frontend
// or https://appname.tjmcode.io:8080 for backend
//
const appPort = parseInt(`${process.env.APP_BACKEND_PORT}`);
const appUrl = `https://${process.env.APP_SUBDOMAIN}:${appPort}`;

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

// instantiate ExpressJS
const app = express();

// load Faker to generate test data
const faker = require(`faker`);

// include our common MicroCODE Server Library
var mcode = require('./src/mcodeServer.js');

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// load our common MongoDB connection
const connectDB = require(`./src/database`);

// and our User Schema
const User = require(`./src/models/user.model`);

// support .env file variables -- this bring the .env file variables into the 'process.env' object
require('dotenv').config();

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

// #endregion

// #region  A P I –- P U B L I C

/*
 * API: UI ROUTES
 * --------------
 * These make up our Application Programming Interface (API)
 * and correspond to the UI Widgets.
 *
 */

// configure express to serve static files from public directory
app.use(express.static('public'));

// configure CORS to share resources -- THIS MUST COME BEFORE ROUTES
app.use(cors());

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
    res.send(`MicroCODE Generic 3-Tier MERN Response from ${process.env.APP_NAME}-backend\n`);
});

app.get('/test', function (req, res)
{
    // a simple response to a request
    res.send("MicroCODE Generic 3-Tier MERN test was scucessful. [NOTE: Changes to this file are *not* dynamic, they are loaded at Page Display.]\n");
});

/**
 * @function api.create() -- create account route
 *
 * Required data store structure
*
    user:
    {
        name     : "",
        email    : "",
        password : "",
    }
 *
 *
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/user-create`, async (req, res) =>
{
    const user = new User(
        {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        });

    try
    {
        await user.save().then(() => mcode.log(`User [${user.username}] was created in database.`, logSource, `Information`));
        res.send(`User [${user.username}] was created.\n`);
    }
    catch
    {
        mcode.log(`Creation of User [${user.username}] failed, check MongoDB.`, logSource, `Error`);
        res.send(`Creation of User [${user.username}] failed, check MongoDB.\n`);
    }

});

/**
 * @function api.delete() -- delete all accounts route
 *
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/users-delete`, async (req, res) =>
{
    await User.deleteMany({}).then(() => mcode.log(`All Users were deleted from database.`, logSource, `Warning`));

    res.send(`All Users deleted.\n`);
});

/**
 * @function api.users() -- Return all accounts
 *
 * @returns {object} accounts JSON data object if successful
 */
app.get(`/users`, async (req, res) =>
{
    const users = await User.find();
    mcode.log(`users:${mcode.simplifyText(JSON.stringify(users))}`, logSource, `Information`);

    res.json(users);
});

// #endregion

// #region  A P I -- E X E C U T I O N

/*
 * API: INITIALIZATION
 * -------------------
 * This instantiates our Application Programming Interface (API)
 * and listens for Client requests.
 *
 */

// Startup Server
// Define a LISTENER with a simple Callback function that logs a response in the console...
app.listen(appPort, function ()
{
    // show that our listener is alive
    mcode.log(`Running on Port: ${appPort}!  Path: ${appUrl}`, logSource, `Information`);
    mcode.log(`Attempting Database connection: ${appUrl}`, logSource, `Waiting`);

    try
    {
        // connect to our database server/container
        connectDB().then(() => mcode.log(`Database connected.`, logSource, `Information`));
    }
    catch
    {
        mcode.log(`Database connection failed: ${appUrl}`, logSource, `Error`);
    }
});

// #endregion

// #endregion
// #endregion
// #region  H E A D E R
// <copyright file="database.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Common MongoDB Connection
 *      Module:   Modules (./database.js)
 *      Project:  MicroCODE 3-Tier MERN Template 'AppName'
 *      Customer: Internal + MIT xPRO Course
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
 *      This module implements the MicroCODE's Common MongoDB Connection.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO MERN Examples
 *         https://student.emeritus.org/courses/3291/files/2554233/download?wrap=1

 *
 *
 *      DEMONSTRATION VIDEOS:
 *      --------------------
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
 *  03-Oct-2022   TJM-MCODE  {0001}    New module for common reusable MERN Template 'AppName'.
 *
 *
 */
"use strict";

// include client to talk to MongoDB
const mongoose = require('mongoose');

// include our common MicroCODE Server Library
var mcode = require('./mcodeServer.js');

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

// #region  C O N S T A N T S

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

// #endregion

// #region  M E T H O D S – P R I V A T E

// #endregion

// #region  E X E C U T I O N

// log in sorted order
const envSorted = Object.keys(process.env)
    .sort()
    .reduce((accumulator, key) =>
    {
        accumulator[key] = process.env[key];
        return accumulator;
    }, {});

mcode.log(`process.env (sorted):${mcode.simplifyText(JSON.stringify(envSorted))}`, logSource, `Information`);

// for running native on local machine
// const connection = 'mongodb://localhost:27017/appname';
// const connection = 'mongodb://appname.tjmcode.io:27017/appname';

// for running in a Docker Container that's running a HOST named "mongo"
// NOTE: This "mongo" is *not* the Docker Container Name!
//                  mondodb://hostname:port/appname
const connection = `mongodb://${process.env.APP_NAME}-database:${process.env.APP_DATABASE_PORT}/${process.env.APP_NAME}`;

mcode.log(`Database Connection Path: ${connection}`, logSource, `Information`);

const connectDB = () =>
{
    var dbConnectionStatus = false;

    try
    {
        dbConnectionStatus = mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true});
        mcode.log(`Database Connection Status: ${dbConnectionStatus}`, logSource, `Information`);
    }
    catch
    {
        dbConnectionStatus = false;
        mcode.log(`Database Connection Status: ${dbConnectionStatus}`, logSource, `Error`);
    }

    return dbConnectionStatus;
};

// #endregion

// #region  M E T H O D - E X P O R T S

module.exports = connectDB;

// #endregion

// #endregion
// #endregion
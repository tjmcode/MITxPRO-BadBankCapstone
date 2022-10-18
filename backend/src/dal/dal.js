// #region  H E A D E R
// <copyright file="dal.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    Bad Bank BACK-END -- Database Abstraction Layer (DAL)
 *      Module:   index (badbank:dal.js)
 *      Project:  MicroCODE Version of MIT 'Bad Bank'
 *      Customer: Internal
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
 *      This module implements the MicroCODE JavaScript Class for 'dal'
 *      a Data Abstraction Layer (DAL) between our App and the MongoDB.
 *
 *      This implements the Server-side, the 'BACK END'.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1.  Starter Code Repository (Front end and API)
 *          https://github.com/1125f16/badbank
 *
 *      2.  Starter Code Repository (Simple database)
 *          https://github.com/1125f16/littledb
 *          This is a repository that will get you familiar with the process of storing data with the lowdb package.
 *
 *      3.  MongoDB JavaScript Tutorial
 *          https://zetcode.com/javascript/mongodb/
 *
 *
 *      VIDEOS:
 *      -------
 *
 *      1.  Three Tiers - HTTP Server (Links to an external site.)
 *          https://youtu.be/TL9GyGWqjp4
 *
 *      2.  Three Tiers - Data Store (Links to an external site.)
 *          https://youtu.be/yM8nFgkeD-c
 *
 *      3.  Three Tiers - HTTP Server + Data Store (Links to an external site.)
 *          https://youtu.be/E9VJ2de654M
 *
 *      4.  Three Tiers - HTTP Server + Data Store + HTML Client
 *          https://youtu.be/vcXdW4V8GNs
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  25-Aug-2022   TJM-MCODE  {0002}    New module to move React App to MERN Architecture.
 *
 *
 */
"use strict";

// include client to talk to MongoDB
const {MongoClient} = require(`mongodb`);

// NOTE: Build as CommonJS Module for NodeJS Version v16.7.0

// include our common MicroCODE Server Library
const mcode = require(`../mcodeServer.js`);

// load our DB Scheme and Constructors
const model = require(`../models/account.model.js`);

// get our current file name for logging events
const path = require('path');
const logSource = path.basename(__filename);

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

// #region  C O N S T A N T S

// for running native on local machine
// const DB_URL = 'mongodb://localhost:27017/appname';
// const DB_URL = 'mongodb://appname.tjmcode.io:27017/appname';

// for running in a Docker Container that's running a HOST named "mongo"
// NOTE: This "mongo" is *not* the Docker Container Name!
//                  mondodb://hostname:port/appname
const DB_URL = `mongodb://${process.env.APP_NAME}-database:${process.env.APP_DATABASE_PORT}`;
const DB_NAME = `${process.env.APP_DATABASE_NAME}`;

const BB_OVERDRAFT_FEE = 35.00; // really 'Bad Bank'

// #endregion

// #region  P R I V A T E   F I E L D S

var db = null;  // te MongoDB Database on the 'appname'-database node

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

// #endregion

// #region  M E T H O D S – P R I V A T E

// #endregion

// #region  E X E C U T I O N

/*
 * SERVER: DATA ABSTRACTION LAYER (DAL)
 * ------------------------------------
 * These define the Server's interface to the Data Store, in this case MongoDB.
 *
 */

// log our Environment Variables in sorted order for reference
const envSorted = Object.keys(process.env)
    .sort()
    .reduce((accumulator, key) =>
    {
        accumulator[key] = process.env[key];
        return accumulator;
    }, {});

mcode.log(`DAL: init - process.env (sorted):${JSON.stringify(envSorted)}`, logSource, `info`);

// open MongoDB Connection
mcode.log(`DAL: init - Using Database Connection Path: ${DB_URL}`, logSource, `info`);

MongoClient.connect(DB_URL, {useUnifiedTopology: true}, (err, client) =>
{
    try
    {
        db = client.db(DB_NAME);

        mcode.log(`DAL: init - Connected to Mongo DB Server, using database: ${db.databaseName}`, logSource, `info`);
    }
    catch (exception)
    {
        mcode.exp(`DAL: init - Database Connection CRASHED, MongoDB Error: ${err}`, logSource, exception);
    }
});

/**
 * @namespace dal
 * @desc The Data Abstraction Layer (DAL) for the App's Back-End.
 */
var dal = {};

/**
 * @func createAccount
 * @desc Create a new Account with an initial deposit.
 * @api public
 * @memberof dal
 * @param {object} account an object representing the initial data for a new account.
 * @returns {object} current data for Account from DB.
 *
 * @example
 *
 *      createAccount(account);  // see 'createAccount' in server.js
 *
 */
function createAccount(account)
{
    return new Promise((resolve, reject) =>
    {
        db.collection('Accounts').insertOne(account)
            .then((res_insert) =>
            {
                mcode.log(`DAL: createAccount - MongoDB response: ${JSON.stringify(res_insert)}`, logSource, `info`);

                // return the RESPONSE from MongoDB which is the RECORD
                resolve(res_insert);
            })
            .catch((exp_insert) =>
            {
                mcode.exp(`DAL: createAccount - .insertOne CRASHED with Account: [${account}]`, logSource, exp_insert);
                reject(exp_insert);
            })
            .finally(() =>
            {

            });
    });
};

/**
 * @func deleteAccount
 * @desc Delete an existing Account. NOTE: This deletes all copies matching 'account.email' and can be used to clean-up the DB.
 * @api public
 * @memberof dal
 * @param {object} account a object representing the initial data for a new account.
 * @returns {object} current data for Account from DB.
 *
 * @example
 *
 *      deleteAccount(account);  // see 'deleteAccount' in server.js
 *
 */
function deleteAccount(account)
{
    return new Promise((resolve, reject) =>
    {
        db.collection('Accounts').deleteMany({"email": account.email})
            .then((res_remove) =>
            {
                mcode.log(`DAL: deleteAccount - MongoDB response: ${JSON.stringify(res_remove)}`, logSource, `info`);

                // return the RESPONSE from MongoDB which is the RECORD
                resolve(res_remove);
            })
            .catch((exp_remove) =>
            {
                mcode.exp(`DAL: deleteAccount - .deleteMany CRASHED with Account: [${account}]`, logSource, exp_remove);
                reject(exp_remove);
            })
            .finally(() =>
            {

            });
    });
};

/**
 * @func depositFunds
 * @desc Deposit funds into Account.
 * @api public
 * @memberof dal
 * @param {string} email User's email account - UNIQUE KEY.
 * @param {float} amount New funds for account - FLOATING POINT.
 * @returns {object} current data for Account from DB.
 *
 * @example
 *
 *      depositFunds('pparker@mit.edu', 100.00);
 *
 */
function depositFunds(email, amount)
{
    return new Promise(async (resolve, reject) =>
    {
        db.collection('Accounts').findOne({"email": email})
            .then((res_find) =>
            {
                mcode.log(`DAL: depositFunds - Depositing $${amount} into ${res_find.username} account.`, logSource, `info`);

                // Add deposit and create a TRANSACTION for it
                res_find.balance = mcode.roundToCents(parseFloat(res_find.balance) + parseFloat(amount));
                res_find.transactions.push(model.transactionRecord("DEPOSIT", amount, res_find.balance));

                db.collection('Accounts')
                    .updateOne({"email": email}, {$set: {balance: res_find.balance, transactions: res_find.transactions}})
                    .then((res_update) =>
                    {
                        mcode.log(`DAL: depositFunds - MongoDB res: ${JSON.stringify(res_update)}`, logSource, `info`);

                        // return the updated RECORD, *not* the .updateOne RESPONSE from MongoDB
                        resolve(res_find);
                    })
                    .catch((exp_update) =>
                    {
                        mcode.exp(`DAL: depositFunds - .updateOne handling CRASHED with ${account}`, logSource, exp_update);
                        reject(exp_update);
                    })
                    .finally(() =>
                    {

                    });
            })
            .catch((exp_find) =>
            {
                mcode.exp(`DAL: depositFunds - .findOne CRASHED for [${email}]`, logSource, exp_find);
                reject(exp_find);
            })
            .finally(() =>
            {

            });
    });
};

/**
 * @func withdrawFunds
 * @desc Withdraw funds from Account.
 * @api public
 * @memberof dal
 * @param {string} email User's email account - UNIQUE KEY.
 * @param {float} amount Funds taken from account - FLOATING POINT.
 * @returns {object} current data for Account from DB.
 *
 * @example
 *
 *      withdrawFunds('pparker@mit.edu', 100.00);
 *
 */
function withdrawFunds(email, amount)
{
    return new Promise(async (resolve, reject) =>
    {
        db.collection('Accounts').findOne({"email": email})
            .then((res_find) =>
            {
                mcode.log(`DAL: withdrawFunds - Depositing $${amount} into ${res_find.username} account.`, logSource, `info`);

                // Add withdraw and create a TRANSACTION for it
                res_find.balance = mcode.roundToCents(parseFloat(res_find.balance) - parseFloat(amount));
                res_find.transactions.push(model.transactionRecord("WITHDRAW", amount, res_find.balance));

                db.collection('Accounts')
                    .updateOne({"email": email}, {$set: {balance: res_find.balance, transactions: res_find.transactions}})
                    .then((res_update) =>
                    {
                        mcode.log(`DAL: withdrawFunds - MongoDB res: ${JSON.stringify(res_update)}`, logSource, `info`);

                        // check for OVERDRAFT and generate a seocnd transaction if required (Bad Bank always let's you overdraw!
                        if (res_find.balance < 0)
                        {
                            // Add withdraw and create a TRANSACTION for it
                            res_find.balance = mcode.roundToCents(parseFloat(res_find.balance) - parseFloat(BB_OVERDRAFT_FEE));
                            res_find.transactions.push(model.transactionRecord("OVERDRAFT", BB_OVERDRAFT_FEE, res_find.balance));

                            db.collection('Accounts')
                                .updateOne({"email": email}, {$set: {balance: res_find.balance, transactions: res_find.transactions}})
                                .then((res_overdraft) =>
                                {
                                    mcode.log(`DAL: withdrawFunds - MongoDB OVERDRAFT res: ${JSON.stringify(res_overdraft)}`, logSource, `info`);

                                    // return the updated RECORD, *not* the .updateOne RESPONSE from MongoDB
                                    resolve(res_find);
                                })
                                .catch((exp_overdraft) =>
                                {
                                    mcode.exp(`DAL: withdrawFunds - .updateOne OVERDRAFT CRASHED with ${account}`, logSource, exp_overdraft);
                                    reject(exp_overdraft);
                                })
                                .finally(() =>
                                {

                                });
                        }

                        // return the updated RECORD, *not* the .updateOne RESPONSE from MongoDB
                        resolve(res_find);
                    })
                    .catch((exp_update) =>
                    {
                        mcode.exp(`DAL: withdrawFunds - .updateOne handling CRASHED with ${account}`, logSource, exp_update);
                        reject(exp_update);
                    })
                    .finally(() =>
                    {

                    });
            })
            .catch((exp_find) =>
            {
                mcode.exp(`DAL: withdrawFunds - .findOne CRASHED for [${email}]`, logSource, exp_find);
                reject(exp_find);
            })
            .finally(() =>
            {

            });
    });
};

/**
 * @func accountBalance
 * @desc Get Balance in an Account.
 * @api public
 * @memberof dal
 * @param {string} email User's email account - UNIQUE KEY.
 * @returns {object} current data for Account from DB.
 *
 * @example
 *
 *      accountBalance('pparker@mit.edu');
 *
 */
function accountBalance(email)
{
    return new Promise(async (resolve, reject) =>
    {
        db.collection('Accounts')
            .findOne({"email": email})
            .then((res_find) =>
            {
                mcode.log(`DAL: accountBalance - MongoDB response: ${JSON.stringify(res_find)}`, logSource, `info`);

                // return the current RECORD, the RESPONSE from MongoDB
                resolve(res_find);
            })
            .catch((exp_find) =>
            {
                mcode.exp(`DAL: accountBalance - .findOne CRASHED for email: [${email}]`, logSource, exp_find);
                reject(exp_find);
            })
            .finally(() =>
            {

            });
    });
};

/**
 * @func accountTransactions
 * @desc Get Transactions in an Account.
 * @api public
 * @memberof dal
 * @param {string} email User's email account - UNIQUE KEY.
 * @returns {object} current data for Account from DB.
 *
 * @example
 *
 *      accountTransactions('pparker@mit.edu');
 *
 */
function accountTransactions(email)
{
    return new Promise(async (resolve, reject) =>
    {
        db.collection('Accounts')
            .findOne({"email": email})
            .then((res_find) =>
            {
                mcode.log(`DAL: accountTransactions - MongoDB response: ${JSON.stringify(res_find)}`, logSource, `info`);

                // return the current RECORD, the RESPONSE from MongoDB
                resolve(res_find);
            })
            .catch((exp_find) =>
            {
                mcode.exp(`DAL: accountTransactions - .findOne CRASHED for email: [${email}]`, logSource, exp_find);
                reject(exp_find);
            })
            .finally(() =>
            {

            });
    });
};

/**
 * @func allAccounts
 * @desc Return all data for all Accounts.
 * @api public
 * @memberof dal
 * @returns {array} current data for All Account from DB as an array of objects.
 *
 * @example
 *
 *      allAccounts();
 *
 */
function allAccounts()
{
    return new Promise(async (resolve, reject) =>
    {
        db.collection('Accounts').find({}).toArray()
            .then((res_array) =>
            {
                if (!res_array)
                {
                    mcode.log(`DAL: allAccounts - Get data failed`, logSource, `error`);
                    reject(res_array);
                }
                else
                {
                    // debug only -- mcode.log(`DAL: allAccounts - MongoDB response: ${JSON.stringify(res_array)}`, logSource, `info`);
                    mcode.log(`DAL: allAccounts - Get data succeeded, number = ${res_array.length}.`, logSource, `info`);

                    // return the RESPONSE from MongoDB which is the ARRAY of RECORDs
                    resolve(res_array);
                }
            })
            .catch((exp_array) =>
            {
                mcode.exp(`DAL: allAccounts - .find CRASHED.`, logSource, exp_array);
                reject(exp_array);
            })
            .finally(() =>
            {

            });
    });
};

/**
 * @func findAccount
 * @desc Return Account object if found.
 * @api public
 * @memberof dal
 * @param {string} email User's email account - UNIQUE KEY.
 * @returns {object} current data for Account from DB.
 *
 * @example
 *
 *      findAccount(`name@company.com`);
 *
 */
function findAccount(email)
{
    return new Promise(async (resolve, reject) =>
    {
        db.collection('Accounts').findOne({"email": email})
            .then((res_find) =>
            {
                mcode.log(`DAL: findAccount - MongoDB response: ${JSON.stringify(res_find)}`, logSource, `info`);

                // return the RESPONSE from MongoDB which is the RECORD
                resolve(res_find);
            })
            .catch((exp_find) =>
            {
                mcode.exp(`DAL: findAccount - .findOne CRASHED for email: [${email}]`, logSource, exp_find);
                reject(exp_find);
            })
            .finally(() =>
            {

            });
    });
};

// #endregion

// #region  M E T H O D - E X P O R T S

module.exports = {createAccount, deleteAccount, depositFunds, withdrawFunds, accountBalance, accountTransactions, allAccounts, findAccount};

// #endregion

// #endregion
// #endregion
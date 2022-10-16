// #region  H E A D E R
// <copyright file="login.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Bad Bank React Login
 *      Module:   Modules (./login.js)
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
 *  02-Jun-2022   TJM-MCODE  {0001}    New module implementing the Bad Bank Account Login.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React, {useContext, useState} from 'react';
import {AppContext} from './AppContext';
import BankCard from './BankCard';

// include the Back-End API
import {api} from '../api/api.js';

// include our common MicroCODE Client Library
import {log, exp} from '../mcodeClient.js';

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

/**
 * @func Login
 * @memberof app
 * @desc Controls a user logging into their Bad Bank Account.
 * @api public
 * @param {nil} no properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      Login();
 *
 */
function Login()
{
    // validate PROPS input(s)

    // initialize STATE and define accessors...
    const [cleared, setCleared] = useState(false);
    const [needInput, setNeedInput] = useState(true);
    const [status, setStatus] = useState('');
    const [submit, setSubmit] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // access CONTEXT for reference...
    const ctx = useContext(AppContext);

    // #region  P R I V A T E   F U N C T I O N S

    // field validation...
    function validate(field, label)
    {
        if (!field)
        {
            setStatus(`error: A ${label} is required`);
            setSubmit('Disabled');
            return false;
        }

        if (label === "email")
        {
            const regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

            if (!field.match(regexEmail))
            {
                setStatus(`error: A valid email is required.`);
                setSubmit('Disabled');
                return false;
            }
        }

        return true;
    }

    // checks all form fields
    function checkFields()
    {
        setSubmit('Disabled');

        if (!validate(email, 'email')) return false;
        if (!validate(password, 'password')) return false;

        setSubmit('');
        setStatus('');

        return true;
    }

    // empties form of all data, resets 'need input' to get form opened up
    function clearForm()
    {
        setEmail('');
        setPassword('');
        setSubmit('Disabled');
        setNeedInput(true);
        setStatus('');
    }

    // #endregion

    // #region  E V E N T   H A N D L E R S
    /*
     * *_Click() - 'on click' event handlers for UI elements.
     */

    // clears the UI fields for Account creation unconditionally
    function clearForm_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        clearForm();
    }

    // logs into the selected User Account
    async function logIn_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        log(`[LOGIN] Login attempt - email: ${email} password: ${password}`, logSource, `info`);

        if (!checkFields())
        {
            setStatus(log(`[LOGIN] Login failed - email: ${email} password: ${password}`, logSource, `warn`));
            return;
        }

        log(`[LOGIN] Attempting User Login...`, logSource, `Waiting`);

        try
        {
            // Log into Account in Database
            api.login(email, password)
                .then((account) =>
                {
                    if (!account)
                    {
                        setStatus(log(`[LOGIN] Account Login failed, check email and password for: ${email}`, logSource, `error`));
                        setSubmit('Disabled');
                        setNeedInput(true);
                    }
                    else
                    {
                        delete account._id;  // the MongoDB ID is not part of our Client 'user'
                        ctx.setUser(account);  // update current user
                        ctx.setLoggedIn(true);

                        ctx.setPrivileged((account.role === "BANKER") || (account.role === "AUDITOR"));

                        log(`[LOGIN] Account contents: ${JSON.stringify(account)}`, logSource, `warn`);
                        log(`[LOGIN] Account Login succeeded - Email: ${account.email}`, logSource, `success`);
                        setStatus(``);
                        setSubmit('Disabled');
                        setNeedInput(false);
                    }
                });
        }
        catch (exception)
        {
            setStatus(exp(`[LOGIN] Login to Account CRASHED.`, logSource, exception));
            setSubmit('Disabled');
            setNeedInput(true);
        }
    }

    // logs out of the current User Account
    function logOut_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        log(`[LOGIN] Logout occurring - name:  ${ctx.User.username}`, logSource, `info`);

        ctx.setLoggedIn(false);
        ctx.setUser({"username": "You must log in..."});

        setSubmit('');
        setNeedInput(true);
    }

    // #endregion

    // perform component COMPUTATION to generate output
    if (!cleared)
    {
        clearForm();
        setCleared(true);

        setNeedInput(!ctx.LoggedIn);
    }

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <BankCard
            bgcolor="secondary"
            header="Login"
            width="30rem"
            status={status}
            body={needInput ? (
                <form>
                    Email Address<br />
                    <input type="email" autoComplete="new-password" required={true} className="form-control" id="email"
                        placeholder="Enter email" value={email} onChange={e =>
                        {
                            setSubmit('');
                            setStatus('');
                            setEmail(e.currentTarget.value);
                            validate(e.currentTarget.value, 'email');
                        }} /><br />

                    Password<br />
                    <input type="password" autoComplete="new-password" required={true} className="form-control" id="password"
                        placeholder="Enter password" value={password} onChange={e =>
                        {
                            setSubmit('');
                            setStatus('');
                            setPassword(e.currentTarget.value);
                            validate(e.currentTarget.value, 'password');
                        }} /><br />

                    <button type="button" className="btn btn-light" onClick={clearForm_Click}>Clear</button>
                    <> </>
                    <button type="submit" className="btn btn-light" onClick={logIn_Click} disabled={submit}>Log In</button>
                    <br />
                </form>
            ) : (
                <>
                    <h5>{ctx.User.username} is logged in.</h5>
                    <br />
                    <button type="submit" className="btn btn-light" onClick={logOut_Click}>Log Out</button>
                </>
            )}
        />
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default Login;

// #endregion

// #endregion
// #endregion
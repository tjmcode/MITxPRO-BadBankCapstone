// #region  H E A D E R
// <copyright file="account.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Bad Bank React Account
 *      Module:   Modules (./account.js)
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
 *      This module implements the MicroCODE's Bad Bank React Account.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *      2. MIT xPRO:
 *
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
 *  02-Jun-2022   TJM-MCODE  {0001}    New module implementing the creation Bad Bank Accounts.
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

const TIMEOUT_MSEC = 3000;
const MINIMUM_PASSWORD_LENGTH = 8;
const MINIMUM_OPENING_DEPOSIT = 100;

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
 * Account() – the Bad Bank Account Component.
 *
 * @api public
 *
 * @param {nil} no properties.
 *
 * @returns JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      Account();
 *
 */
function Account()
{
    // validate PROPS input(s) if required

    // initialize STATE and define accessors...
    const [cleared, setCleared] = useState(false);
    const [needInput, setNeedInput] = useState(true);
    const [status, setStatus] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState(0);

    // access CONTEXT for reference...
    const ctx = useContext(AppContext);

    // #region  P R I V A T E   F U N C T I O N S

    // field validation...
    function validate(field, label)
    {
        if (!field)
        {
            setStatus(`Error: ${label} is required`);
            setTimeout(() => setStatus(''), TIMEOUT_MSEC);
            setSubmitDisabled('Disabled');
            return false;
        }

        if (label === "email")
        {
            // make sure this email is not already in use
            var emailInUse = false;
            for (let i = 0; i < ctx.Users.length; i++)
            {
                if (ctx.Users[i].email === field)
                {
                    emailInUse = true;
                    break;
                }
            }
            if (emailInUse)
            {
                setStatus(`Error: The supplied email is already in use.`);
                setTimeout(() => setStatus(''), TIMEOUT_MSEC);
                setSubmitDisabled('Disabled');
                return false;
            }
        }

        if (label === "password")
        {
            if (field.length < MINIMUM_PASSWORD_LENGTH)
            {
                setStatus(`Error: Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters.`);
                setTimeout(() => setStatus(''), TIMEOUT_MSEC);
                setSubmitDisabled('Disabled');
                return false;
            }
        }

        if (label === "balance")
        {
            if (field < MINIMUM_OPENING_DEPOSIT)
            {
                setStatus('Error: Opening deposit is less than minimum.');
                setTimeout(() => setStatus(''), TIMEOUT_MSEC);
                setSubmitDisabled('Disabled');
                return false;
            }
        }

        return true;
    }

    // validates all form fields
    function checkFields()
    {
        setSubmitDisabled('Disabled');

        if (!validate(name, 'name')) return false;
        if (!validate(email, 'email')) return false;
        if (!validate(password, 'password')) return false;
        if (!validate(balance, 'balance')) return false;
        if (parseInt(balance) < MINIMUM_OPENING_DEPOSIT) return false;

        setSubmitDisabled('');

        return true;
    }

    // clear fields and prepares for new data
    function clearForm()
    {
        setName('');
        setEmail('');
        setPassword('');
        setBalance('');

        setSubmitDisabled('Disabled');
    };

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
        setNeedInput(true);
    }

    // creates a User Account if passed validate input fields
    async function createAccount_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)
        let needInput = true;  // in case we fail

        log(`Creating new Account - name: ${name} email: ${email} password: ${password}`, logSource, "Information");

        if (!checkFields())
        {
            return;
        }

        log(`Attempting Create User: ${API_URL}/account/create...`, logSource, `Waiting`);

        try
        {
            await axios.get(API_URL + `/account/create/${name}/${email}/${password}/${balance}`);
            ctx.Users.push({name, email, password, balance});
            log(`Create Account succeeded - User: ${name}`, logSource, `Information`);
            needInput = false;
        }
        catch
        {
            log(`Create Account failed: ${API_URL}/account/create...`, logSource, `Error`);
            needInput = true;
        }

        setNeedInput(needInput);
    }

    // #endregion

    // perform component COMPUTATION to generate output
    if (!cleared)
    {
        clearForm();
        setCleared(true);
    }

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <BankCard
            bgcolor="primary"
            header="Account"
            width="30rem"
            status={status}
            body={needInput ? (
                <form>
                    Name<br />
                    <input type="input" autoComplete="new-password" required={true} className="form-control" id="name"
                        placeholder="Enter name" value={name} onChange={e =>
                        {
                            setSubmitDisabled('');
                            setName(e.currentTarget.value);
                            validate(e.currentTarget.value, 'name');
                        }} /><br />

                    Email Address<br />
                    <input type="email" autoComplete="new-password" required={true} className="form-control" id="email"
                        placeholder="Enter email" value={email} onChange={e =>
                        {
                            setSubmitDisabled('');
                            setEmail(e.currentTarget.value);
                            validate(e.currentTarget.value, 'email');
                        }} /><br />

                    Password<br />
                    <input type="password" autoComplete="new-password" required={true} className="form-control" id="password"
                        placeholder="Enter password" value={password} onChange={e =>
                        {
                            setSubmitDisabled('');
                            setPassword(e.currentTarget.value);
                            validate(e.currentTarget.value, 'password');
                        }} /><br />

                    Initial Deposit<br />
                    <input type="input" autoComplete="new-password" required={true} className="form-control" id="balance"
                        placeholder="Initial balance ($100 min.)" value={balance} onChange={e =>
                        {
                            setSubmitDisabled('');
                            setBalance(e.currentTarget.value);
                            validate(e.currentTarget.value, 'balance');
                        }} /><br />

                    <button type="button" className="btn btn-light" onClick={clearForm_Click}>Clear</button>
                    <> </>
                    <button type="submit" className="btn btn-light" onClick={createAccount_Click} disabled={submitDisabled}>Create</button>
                    <br />
                </form>
            ) : (
                <>
                    <h5>Success</h5>
                    <br />
                    <button type="submit" className="btn btn-light" onClick={clearForm_Click}>Add another account</button>
                </>
            )}
        />
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default Account;

// #endregion

// #endregion
// #endregion
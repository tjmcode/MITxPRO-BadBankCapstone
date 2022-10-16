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
 *  Date:         By-Group:   Rev:      Description:
 *
 *  02-Jun-2022   TJM-MCODE  {0001}     New module implementing the creation Bad Bank Accounts.
 *  14-Oct-2022   TJM-MCODE  {0002}     Added Roles for controlling access to ALL DATA.
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

const TIMEOUT_MSEC = 2500;
const MINIMUM_PASSWORD_LENGTH = 8;
const MINIMUM_OPENING_DEPOSIT = 100;

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

/**
 * @func Account
 * @desc The Bad Bank Account Component.
 * @api public
 * @param {nil} no properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
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
    const [submit, setSubmit] = useState('');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CUSTOMER');
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
            setSubmit('Disabled');
            return false;
        }

        if (label === "email")
        {
            const regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

            if (!field.match(regexEmail))
            {
                setStatus(`Error: A valid email is required.`);
                setTimeout(() => setStatus(''), TIMEOUT_MSEC);
                setSubmit('Disabled');
                return false;
            }
        }

        if (label === "password")
        {
            if (field.length < MINIMUM_PASSWORD_LENGTH)
            {
                setStatus(`Error: Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters.`);
                setTimeout(() => setStatus(''), TIMEOUT_MSEC);
                setSubmit('Disabled');
                return false;
            }
        }

        if (label === "role")
        {
            if ((field !== "BANKER")
                && (field !== "CUSTOMER")
                && (field !== "AUDITOR"))
            {
                setStatus(`Error: Role must be one of: BANKER, CUSTOMER, AUDITOR.`);
                setTimeout(() => setStatus(''), TIMEOUT_MSEC);
                setSubmit('Disabled');
                return false;
            }
        }

        if (label === "balance")
        {
            if (field < MINIMUM_OPENING_DEPOSIT)
            {
                setStatus('Error: Opening deposit is less than minimum.');
                setTimeout(() => setStatus(''), TIMEOUT_MSEC);
                setSubmit('Disabled');
                return false;
            }
        }

        return true;
    }

    // validates all form fields for CREATE
    function checkCreateFields()
    {
        setSubmit('Disabled');

        if (!validate(username, 'username')) return false;
        if (!validate(email, 'email')) return false;
        if (!validate(password, 'password')) return false;
        if (!validate(balance, 'balance')) return false;
        if (parseInt(balance) < MINIMUM_OPENING_DEPOSIT) return false;

        setSubmit('');

        return true;
    }

    // validates all form fields for DELETE
    function checkDeleteFields()
    {
        setSubmit('Disabled');

        if (!validate(username, 'username')) return false;
        if (!validate(email, 'email')) return false;
        if (!validate(password, 'password')) return false;
        if (!validate(role, 'role')) return false;

        setSubmit('');

        return true;
    }

    // clear fields and prepares for new data
    function clearForm()
    {
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('CUSTOMER');
        setBalance('');

        setSubmit('Disabled');
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
        setStatus(``);
    }

    // creates a User Account if passed validate input fields
    async function createAccount_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        log(`[ACCOUNT] Creating new Account - name: ${username} email: ${email} password: ${password} role: ${role}`, logSource, `info`);

        if (!checkCreateFields())
        {
            log(`[ACCOUNT] Create failed - email: ${email} password: ${password}`, logSource, `warn`);

            return;
        }

        log(`[ACCOUNT] Attempting to Create User...`, logSource, `Waiting`);

        try
        {
            // Create Account in Database
            api.create(username, email, password, role, balance)
                .then((account) =>
                {
                    if (!account)
                    {
                        setStatus(log(`[ACCOUNT] Create Account failed, ${email} is already used.`, logSource, `error`));
                        setNeedInput(true);
                    }
                    else
                    {
                        // immediately log them in on create
                        delete account._id;  // the MongoDB ID is not part of our Client 'user'
                        ctx.setLoggedIn(true);
                        ctx.setPrivileged((account.role === "BANKER") || (account.role === "AUDITOR"));
                        ctx.setUser(account);

                        setStatus(log(`[ACCOUNT] Create succeeded - User: ${account.email}`, logSource, `success`));
                        setNeedInput(false);
                    }
                });
        }
        catch (exception)
        {
            setStatus(exp(`[ACCOUNT] Create Account failed - User: ${email}`, logSource, exception));
            setNeedInput(true);
            setSubmit('Disabled');
            setTimeout(() => setStatus(''), TIMEOUT_MSEC);
        }
    }

    // deletes a User Account given proper credentials
    async function deleteAccount_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        log(`[ACCOUNT] Deleting old Account - name: ${username} email: ${email} password: ${password} role: ${role}`, logSource, `info`);

        if (!checkDeleteFields())
        {
            log(`[ACCOUNT] Delete failed - email: ${email} password: ${password}`, logSource, `warn`);

            return;
        }

        log(`[ACCOUNT] Attempting to Delete User...`, logSource, `Waiting`);

        try
        {
            // Delete Account from Database
            api.delete(username, email, password)
                .then((account) =>
                {
                    if (!account)
                    {
                        setStatus(log(`[ACCOUNT] Delete failed, ${email} does not exist.`, logSource, `error`));
                        setNeedInput(true);
                    }
                    else
                    {
                        setStatus(log(`[ACCOUNT] Delete succeeded - User: ${email}`, logSource, `success`));
                        setNeedInput(true);
                        setUsername(``);
                        setEmail(``);
                        setPassword(``);
                        setBalance(0);

                        ctx.setUser({});
                        ctx.setLoggedIn(false);
                    }
                });
        }
        catch (exception)
        {
            setStatus(exp(`[ACCOUNT] Delete Account CRASHED - User: ${email}`, logSource, exception));
            setNeedInput(true);
            setSubmit('Disabled');
            setTimeout(() => setStatus(''), TIMEOUT_MSEC);
        }
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
                        placeholder="Enter name" value={username} onChange={e =>
                        {
                            setSubmit('');
                            setUsername(e.currentTarget.value);
                            validate(e.currentTarget.value, 'name');
                        }} /><br />

                    Email Address<br />
                    <input type="email" autoComplete="new-password" required={true} className="form-control" id="email"
                        placeholder="Enter email" value={email} onChange={e =>
                        {
                            setSubmit('');
                            setEmail(e.currentTarget.value);
                            validate(e.currentTarget.value, 'email');
                        }} /><br />

                    Password<br />
                    <input type="password" autoComplete="new-password" required={true} className="form-control" id="password"
                        placeholder="Enter password" value={password} onChange={e =>
                        {
                            setSubmit('');
                            setPassword(e.currentTarget.value);
                            validate(e.currentTarget.value, 'password');
                        }} /><br />

                    Account Type<br />
                    <input type="role" autoComplete="new-role" required={true} className="form-control" id="role"
                        placeholder="Enter BANKER, CUSTOMER, or AUDITOR" value={role} onChange={e =>
                        {
                            setSubmit('');
                            setRole(e.currentTarget.value);
                            validate(e.currentTarget.value, 'role');
                        }} /><br />

                    Initial Deposit<br />
                    <input type="input" autoComplete="new-password" required={true} className="form-control" id="balance"
                        placeholder="Initial balance ($100 min.)" value={balance} onChange={e =>
                        {
                            setSubmit('');
                            setBalance(e.currentTarget.value);
                            validate(e.currentTarget.value, 'balance');
                        }} /><br />

                    <button type="button" className="btn btn-light" onClick={clearForm_Click}>Clear</button>
                    <> </>
                    <button type="submit" className="btn btn-light" onClick={createAccount_Click} disabled={submit}>Create</button>
                    <> </>
                    <button type="submit" className="btn btn-light" onClick={deleteAccount_Click} disabled={submit}>Delete</button>
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
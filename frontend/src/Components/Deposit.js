// #region  H E A D E R
// <copyright file="deposit.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Bad Bank React Deposit
 *      Module:   Modules (./deposit.js)
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
 *      This module implements the MicroCODE's Bad Bank React Deposit.
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
 *  02-Jun-2022   TJM-MCODE  {0001}    New module implementing the creation Bad Bank Deposits.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React from 'react';
import {AppContext} from './AppContext';
import BankCard from './BankCard';

// include the Back-End API
import {api} from '../api/api.js';

// include our common MicroCODE Client Library
import {log, exp, toCurrency} from '../mcodeClient.js';

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

const MINIMUM_DEPOSIT = 10;

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

/**
 * @func Deposit
 * @desc Bad Bank Deposit Component.
 * @api public
 * @param {nil} no properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      Deposit();
 *
 */
function Deposit()
{
    // validate PROPS input(s) if required

    // initialize STATE and define accessors...
    const [cleared, setCleared] = React.useState(false);
    const [needInput, setNeedInput] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [submit, setSubmit] = React.useState('');

    const [deposit, setDeposit] = React.useState(0);

    // access CONTEXT for reference...
    const ctx = React.useContext(AppContext);

    // #region  P R I V A T E   F U N C T I O N S

    // useEffect to update on unexpected events
    React.useEffect(() =>
    {
        if (ctx.LoggedIn)
        {
            // {TBD}
        }
        else
        {
            setStatus(log(`[DEPOSIT] Must be logged in to make Deposits...`, logSource, `warn`));
            setDeposit(0);
        }

    }, [ctx.LoggedIn]);

    // field validation...
    function validate(field, label)
    {
        if (!field)
        {
            setStatus(`warn: A ${label} is required.`);
            setSubmit('Disabled');
            return false;
        }

        if (label === "deposit")
        {
            if (isNaN(field))
            {
                setStatus(`warn: NaN - Deposit must be a number.`);
                setSubmit('Disabled');
                return false;
            }

            if (field < 0)
            {
                setStatus(`warn: Deposit cannot be negative.`);
                setSubmit('Disabled');
                return false;
            }

            if (field < MINIMUM_DEPOSIT)
            {
                setStatus(`warn: Deposit is less than minimum.`);
                setSubmit('Disabled');
                return false;
            }
        }

        return true;
    }

    function checkFields()
    {
        setSubmit('Disabled');

        if (!validate(deposit, 'deposit')) return false;
        if (parseInt(deposit) < MINIMUM_DEPOSIT) return false;

        setSubmit('');
        setStatus('');

        return true;
    }

    function clearForm()
    {
        setDeposit('');
        setSubmit('Disabled');
        setNeedInput(true);
    };

    // #endregion

    // #region  E V E N T   H A N D L E R S
    /*
     * *_Click() - 'on click' event handlers for UI elements.
     */

    // clears the UI fields for Deposit creation unconditionally
    function clearForm_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        clearForm();
        setNeedInput(true);
    }

    // makes a User Deposit if passed validate input fields
    function makeDeposit_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        log(`[DEPOSIT] Making Account Deposit - name: ${ctx.User.username} deposit: ${deposit}`, logSource, `info`);

        if (!checkFields())
        {
            log(`[DEPOSIT] Deposit Failed check amount - name: ${ctx.User.username} deposit: ${deposit}`, logSource, `warn`);
            return;
        }

        log(`[DEPOSIT] Attempting User Deposit...`, logSource, `Waiting`);

        try
        {
            // Deposit into Account in Database
            api.deposit(ctx.User.email, deposit)
                .then((account) =>
                {
                    if (!account)
                    {
                        setStatus(log(`Account Deposit failed, check account for: ${ctx.User.email}`, logSource, `error`));
                        setSubmit('Disabled');
                        setNeedInput(true);
                    }
                    else
                    {
                        delete account._id;  // the MongoDB ID is not part of our Client 'user'
                        ctx.setUser(account);  // update .balance and .transactions
                        log(`[DEPOSIT] Account Deposit succeeded - Email: ${account.email}`, logSource, `success`);
                        setStatus(``);
                        setSubmit('Disabled');
                        setNeedInput(false);
                    }
                });
        }
        catch (exception)
        {
            setStatus(exp(`[DEPOSIT] Account Deposit CRASHED - User: ${ctx.User.email}`, logSource, exception));
            setSubmit('Disabled');
            setNeedInput(true);
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
            bgcolor="success"
            header="Deposit"
            width="30rem"
            status={status}
            body={needInput ? (
                <form>
                    Current Balance<br />
                    <input type="text" readOnly={true} className="form-control" id="balance"
                        placeholder="Current balance" value={toCurrency(ctx.User.balance)} /><br />

                    Deposit<br />
                    <input type="input" autoComplete="new-password" required={true} className="form-control" id="deposit"
                        placeholder="New deposit ($10 min.)" value={deposit} onChange={e =>
                        {
                            setSubmit('');
                            setStatus('');
                            setDeposit(e.currentTarget.value);
                            validate(e.currentTarget.value, 'deposit');
                        }} /><br />

                    <button type="button" className="btn btn-light" onClick={clearForm_Click}>Clear</button>
                    <> </>
                    <button type="submit" className="btn btn-light" onClick={makeDeposit_Click} disabled={submit}>Deposit</button>
                    <br />
                </form>
            ) : (
                <>
                    <h5>Success</h5>
                    <br />
                    Current Balance<br />
                    <input type="text" readOnly={true} className="form-control" id="balance"
                        placeholder="Current balance" value={toCurrency(ctx.User.balance)} /><br />
                    <button type="submit" className="btn btn-light" onClick={clearForm_Click}>Make another deposit</button>
                </>
            )}
        />
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default Deposit;

// #endregion

// #endregion
// #endregion
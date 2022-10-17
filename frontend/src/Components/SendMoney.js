// #region  H E A D E R
// <copyright file="sendMoney.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Bad Bank React SendMoney
 *      Module:   Modules (./sendMoney.js)
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
 *      This module implements the MicroCODE's Bad Bank React SendMoney.
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
 *  Date:         By-Group:   Rev:    Description:
 *
 *  15-Oct-2022   TJM-MCODE  {0001}   New module implementing the creation Bad Bank SendMoney.
 *  15-Oct-2022   TJM-MCODE  {0002}   Added 'Send Money' feature.
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

// include our common MicroCODE Client Libraryey
import {log, exp, toCurrency} from '../mcodeClient.js';

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

const MINIMUM_SENDMONEY = 10;

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

/**
 * @func SendMoney
 * @memberof app
 * @desc the Bad Bank SendMoney Component.
 * @api public
 * @param {nil} no properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
 * @example
 *
 *      SendMoney();
 *
 */
function SendMoney()
{
    // validate PROPS input(s) if required

    // initialize STATE and define accessors...
    const [cleared, setCleared] = React.useState(false);
    const [needInput, setNeedInput] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [submit, setSubmit] = React.useState('');
    const [receiver, setReceiver] = React.useState('');
    const [sendMoney, setSendMoney] = React.useState(0);

    // access CONTEXT for reference...
    const ctx = React.useContext(AppContext);

    // #region  P R I V A T E   F U N C T I O N S

    // useEffect to update on unexpected events
    React.useEffect(() =>
    {
        if (ctx.LoggedIn)
        {
            // nothing to do here...
        }
        else
        {
            setStatus(log(`[SENDMONEY] Must be logged in to make Send Money...`, logSource, `warn`));
            setSendMoney(0);
        }

    }, [ctx.LoggedIn, ctx.Receiver, ctx.User]);

    // field validation...
    function validate(field, label)
    {
        if (!field)
        {
            setStatus(`warn: A ${label} is required.`);
            setSubmit('Disabled');
            return false;
        }

        if (label === "email")
        {
            const regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

            if (!field.match(regexEmail))
            {
                setStatus(`warn: A valid email is required.`);
                setSubmit('Disabled');
                return false;
            }
        }

        if (label === "sendMoney")
        {
            if (isNaN(field))
            {
                setStatus('warn: NaN - Send Amount must be a number.');
                setSubmit('Disabled');
                return false;
            }

            if (field < 0)
            {
                setStatus(`warn: Send Amount cannot be negative.`);
                setSubmit('Disabled');
                return false;
            }

            if (field < MINIMUM_SENDMONEY)
            {
                setStatus(`warn: Send Amount is less than minimum.`);
                setSubmit('Disabled');
                return false;
            }

            if (field > ctx.User.balance)
            {
                setStatus('error: OVERDRAFT Send Amount is more than your balance.');
            }
        }

        return true;
    }

    function checkFields()
    {
        setSubmit('Disabled');

        if (!validate(receiver, 'email')) return false;
        if (!validate(sendMoney, 'sendMoney')) return false;
        if (parseInt(sendMoney) < MINIMUM_SENDMONEY) return false;

        setSubmit('');
        setStatus('');

        return true;
    }

    function clearForm()
    {
        setReceiver('');
        setSendMoney('');

        setSubmit('Disabled');
        setStatus('');
    };

    // #endregion

    // #region  E V E N T   H A N D L E R S
    /*
     * *_Click() - 'on click' event handlers for UI elements.
     */

    // clears the UI fields for SendMoney creation unconditionally
    function clearForm_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        clearForm();
        setNeedInput(true);
    }

    // makes a User SendMoney if passed validate input fields
    function makeSendMoney_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        log(`[SENDMONEY] Attempting to SendMoney - name: ${ctx.User.username} sendMoney: ${sendMoney}`, logSource, `wait`);

        if (!checkFields())
        {
            log(`[SENDMONEY] SendMoney failed validation - name: ${ctx.User.username} sendMoney: ${sendMoney}`, logSource, `warn`);
            return;
        }

        try
        {
            // SendMoney into Account in Database
            api.sendMoney(ctx.User.email, sendMoney, receiver)
                .then((senderAccount) =>
                {
                    if (!senderAccount)
                    {
                        setStatus(log(`Account SendMoney failed, check for an account with: ${ctx.User.email}`, logSource, `error`));
                        setSubmit('Disabled');
                        setNeedInput(true);
                    }
                    else
                    {
                        delete senderAccount._id;  // the MongoDB ID is not part of our Client 'user'
                        ctx.setUser(senderAccount);  // update for .balance and .transactions

                        log(`[SENDMONEY] Account SendMoney succeeded - sent to Email: ${receiver}`, logSource, `success`);

                        // Get Reciever's Balance from Database (Baaaad Bank)
                        api.balance(receiver)
                            .then((receiverAccount) =>
                            {
                                if (!receiverAccount)
                                {
                                    setStatus(log(`[SENDMONEY] failed, check for an account with: ${receiver}`, logSource, `error`));
                                }
                                else
                                {
                                    delete receiverAccount._id;  // the MongoDB ID is not part of our Client 'user'
                                    ctx.setReceiver(receiverAccount);  // update for .balance and .transactions
                                    log(`[SENDMONEY] Receiver Account: ${JSON.stringify(receiverAccount)}`, logSource, `warn`);
                                    log(`[SENDMONEY] Account Transfer succeeded - Email: ${receiverAccount.email}`, logSource, `success`);
                                }
                            });

                        setStatus(``);
                        setSubmit('Disabled');
                        setNeedInput(false);
                    }
                });
        }
        catch (exception)
        {
            setStatus(exp(`[SENDMONEY] Account SendMoney CRASHED - User: ${ctx.User.email}`, logSource, exception));
            setNeedInput(true);
            setSubmit('Disabled');
        }

        if ((ctx.User.balance - sendMoney) < 0)
        {
            window.alert("You have OVERDRAWN your Account, you were charged an additional $35 fee.");
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
            header="SendMoney"
            width="30rem"
            status={status}
            body={needInput ? (
                <form>
                    Current Balance<br />
                    <input type="text" readOnly={true} className="form-control" id="balance"
                        placeholder="Current balance" value={toCurrency(ctx.User.balance)} /><br />

                    SendMoney<br />
                    <input type="input" autoComplete="new-password" required={true} className="form-control" id="sendMoney"
                        placeholder="New Send Amount ($10 min.)" value={sendMoney} onChange={e =>
                        {
                            setSubmit('');
                            setStatus('');
                            setSendMoney(e.currentTarget.value);
                            validate(e.currentTarget.value, 'sendMoney');
                        }} /><br />

                    Receiver's Email Address<br />
                    <input type="email" autoComplete="new-email" required={true} className="form-control" id="email"
                        placeholder="Enter email to get the money" value={receiver} onChange={e =>
                        {
                            setSubmit('');
                            setStatus('');
                            setReceiver(e.currentTarget.value);
                            validate(e.currentTarget.value, 'email');
                        }} /><br />

                    <button type="button" className="btn btn-light" onClick={clearForm_Click}>Clear</button>
                    <> </>
                    <button type="submit" className="btn btn-light" onClick={makeSendMoney_Click} disabled={submit}>SendMoney</button>
                    <br />
                </form>
            ) : (
                <>
                    <h5>Success</h5>
                    <br />
                    Your Current Balance<br />
                    <input type="text" readOnly={true} className="form-control" id="balance"
                        placeholder="Your balance" value={toCurrency(ctx.User.balance)} />
                    <br />
                    Your Friend's Balance<br />
                    <input type="text" readOnly={true} className="form-control" id="balance"
                        placeholder="Their balance" value={toCurrency(ctx.Receiver.balance)} />
                    <br />
                    <button type="submit" className="btn btn-light" onClick={clearForm_Click}>Make another Transfer</button>
                </>
            )}
        />
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default SendMoney;

// #endregion

// #endregion
// #endregion
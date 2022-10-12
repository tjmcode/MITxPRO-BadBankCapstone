// #region  H E A D E R
// <copyright file="balance.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Bad Bank React Balance
 *      Module:   Modules (./balance.js)
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
 *      This module implements the MicroCODE's Bad Bank React Balance.
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
 *  02-Jun-2022   TJM-MCODE  {0001}    New module implementing the creation Bad Bank Balances.
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
import {log} from '../mcodeClient.js';

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
 * Balance() – the Bad Bank Balance Component.
 *
 * @api public
 *
 * @param {nil} no properties.
 *
 * @returns JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      Balance();
 *
 */
function Balance()
{
    // validate PROPS input(s) if required

    // initialize STATE and define accessors...
    const [balance, setBalance] = React.useState(0);

    // access CONTEXT for reference...
    const ctx = React.useContext(AppContext);

    // #region  P R I V A T E   F U N C T I O N S

    // useEffect with an empty dependency array
    React.useEffect(() =>
    {
        if (ctx.LoggedIn)
        {
            (async () =>
            {
                log(`Getting Account Balance from DB...`, logSource, "Information");
                let response = await api.balance(ctx.Users[ctx.UserIndex].email);
                setBalance(response.data);

            })();

        }
        else
        {
            log(`Must be logged in to get Balance..`, logSource, "Warning");
            setBalance(0);
        }

    }, [ctx.LoggedIn, ctx.UserIndex, ctx.Users]);

    // #endregion

    // #region  E V E N T   H A N D L E R S
    /*
     * *_Click() - 'on click' event handlers for UI elements.
     */

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <BankCard
            bgcolor="info"
            header="Balance"
            width="30rem"
            body={(
                <form>
                    Current Balance<br />
                    <input type="text" readOnly={true} className="form-control" id="balance"
                        placeholder="Current balance" value={balance} /><br />
                    <br />
                </form>
            )}
        />
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default Balance;

// #endregion

// #endregion
// #endregion
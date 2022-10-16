// #region  H E A D E R
// <copyright file="card.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Card component for Bad Bank React App
 *      Module:   Modules (./context.js)
 *      Project:  MicroCODE Common Code
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
 *      This module implements the MicroCODE's Common React Component Template.
 *      This file is copied to start all MicroCODE React Component files.
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
 *  02-Jun-2022   TJM-MCODE  {0001}    New module for common reusable React Components.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React from 'react';

// include our common MicroCODE Client Library
import {exp} from '../mcodeClient.js';

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
 * @func BankCard
 * @memberof app
 * @desc a common App 'Card' definitions for all derived Components.
 * @api public
 * @param {type} props component properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      Card(props);
 *
 */
function BankCard(props)
{
    // validate PROPS input(s)

    // initialize STATE and define accessors...
    const [cardClass, setCardClass] = React.useState('');
    const [statusState, setStatusState] = React.useState('');
    const [statusCard, setStatusCard] = React.useState('');
    const [statusBody, setStatusBody] = React.useState('');
    const [statusHeader, setStatusHeader] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('');

    // access CONTEXT for reference...

    // #region  P R I V A T E   F U N C T I O N S

    // get the Account Balance once from Database on load
    React.useEffect(() =>
    {
        // Loads styles and data for Bank Card display.
        function loadStatus()
        {
            // check for optional 'Status' displayed under 'Card'
            if (props.status)
            {
                // set 'Status' styling based on message prefix (see definitions in mcode.log() and mcode.exp())
                if (props.status.includes(`info: `))
                {
                    setStatusHeader(`INFORMAION`);
                    setStatusCard(`card mb-3 border-primary`);
                    setStatusBody(`card-body text-primary`);
                    setStatusMessage(props.status.replace(`info: `, ``));
                }
                else if (props.status.includes(`warn: `))
                {
                    setStatusHeader(`WARNING`);
                    setStatusCard(`card mb-3 border-warning`);
                    setStatusBody(`card-body text-warning`);
                    setStatusMessage(props.status.replace(`warn: `, ``));
                }
                else if (props.status.includes(`error: `))
                {
                    setStatusHeader(`ERROR`);
                    setStatusCard(`card mb-3 border-danger`);
                    setStatusBody(`card-body text-danger`);
                    setStatusMessage(props.status.replace(`error: `, ``));
                }
                else if (props.status.includes(`fatal: `))
                {
                    setStatusHeader(`EXCEPTION`);
                    setStatusCard(`card mb-3 bg-danger text-white`);  // solid red
                    setStatusBody(`card-body text-white`);
                    setStatusMessage(props.status.replace(`fatal: `, ``));
                }
                else if (props.status.includes(`success: `))
                {
                    setStatusHeader(`SUCCESS`);
                    setStatusCard(`card mb-3 border-success`);
                    setStatusBody(`card-body text-success`);
                    setStatusMessage(props.status.replace(`success: `, ``));
                }
            }
            else
            {
                // no 'Status' to dsplay right now
                setStatusCard(``);
                setStatusBody(``);
                setStatusMessage(``);
            }

            // and finally the Bank Card itself
            let cardback = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
            let cardtext = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
            setCardClass('card mb-3 ' + cardback + cardtext);

            return props.status;
        }

        // if the status passed in from the UI Component changes update our Bank Card Styling
        if (props.state !== statusState)
        {
            (async () =>
            {
                try
                {
                    // load Bank Card and Status styling once on Props change
                    setStatusState(loadStatus());

                }
                catch (exception)
                {
                    exp(`[BANKCARD] CRASHED - props: ${JSON.stringify(props)}`, logSource, exception);
                }

            })();
        }

    }, [props, statusState]);

    // #endregion

    // #region  E V E N T   H A N D L E R S

    // #endregion

    // perform component COMPUTATION to generate output

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <>
            <div className={cardClass} style={{maxWidth: props.width}}>
                <div className="card-header"><b><h4>{props.header}</h4></b></div>
                <div className="card-body">
                    {props.title && (<h5 className="card-title">{props.title}</h5>)}
                    {props.text && (<p className="card-text">{props.text}</p>)}
                    {props.body}
                </div>
            </div>
            {props.status && (
                <div className={statusCard} style={{maxWidth: props.width}}>
                    <div className="card-header">{statusHeader}</div>
                    <div className={statusBody}>
                        <div id='status'>{statusMessage}</div>
                    </div>
                </div>)}
        </>
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default BankCard;

// #endregion

// #endregion
// #endregion
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

// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

// #endregion

// #region  P R I V A T E   F I E L D S

let statusDisplayed = ``;

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

/**
 * @func BankCard
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

    // access CONTEXT for reference...

    // #region  P R I V A T E   F U N C T I O N S

    /*
     * bootstrapCard() - builds a Bootstrap Card Class name from passed properties.
     */
    function bootstrapCard()
    {
        const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
        return 'card mb-3 ' + bg + txt;
    }

    /*
     * bootstrapSuccess() - builds a Bootstrap Card Class name from info display.
     */
    function bootstrapInfo()
    {
        statusDisplayed = props.status.replace(`info: `, ``);
        const bg = ' border-primary';
        const txt = '';  // the 'border-' cards pick text color
        return 'card mb-3 ' + bg + txt;
    }

    /*
     * bootstrapWarn() - builds a Bootstrap Card Class name from warning display.
     */
    function bootstrapWarn()
    {
        statusDisplayed = props.status.replace(`warn: `, ``);
        const bg = ' border-warning';
        const txt = '';  // the 'border-' cards pick text color
        return 'card mb-3 ' + bg + txt;
    }

    /*
     * bootstrapDanger() - builds a Bootstrap Card Class name from error display.
     */
    function bootstrapError()
    {
        statusDisplayed = props.status.replace(`error: `, ``);
        const bg = ' border-danger';
        const txt = '';  // the 'border-' cards pick text color
        return 'card mb-3 ' + bg + txt;
    }

    /*
     * bootstrapSuccess() - builds a Bootstrap Card Class name from exception display.
     */
    function bootstrapFatal()
    {
        statusDisplayed = props.status.replace(`fatal: `, ``);
        const bg = ' bg-danger';
        const txt = ' text-white';
        return 'card mb-3 ' + bg + txt;
    }

    /*
     * bootstrapSuccess() - builds a Bootstrap Card Class name from success display.
     */
    function bootstrapSuccess()
    {
        statusDisplayed = props.status.replace(`success: `, ``);
        const bg = ' border-success';
        const txt = '';  // the 'border-' cards pick text color
        return 'card mb-3 ' + bg + txt;
    }

    // #endregion

    // #region  E V E N T   H A N D L E R S
    /*
     * *_Click() - 'on click' event handlers for UI elements.
     */

    // #endregion

    // perform component COMPUTATION to generate output

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <>
            <div className={bootstrapCard()} style={{maxWidth: props.width}}>
                <div className="card-header"><b><h4>{props.header}</h4></b></div>
                <div className="card-body">
                    {props.title && (<h5 className="card-title">{props.title}</h5>)}
                    {props.text && (<p className="card-text">{props.text}</p>)}
                    {props.body}
                </div>
            </div>
            {props.status && props.status.includes("info") && (
                <div className={bootstrapInfo()} style={{maxWidth: props.width}}>
                    <div className="card-header"><b>Infirmation</b></div>
                    <div className="card-body text-primary">
                        <div id='status'>{statusDisplayed}</div>
                    </div>
                </div>)}
            {props.status && props.status.includes("warn") && (
                <div className={bootstrapWarn()} style={{maxWidth: props.width}}>
                    <div className="card-header"><b>Warning</b></div>
                    <div className="card-body text-warning">
                        <div id='status'>{statusDisplayed}</div>
                    </div>
                </div>)}
            {props.status && props.status.includes("error") && (
                <div className={bootstrapError()} style={{maxWidth: props.width}}>
                    <div className="card-header"><b>Error</b></div>
                    <div className="card-body text-danger">
                        <div id='status'>{statusDisplayed}</div>
                    </div>
                </div>)}
            {props.status && props.status.includes("fatal") && (
                <div className={bootstrapFatal()} style={{maxWidth: props.width}}>
                    <div className="card-header"><b>Exception</b></div>
                    <div className="card-body text-white">
                        <div id='status'>{statusDisplayed}</div>
                    </div>
                </div>)}
            {props.status && props.status.includes("success") && (
                <div className={bootstrapSuccess()} style={{maxWidth: props.width}}>
                    <div className="card-header"><b>Confirmation</b></div>
                    <div className="card-body text-success">
                        <div id='status'>{statusDisplayed}</div>
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
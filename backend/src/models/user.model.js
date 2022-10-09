// #region  H E A D E R
// <copyright file="user.model.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Common User Model
 *      Module:   Modules (./user.model.js)
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
 *      This module implements the MicroCODE's Common User Model.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO MERN Examples
 *         https://student.emeritus.org/courses/3291/files/2554233/download?wrap=1
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
 *  03-Oct-2022   TJM-MCODE  {0001}    New module for common reusable MERN Template 'AppName'.
 *
 *
 */
"use strict";

const mongoose = require('mongoose');

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

// #region  C O N S T A N T S

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
    });

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

// #endregion

// #region  M E T H O D - E X P O R T S

const User = mongoose.model('User', userSchema);

module.exports = User;

// #endregion

// #endregion
// #endregion
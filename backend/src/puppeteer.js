// #region  H E A D E R
// <copyright file="puppeteer.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Common Puppeteer Module
 *      Module:   Modules (./puppeteer.js)
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
 *      This module implements the MicroCODE's Common JavaScript Template.
 *      This file is copied to start all MicroCODE JavaScript code files.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO WEEK n: App Testing with Puppeteer
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

// #endregion
// #endregion
// #endregion

const puppeteer = require('puppeteer');

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// #region  M E T H O D S – P U B L I C

(async () =>
{
    try
    {
        // create a browser with Puppeteer
        const browser = await puppeteer.launch();

        // open a page to use for site navigation
        const page = await browser.newPage();

        // path to Frontend at build-time...
        // localhost:8080
        // https://appname.tjmcode.io:8080
        const appPort = parseInt(`${process.env.APP_FRONTEND_PORT}`);
        const appUrl = `https://${process.env.APP_SUBDOMAIN}:${appPort}`;

        /*
         * Test common browser widths...
         */

        // 1920 View
        await page.setViewport({width: 1920, height: 1080});
        await page.goto(`${appUrl}/#/AppPage/`);
        await page.screenshot({path: './puppeteer_results/AppPage1920.png'});

        // 1280 View
        await page.setViewport({width: 1280, height: 800});
        await page.goto(`${appUrl}/#/AppPage/`);
        await page.screenshot({path: './puppeteer_results/AppPage1280.png'});

        // 962 View
        await page.setViewport({width: 962, height: 601});
        await page.goto(`${appUrl}/#/AppPage/`);
        await page.screenshot({path: './puppeteer_results/AppPage0962.png'});

        // 800 View
        await page.setViewport({width: 800, height: 1280});
        await page.goto(`${appUrl}/#/AppPage/`);
        await page.screenshot({path: './puppeteer_results/AppPage0800.png'});

        // 768 View
        await page.setViewport({width: 768, height: 1024});
        await page.goto(`${appUrl}/#/AppPage/`);
        await page.screenshot({path: './puppeteer_results/AppPage0768.png'});

        // 601 View
        await page.setViewport({width: 601, height: 962});
        await page.goto(`${appUrl}/#/AppPage/`);
        await page.screenshot({path: './puppeteer_results/AppPage0601.png'});

        await browser.close();
    }
    catch (e)
    {
        console.log(e);
    }

})();

// #endregion
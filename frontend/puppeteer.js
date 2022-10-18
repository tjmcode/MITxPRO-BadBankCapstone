// include our common MicroCODE Client Library
import {log} from './src/mcodeClient.js';

const puppeteer = require('puppeteer');

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

const testLoginPage = async () =>
{
    try
    {
        log(`Puppeteer is running...`, logSource, `info`);

        // Step 1 - Launch Puppeteer and assign response to the browser variable
        let browser = await puppeteer.launch();

        // Step 2 - Using the browser variable, create a new page and assign the response to the page variable
        let page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080});

        // Step 3 - Using the page variable goto the correct URL that the React app is running on
        await page.goto(`http://localhost:1/#/login/`);

        // Step 4 - Using the page variable, use the click method by passing the ".create-user" class name
        //await page.click(`.create-user`);
        //let status = await page.$(`.user-name`);
        //log(await status.evaluate(node => node.innerHTML), logSource, `info`);

        // Step 5 - Using the page variable, use the screenshot method to generate a screenshot of the React app with the newly created user
        await page.screenshot({path: `screen.png`});

        // shutdown
        browser.close();

    }
    catch (e)
    {
        log(e, logSource, `error`);
    }
};

module.exports = testLoginPage;

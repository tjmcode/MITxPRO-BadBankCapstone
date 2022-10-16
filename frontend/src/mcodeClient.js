// #region  H E A D E R
// <copyright file="mcodeClient.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Common Client Function Library
 *      Module:   modules (MicroCODE:mcodeClient.js)
 *      Project:  MicroCODE 3-Tier MERN Template `AppName`
 *      Customer: Internal+MIT xPRO Course
 *      Creator:  MicroCODE Incorporated
 *      Date:     January 2022
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
 *      This module implements the MicroCODE`s Common JavaScript Client/Front-End functions.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Course: Professional Certificate in Coding: Full Stack Development with MERN
 *
 *
 *      2. CHALK for colorizing Console message easily and explicitly.
 *         https://www.npmjs.com/package/chalk
 *
 *
 *      VIDEOS:
 *      -------
 *
 *      1.  List of ANSI Color Escape Sequences
 *          https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences
 *
 *      2.  Showing Line Numbers in console.log from Node.js
 *          https://stackoverflow.com/questions/45395369/how-to-get-console-log-line-numbers-shown-in-nodejs
 *
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  27-Jan-2022   TJM-MCODE  {0001}    New module for common reusable Javascript UI/Client functions.
 *  05-Mar-2022   TJM-MCODE  {0002}    Documentation updates.
 *  04-May-0222   TJM-MCODE  {0003}    Corrected `month` in timeStamp.
 *  03-Oct-2022   TJM-MCODE  {0004}    Added `log()` to simplify console logging of app events.
 *  03-Oct-2022   TJM-MCODE  {0005}    Added use of `vt` for colorizing Console Log entries.
 *  16-Oct-2022   TJM-MCODE  {0006}    Added 'success' as a severity.
 *
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

// #region  C O N S T A N T S

/**
 * @const vt
 * @memberof mcodeClient
 * @desc Colors constants for changing Console appearance ala DEC`s VT52 + VT100 + VT220.
 * @example
    ANSI Color Escape Sequence

    \x1b[***m  -- where `***` is a series of command codes separated by semi-colons (;).

    Code	Effect -- notes
    ------------------------------------------------------------------------------
    0	    Reset / Normal -- all attributes off
    1	    Bold -- increased intensity
    2	    Faint -- decreased intensity - not widely supported
    3	    Italic -- not widely supported, sometimes treated as inverse
    4	    Underline
    5	    Slow Blink -- less than 150 per minute
    6	    Rapid Blink -- MS-DOS ANSI.SYS; 150+ per minute; not widely supported
    7	    Reverse video -- swap foreground and background colors
    8	    Conceal -- not widely supported.
    9	    Crossed-out -- characters legible, but marked for deletion. Not widely supported
    10	    Primary font (default)
    11–19	Alternate font -- select alternate font n-10
    20	    Fraktur -- hardly ever supported
    21	    Bold off or Double Underline -- bold off not widely supported; double underline hardly ever supported
    22	    Normal color or intensity -- neither bold nor faint
    23	    Not italic, not Fraktur
    24	    Underline roundOff -- not singly or doubly underlined
    25	    Blink off
    27	    Inverse off
    28	    Reveal	conceal off
    29	    Not crossed out
    30–37	Set foreground color -- see color table below
    38	    Set foreground color -- next arguments are 5;<n> or 2;<r>;<g>;<b>, see below
    39	    Default foreground color -- implementation defined (according to standard)
    40–47   Set background color -- see color table below
    48	    Set background color -- next arguments are 5;<n> or 2;<r>;<g>;<b>, see below
    49	    Default background color -- implementation defined (according to standard)
    51	    Framed
    52	    Encircled
    53	    Overlined
    54	    Not framed or encircled
    55	    Not overlined
    60	    ideogram underline -- hardly ever supported
    61	    ideogram double underline -- hardly ever supported
    62	    ideogram overline -- hardly ever supported
    63	    ideogram double overline -- hardly ever supported
    64	    ideogram stress marking	hardly ever supported
    65	    ideogram attributes off	reset the effects of all of 60-64
    90–97	Set bright foreground color	aixterm (not in standard)
    100–107	Set bright background color	aixterm (not in standard)
 *
 */
var vt =
{
    // special effects
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    // foreground color
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m"
    },

    // background color
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    },

    // Extended 256-Color codes
    gray: "\x1b[38;5;255m",  // `Set Foreground Color` -- 5; means 256 Color Code follows

    // custom event colors
    errr: "\x1b[31m",  // red
    good: "\x1b[32m",  // green
    warn: "\x1b[33m",  // yellow
    cold: "\x1b[34m",  // blue
    dead: "\x1b[35m",  // magenta
    info: "\x1b[36m",  // cyan
    hmmm: "\x1b[37m",  // white
    uggh: "\x1b[38m",  // crimson
};

// #endregion

// #region  F U N C T I O N S – P U B L I C

/**
 * @func log
 * @memberof mcodeClient
 * @desc Logs App Events to the Console in a standardized format.
 * @api public
 * @param {string} message pre-formatted message to be logged.
 * @param {string} source where the message orginated.
 * @param {string} severity Event.Severity: 'info', 'warn', 'error', 'fatal', and 'success'.
 * @returns {string} "{severiy}: {message}" for display in UI.
 *
 * @example
 * From our other MicroCODE Apps:
 ++
   Message: `Station SYNCHRONIZED to new Job from TRACKING IMAGE`

       Class: JobIdZone                                  Audience: Operator
      Object: 8                                         Condition: Takt=[0%]  Memory in use=[1,659,216.00]
       Event: 14                                         Severity: Confirmation
     Targets: AppLog, AppBanner, AppDatabase, AppSound

       Event: (see `Message:` above)                      Time: Tuesday, August 10, 2021 06:57:47.623 AM
       Class: MicroCODE.AppBanner                         Type: App.Information                              CSN:[1GA4174210 ]
--
 */
function log(message, source, severity)
{
    let logifiedMessage = ``;

    if (hasJson(message))
    {
        logifiedMessage = logifyText(message);
    }
    else
    {
        logifiedMessage = message;
    }

    console.log(vt.reset + vt.gray + `++`);

    switch (severity)
    {
        case `info`:
            console.log(vt.info + `ℹ ｢mcode｣:'${logifiedMessage}'`);
            break;
        case `warn`:
            console.log(vt.warn + `⚠ ｢mcode｣:'${logifiedMessage}'`);
            break;
        case `error`:
            console.log(vt.errr + `✖ ｢mcode｣:'${logifiedMessage}'`);
            break;
        case `fatal`:
            console.log(vt.dead + `✖ ｢mcode｣:'${logifiedMessage}'`);
            break;
        case `success`:
            console.log(vt.good + `✓ ｢mcode｣:'${logifiedMessage}'`);
            break;
        default:
            console.log(vt.hmmm + `❔ ｢mcode｣:'${logifiedMessage}'`);
            break;
    }
    console.log(
        vt.gray + `     ` + vt.reset +
        vt.gray + `time: ` + vt.reset + `${timeStamp()}    ` +
        vt.gray + `from: ` + vt.reset + `frontend ${source}    ` +
        vt.gray + `severity: ` + vt.reset + `${severity}`);

    console.log(vt.gray + `--` + vt.reset);

    return `${severity}: ` + message;  // for caller to return
};

/**
 * @func exp
 * @memberof mcodeClient
 * @desc Exceptions to the Console in a standardized format.
 * @api public
 * @param {string} message pre-formatted message to be logged.
 * @param {string} source where the message orginated.
 * @param {string} exception the underlying exception message that was caught.
 * @returns {string} "message: {message} - exception: {exception}" for display in UI.
 *
 */
function exp(message, source, exception)
{
    let logifiedMessage = ``;

    if (hasJson(message))
    {
        logifiedMessage = logifyText(message);
    }
    else
    {
        logifiedMessage = message;
    }

    // Exceptions are always logged as 'Fatal'
    console.group(`exception`);
    console.log(vt.reset + vt.gray + `++`);
    console.log(vt.dead + `✖ ｢mcode｣:'${logifiedMessage}'`);
    console.log(vt.dead + `exception: ` + vt.dead + `${exception}`);
    console.log(
        vt.gray + `     ` + vt.reset +
        vt.gray + `time: ` + vt.reset + `${timeStamp()}    ` +
        vt.gray + `from: ` + vt.reset + `backend ${source}    ` +
        vt.gray + `severity: ` + vt.reset + `fatal`);
    console.log(vt.dead);
    console.groupCollapsed(`trace`);
    console.trace();
    console.groupEnd();
    console.log(vt.gray + `--`);
    console.groupEnd();

    return `message: ` + message + ` - exception: ` + exception;  // for caller to return
};

/**
 * @func timestamp
 * @memberof mcodeClient
 * @desc Generates timestamp string: YYYY-MM-DD HH:MM:SS.mmm.
 * @api public
 * @returns {string} "YYYY-MM-DD HH:MM:SS.mmm".
 */
function timeStamp()
{
    let now = new Date();
    let month = Number(now.getMonth()) + 1;  // {0003}
    return (
        now.getFullYear() +
        "-" +
        month +
        "-" +
        now.getDate() +
        " " +
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds() +
        "." +
        now.getMilliseconds() +
        " UTC"
    );
};

/**
 * @func simplifyText
 * @memberof mcodeClient
 * @desc Strips a string of BRACES, BRACKETS, QUOTES, etc.
 * @api public
 * @param {string} textToSimplify the string to be simplified to data
 * @returns {string} the simplified text
 */
function simplifyText(textToSimplify)
{
    let simplifiedText = "";

    for (let i = 0; i < textToSimplify.length; i++)
    {
        switch (textToSimplify[i])
        {
            case '{':
            case '}':
            case '[':
            case ']':
            case '"':
                break;
            case ':':
                simplifiedText += textToSimplify[i];
                simplifiedText += ' ';
                break;
            case ',':
                simplifiedText += textToSimplify[i];
                simplifiedText += ' ';
                break;
            default:
                simplifiedText += textToSimplify[i];
                break;
        }
    }

    return simplifiedText;
};

/**
 * @func logifyText
 * @memberof mcodeClient
 * @desc Formats a string of BRACES, BRACKETS, QUOTES, for display in the EVENT LOG.
 * No formatting occurs until the opening brace '{' of the JSON Data.
 * @api public
 * @param {string} textToLogify the string to be formatted for the event log
 * @returns {string} the logified text
 */
function logifyText(textToLogify)
{
    let inJson = false;
    let logifiedText = ``;
    let firstColon = true;
    let tabStop = 0;
    let lineEmpty = false;  // to start of a new line

    let indent = () =>
    {
        let newline = ``;
        if (!lineEmpty)
        {
            newline += `\r\n`;

            for (let index = 0; index < tabStop; index++)
            {
                newline += `    `;  // 4-space tab-stop
            }
            lineEmpty = true;  // and at proper tab-stop
        }
        return newline;
    };

    for (let i = 0; i < textToLogify.length; i++)
    {
        if (!inJson)
        {
            if (textToLogify[i] === `{`)
            {
                inJson = true; --i;  // flag and reprocess
            }
            else
            {
                logifiedText += textToLogify[i];
            }
        }
        else
        {
            switch (textToLogify[i])
            {
                case `{`:
                    logifiedText += indent() + `{`;
                    lineEmpty = false;
                    tabStop++;
                    logifiedText += indent();
                    break;
                case `[`:
                    logifiedText += indent() + `[`;
                    lineEmpty = false;
                    tabStop++;
                    logifiedText += indent();
                    break;
                case `}`:
                    tabStop--;
                    inJson = (tabStop <= 0) ? false : true;  // closed opening '{'
                    logifiedText += indent() + `}`;
                    firstColon = true;
                    lineEmpty = false;
                    break;
                case `]`:
                    tabStop--;
                    logifiedText += indent() + `]`;
                    firstColon = true;
                    lineEmpty = false;
                    break;
                case `,`:
                    logifiedText += indent();
                    firstColon = true;
                    lineEmpty = true;
                    break;
                case `"`:
                    break;
                case `:`:
                    if (firstColon)
                    {
                        logifiedText += textToLogify[i];
                        logifiedText += ` `;
                        firstColon = false;
                    }
                    else
                    {
                        logifiedText += textToLogify[i];
                    }
                    break;
                case ` `:
                    logifiedText += textToLogify[i];
                    break;
                case `\t`:
                    logifiedText += textToLogify[i];
                    break;
                default:
                    lineEmpty = false;
                    logifiedText += textToLogify[i];
                    break;
            }
        }
    }

    return logifiedText;
};

/**
 * @func listifyArrayHTML
 * @memberof mcodeClient
 * @desc Converts an array of text items into a BOOTSTRAP CARD LIST.
 * @api public
 * @param {array} arrayToListify the array to be convert to a HTML List.
 * @returns {string} the HTML List code.
 */
function listifyArrayHTML(arrayToListify)
{
    let listifiedText = "";
    var keyIndex = 0;

    arrayToListify.forEach(element =>
    {
        // convert array element to text, simplify for display, and add to LIST...
        listifiedText += `<li class="list-group-item" key="${keyIndex++}">` + simplifyText(JSON.stringify(element)) + `</li>`;
    });

    return listifiedText;
};

/**
 * @func listifyArrayJSX
 * @memberof mcodeClient
 * @desc Converts an array of text items into a BOOTSTRAP CARD LIST - JSX code.
 * @api public
 * @param {array} arrayToListify the array to be convert to a HTML List.
 * @returns {string} the HTML List code.
 */
function listifyArrayJSX(arrayToListify)
{
    let listifiedText = "";
    var keyIndex = 0;

    listifiedText += `<ul className="list-group">`;

    arrayToListify.forEach(element =>
    {
        // convert array element to text, simplify for display, and add to LIST...
        listifiedText += `<li className="list-group-item" key="${keyIndex++}">` + simplifyText(JSON.stringify(element)) + `</li>`;
    });

    listifiedText += `</ul>`;

    return listifiedText;
};

/**
 * @func isString
 * @memberof mcodeClient
 * @desc Checks the type of an Object for String.
 * @api public
 * @param {object} object to be tested
 * @returns {boolean} a value indicating whether or not the object is a string
 */
function isString(object)
{
    return Object.prototype.toString.call(object) === '[object String]';
}

/**
 * @func hasJson
 * @memberof mcodeClient
 * @desc Checks a string for embedded JSON data.
 * @api public
 * @param {object} object string to be tested
 * @returns {boolean} a value indicating whether or not the object contains a JSON string
 */
function hasJson(object)
{
    try
    {
        if (typeof object != 'string') return false;
        if (object.includes(`{`)) return true;  // treat as JSON -- JSON.parse() is overkill here
        return false; // *not* JSON
    }
    catch
    {
        return false;  // *not* JSON and not parsable
    }
};

/**
 * @func NotaNumber
 * @memberof mcodeClient
 * @desc Checks for NaN.
 * @api public
 * @param {any} numberToCheck as a number of some type
 * @returns {boolean} a value indicating whether or not it is NaN.
 */
function NotaNumber(numberToCheck)
{
    // NOTE: this compare will fail for NaN
    // eslint-disable-next-line no-self-compare
    return (numberToCheck !== numberToCheck);
};

/**
 * @func roundToCents
 * @memberof mcodeClient
 * @desc Rounds a floating point number that represents dollars and cents to 2 decimals digits (pennies).
 * @api public
 * @param {number} numberToRound as a floating point value
 * @returns {number} number rounded to dollars and cents (2 decimals place)
 */
function roundToCents(numberToRound)
{
    return roundOff(numberToRound, 2);
};

/**
 * @func roundOff
 * @memberof mcodeClient
 * @desc Rounds a floating point number to any number of places.
 * @api public
 * @param {number} numberToRound as a floating point value
 * @param {number} numberOfPlaces number of decimal places to round
 * @returns {number} number rounded to dollars and cents (2 decimals place)
 */
function roundOff(numberToRound, numberOfPlaces)
{
    // if NaN reset to ZERO
    if (NotaNumber(numberToRound))
    {
        return 0.00;
    }
    else
    {
        const roundingFactor = Math.pow(10, numberOfPlaces);
        return Math.round(numberToRound * roundingFactor) / roundingFactor;
    }
};

/**
 * @func toCurrency
 * @memberof mcodeClient
 * @desc Rounds a floating point number to any number of places.
 * @api public
 * @param {number} numberToDisplay as a floating point value
 * @returns {string} number rounded to dollars and cents (2 decimals place)
 */
function toCurrency(numberToDisplay)
{
    // if NaN reset to ZERO
    if (NotaNumber(numberToDisplay))
    {
        return `$0.00`;
    }
    else
    {
        return `$${roundToCents(numberToDisplay)}`;
    }
};

// #endregion

// #region  F U N C T I O N - E X P O R T S

export {log, exp, timeStamp, simplifyText, listifyArrayHTML, listifyArrayJSX, isString, hasJson, toCurrency};

// #endregion

// #endregion
// #endregion
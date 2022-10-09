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
 *
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

// #region  F U N C T I O N S – P U B L I C

/**
 * log() -- function to log App Events to the Console in a standardized format.
 *
 * Example from our other Apps:
 ++
   Message: `Station SYNCHRONIZED to new Job from TRACKING IMAGE`

       Class: JobIdZone                                  Audience: Operator
      Object: 8                                         Condition: Takt=[0%]  Memory in use=[1,659,216.00]
       Event: 14                                         Severity: Confirmation
     Targets: AppLog, AppBanner, AppDatabase, AppSound

       Event: (see `Message:` above)                      Time: Tuesday, August 10, 2021 06:57:47.623 AM
       Class: MicroCODE.AppBanner                         Type: App.Information                              CSN:[1GA4174210 ]
--
 *
 * @param {string} message pre-formatted message to be logged.
 * @param {string} source where the message orginated.
 * @param {string} severity Event.Severity: Information, Warning, Error, Fatal.
 * @api public
 *
 *
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
 *
 */
function log(message, source, severity)
{
    // Colors constants for changing Console appearance ala DEC`s VT52 + VT100 + VT220.
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

        // text color, Note: fg. foreground is the default target
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m",

        // Extended 256-Color codes
        gray: "\x1b[38;5;255m",  // `Set Foreground Color` -- 5; means 256 Color Code follows

        // custom event colors
        info: "\x1b[36m",  // cyan
        warn: "\x1b[33m",  // yellow
        errr: "\x1b[31m",  // red
        dead: "\x1b[35m",  // magenta
        hmmm: "\x1b[37m",  // white

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
        }
    };

    console.log(vt.reset + `++`);

    switch (severity)
    {
        case `Information`:
            console.log(vt.info + `ℹ ｢mcode｣:'${message}'`);
            break;
        case `Warning`:
            console.log(vt.warn + `⚠ ｢mcode｣:'${message}'`);
            break;
        case `Error`:
            console.log(vt.errr + `✖ ｢mcode｣:'${message}'`);
            break;
        case `Fatal`:
            console.log(vt.dead + `✖ ｢mcode｣:'${message}'`);
            break;
        default:
            console.log(vt.hmmm + `❔ ｢mcode｣:'${message}'`);
            break;
    }
    console.log(
        vt.gray + `     ` + vt.reset +
        vt.gray + `time: ` + vt.reset + `${timeStamp()}    ` +
        vt.gray + `from: ` + vt.reset + `backend.${source}    ` +
        vt.gray + `severity: ` + vt.reset + `${severity}`);

    console.log(`--` + vt.reset);

    return true;  // logged
};

/**
 * timestamp() -- function to generate timestamp string: YYYY-MM-DD HH:MM:SS.mmm.
 * @returns  {String} "YYYY-MM-DD HH:MM:SS.mmm".
 * @api public
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
 * simplifyText() -- Strips a string of BRACES, BRACKETS, QUOTES, etc.
 *
 * @param {string} textToSimplify the string to be simplified to data
 * @returns {string} the simplified text
 * @api public
 */
function simplifyText(textToSimplify)
{
    let simplifiedText = ``;
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

    for (let i = 0; i < textToSimplify.length; i++)
    {
        switch (textToSimplify[i])
        {
            case `{`:
                simplifiedText += indent() + `{`;
                lineEmpty = false;
                tabStop++;
                simplifiedText += indent();
                break;
            case `[`:
                simplifiedText += indent() + `[`;
                lineEmpty = false;
                tabStop++;
                simplifiedText += indent();
                break;
            case `}`:
                tabStop--;
                simplifiedText += indent() + `}`;
                firstColon = true;
                lineEmpty = false;
                break;
            case `]`:
                tabStop--;
                simplifiedText += indent() + `]`;
                firstColon = true;
                lineEmpty = false;
                break;
            case `,`:
                simplifiedText += indent();
                firstColon = true;
                lineEmpty = true;
                break;
            case `"`:
                break;
            case `:`:
                if (firstColon)
                {
                    simplifiedText += textToSimplify[i];
                    simplifiedText += ` `;
                    firstColon = false;
                }
                else
                {
                    simplifiedText += textToSimplify[i];
                }
                break;
            case ` `:
                simplifiedText += textToSimplify[i];
                break;
            case `\t`:
                simplifiedText += textToSimplify[i];
                break;
            default:
                lineEmpty = false;
                simplifiedText += textToSimplify[i];
                break;
        }
    }

    return simplifiedText;
};

/**
 * listifyArrayHTML() -- Converts an array of text items into a BOOTSTRAP CARD LIST.
 *
 * @param {array} arrayToListify the array to be convert to a HTML List.
 * @returns {string} the HTML List code.
 * @api public
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
 * listifyArrayJSX() -- Converts an array of text items into a BOOTSTRAP CARD LIST - JSX code.
 *
 * @param {array} arrayToListify the array to be convert to a HTML List.
 * @returns {string} the HTML List code.
 * @api public
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

// #endregion

// #region  F U N C T I O N - E X P O R T S

export {log, timeStamp, simplifyText, listifyArrayHTML, listifyArrayJSX};

// #endregion

// #endregion
// #endregion
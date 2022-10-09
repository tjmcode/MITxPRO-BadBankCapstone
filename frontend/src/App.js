// #region  H E A D E R
// <copyright file="App.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE AppName React App
 *      Module:   Modules (./App.js)
 *      Project: MicroCODE 3-Tier MERN Template 'AppName'
 *      Customer: Internal+MIT xPRO Course
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
 *      This module implements the MicroCODE's 'AppName' React App Entry Point.
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
 *  03-Jun-2022   TJM-MCODE  {0001}    New module implementing the 'AppName' App Entry.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './App.css';
import logo from './logo.svg';
import axios from 'axios';

// include our common MicroCODE Server Library
import {log, simplifyText} from './mcodeClient.js';

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// support .env file variables
require('dotenv').config();

// #endregion

// #region  J A V A S C R I P T

// #region  C O D E   F O L D I N G

// #endregion

// #region  C O N S T A N T S

//    localhost:8080 for development
//    https://appname.tjmcode.io/backend for frontend
// or http://appname.tjmcode.io:8080 for backend
//
const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`;

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

// #endregion

// #region  C O M P O N E N T S

/**
 * App() – AppNames's Single Page App (SPA) - the 'FRONT-END'.
 *
 * @api public
 *
 * @param {nil} no properties.
 *
 * @returns JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      App();
 *
 */
class App extends Component
{
    // validate PROPS input(s)

    // initialize STATE and define accessors...
    state = {
        users: [],
    };

    // access CONTEXT for reference...

    // #region  P R I V A T E   F U N C T I O N S

    async createUser()
    {
        log(`Attempting Create User: ${apiUrl}/user-create`, logSource, `Waiting`);

        try
        {
            await axios.get(apiUrl + '/user-create');
            this.loadUsers();
        }
        catch
        {
            log(`Create User failed: ${apiUrl}/user-create`, logSource, `Error`);
        }
    }

    async deleteAllUsers()
    {
        log(`Attempting Delete All Users: ${apiUrl}/users-delete`, logSource, `Waiting`);

        try
        {
            await axios.get(apiUrl + '/users-delete');
            this.setState({
                users: [],
            });
        }
        catch
        {
            log(`Delete All Users failed: ${apiUrl}/users-delete`, logSource, `Error`);
        }
    }

    async loadUsers()
    {
        log(`Attempting to Load All Users: ${apiUrl}/users`, logSource, `Waiting`);

        try
        {
            const res = await axios.get(apiUrl + '/users');
            this.setState({
                users: res.data
            });

            log(`Load All Users succeeded: ${apiUrl}/users`, logSource, `Information`);
            log(`users:${simplifyText(JSON.stringify(this.state.users))}`, logSource, `Information`);
        }
        catch
        {
            log(`Load All Users failed: ${apiUrl}/users`, logSource, `Error`);
        }
    }

    // #endregion

    // #region  E V E N T   H A N D L E R S

    componentDidMount()
    {
        this.loadUsers();
    }

    // #endregion

    // perform component COMPUTATION to generate output

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    render()
    {
        return (
            <div className="App">
                <Container fluid>

                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                    <Row className="App-buttons">
                        <Button
                            className="App-button"
                            variant="dark"
                            onClick={() => this.createUser()}
                        >
                            Create User
                        </Button>

                        <Button
                            className="App-button"
                            variant="dark"
                            onClick={() => this.deleteAllUsers()}
                        >
                            Delete All Users
                        </Button>
                    </Row>

                    <div className="App-body">
                        <Table striped bordered hover size="sm" variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email Address</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((user, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td key={user.username}>{user.username}</td>
                                        <td key={user.email}>{user.email}</td>
                                        <td key={user.password}>{user.password}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                </Container>
            </div>
        );
    }
}

// #endregion
// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default App;

// #endregion
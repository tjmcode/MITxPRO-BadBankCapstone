# MITxPRO-BadBankCapstone
A 5th refactoring of the Bad Bank App, moving it into three (3) Docker Containers all running in a Cloud VM.

    * Frontend - the Web Browser Client
    * Backend - the Cloud based Server
    * Database - a MongoDB database for the Backend


## Description

This will be used for my MIT xPRO Portfolio.
This Bad Bank project is a refactored version of the Bad Bank 'Fire Hydrant' project I did
in the previous MIT 'Digital Transformation' course in December 2021.
It was bascially rewritten from scratch in React Components, Context, and State.
A 3rd refactoring took all possible Components and commonized and simplified them.

This refactoring moved the entire App to the MERN Frontend-Backend-Database Architecture...

This App was built from a new template I created for the MIT xPRO MERN course.
The template allows me to built a full 3-Tier 'Dockerized' App and deploy it immediately to a
hosting service like DigitalOcean.

The App template includes (GitHub Repo: MITxPRO-DockerMERN) inlcudes a full CI/CD pipleine
that utilizes a GitHib Action, Docker Hub, and three Containers.


## Getting Started

* General help with using Visual Studio Code to develop JavaScript...
```
https://code.visualstudio.com/Docs/languages/javascript
```

### Dependencies

* React
* Babel
* GitHub
* Docker
* Docker Hub
* DigitalOcean


### Installing

* Clone this repo

* Use "npm install" to load a simple HTTP Server for the project
```
npm install
```

* Use "docker compose up" command in the project folder to build and launch the App in three Containers.
```
docker compose up
```

* Navigate your Browser to...
```
localhost:3000
```

* Add test to "puppeteer.js" in the Server root folder.
* To execute tests, open a new Terminal Windows in the Server Root and execute...
```
node puppeteer
```



* Demonstration of app startup...

<p align="left"><img src=".\.github\images\app-startup.png" width="720" title="Server Startup..."></p>

* Example of app u.i...

<p align="left"><img src=".\.github\images\app-ui.png" width="720" title="App U.I..."></p>

* Demonstration of the React Bad Bank... (https://www.youtube.com/watch?v=kQxvMWJc2JE&t=5s)

<video id="demo-video" style="border-style:solid; border-width:2px" src="https://youtu.be/hctvo-EFqe4.mp4" width="1024" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allow="autoplay *" loop autoplay autobuffer controls muted>
Your browser does not support the HTML5 player.
</video>


## Help

This is an unsupported demonstation project.

## Terminology

| Word or Acronym	| Description/Definition                                |
|-------------------|-------------------------------------------------------|
|  NPM	            | Node Package Manager, actually “Node PM”, “Node pkgmakeinst” a system to deploy, install, and maintain NodeJS Apps. (PM was a BASH utility).
|  Template	        | A file used to start others to ensure code and documentation consistency.
|  MERN             | MongoDB, Express, React, Node JS.
|  MongoDB          | A ‘NoSQL’ database designed for Cloud applications, also referred to as a ‘Document Store’.
|  Express          | Express is *not* a database but rather an ‘extensible routing language’ for communication between a Client and a Server.
|  React            | A Web UI development system, a JavaScript library developed by Facebook and made public—and Open Source—since 2013.
|  Node JS          | A development stack that executes from a local file store—on a local Server—instead of from a network of remote servers on the Web.
|  Docker           | A system to ‘containerize’ software deployment akin to shipping containers.


## Authors

Contributors names and contact info

* Dr. Abel Sanchez (MIT) [@Unknown](https://twitter.com/Unknown)

* Timothy J McGuire [@TimothyMcGuire](https://twitter.com/TimothyMcGuire)


## Version History

* 0.7
    * Added a 2nd method of Authentication.
* 0.6
    * Fixed a Promise sequence issue with dal.sendMoney().
* 0.5
    * Refactored into the 3-Tier Dockerized MongoDB, Express, React, NodeJS (MERN) Architecture.
* 0.4
    * Refactored into the MongoDB, Express, React, NodeJS (MERN) Architecture.
* 0.3
    * Refactored further by simplifying the Form Component for all functions.
* 0.2
    * Refactored further into a 'create-react-app' framework with Context.
* 0.1
    * Refactored into the MicroCODE [MCODE] style and templates.
    * See [commit change]() or See [release history]()
* 0.0
    * Coded using MicroCODE Templates, following along with Dr. Sanchez' videos.

## Future Development

* 0.8
    * Encrypt email password properly


## License

This project is licensed under the MIT License - see the LICENSE.md file for details

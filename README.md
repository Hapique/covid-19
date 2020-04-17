# Introduction

![Screenshot](https://i.imgur.com/3XQDACL.png)
A Covid-19 visualizer working on Raspberry Pi for BJTU's embedded system app development course

## :ledger: Index

- [About](#beginner-about)
- [Usage](#zap-usage)
  - [Installation](#electric_plug-installation)
  - [Commands](#package-commands)


## :beginner: About

The project uses Docker to simulate the Raspberry Pi with Raspbian (as I do not own a Raspberry Pi).

The goal of the project is to display an interactive map of Covid-19 cases/deaths/recoveries. You can interact with the map by zooming and moving within it and click on any country to display its informations. It uses an API to display updated data. It also uses another API to get countries names and flags which infos are stored in the browser's local storage as to not overload the (free) API.

## :zap: Usage

Open your browser and go to http://localhost:3000.

### :electric_plug: Installation

- Download the project [here](https://github.com/Hapique/covid-19/archive/master.zip).
- Extract the archive.
- `cd /path/to/covid-19`

### :package: Commands

- `docker-compose up`

OR

- `npm i && npx tsc && npm start` (requires Node.js)

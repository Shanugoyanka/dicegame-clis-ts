# DiceGame
[Author-Shanu Goyanka](https://www.linkedin.com/in/shanu-goyanka/)

A typescript command line tool for playing a cool multiplayer dice game.
The "Game of Dice" is a multiplayer game where N players roll a 6 faced dice in a round-robin
fashion. Each time a player rolls the dice their points increase by the number (1 to 6) achieved
by the roll.

As soon as a player accumulates M points they complete the game and are assigned a rank.
Remaining players continue to play the game till they accumulate at least M points. The game
ends when all players have accumulated at least M points.

## Getting started

This project is **typescript cli** using **Node JS** as framework. I had tried to maintain the code
structure easy to understand & maintain. Project is open for suggestions & bugs can be reports as well.

## Prerequisties

[NodeJS](https://nodejs.org/en/)

## Build and Run

Install node packages required for this project

```bash
$ npm install
```
To start the game on command line

```bash
$ npm start
```

## Features

-  The order in which the users roll the dice is decided randomly at the start of the game.
-  If a player rolls the value "6" then they immediately get another chance to roll again and move
ahead in the game.
-  If a player rolls the value "1" two consecutive times then they are forced to skip their next turn
as a penalty.
-   Light-weight & well documented project.
-   Linting `(100% covered)` with [Prettier-vscode].


## Project Structure
```sh
├── bin
│   └── dicegame
├── lib (compiled ready code will be here)
├── src
│   ├── commands
│   │   └── play.ts
│   ├── utils
│   │   ├── diceRandomNumber.ts
│   │   ├── displayRank.ts
│   │   └── gameRound.ts
│   │   └── shuffle.ts
│   ├── cli.ts
├── .gitignore
├── .gitattributes
├── package.json
├── package-lock.json
└── README.md
├── tsconfig.json
```
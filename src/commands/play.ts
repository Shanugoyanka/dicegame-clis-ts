import gluegun from "gluegun";
import { GluegunToolbox } from "gluegun";
import shuffle from "../utils/shuffle";
import gameRound from "../utils/gameRound";
import displayRank from "../utils/displayRank";

export interface Prompt {
  numberOfPlayers?: number;
  winPoints?: number;
  rollADice?: string;
}

export interface Player {
  name: string;
  totalScore: number;
  lastScore: number;
  skip: boolean;
  rank: number;
}

function isNormalInteger(str: number): boolean {
  var n = Math.floor(str);
  return n !== Infinity && n === str && n >= 2;
}

const command: gluegun.GluegunCommand<GluegunToolbox> = {
  name: "play",
  description: "Multiplayer dice game",
  async run(toolbox) {
    let players: Player[] = [];
    try {
      let result = await toolbox.prompt.ask<Prompt>([
        {
          type: "input",
          name: "numberOfPlayers",
          message: "Select the number of players",
          choices: ["2", "3", "4", "5", "6"],
          required: true,
        },
      ]);
      let numberOfPlayers = Number(result.numberOfPlayers);
      if (!isNormalInteger(numberOfPlayers)) {
        throw new Error(
          `Number of players were invalid ${numberOfPlayers}, should be an integer greater than 1`
        );
      }

      for (let player = 1; player <= numberOfPlayers; player++) {
        const createPlayer: Player = {
          name: `Player-${player}`,
          totalScore: 0,
          lastScore: 0,
          skip: false,
          rank: 1,
        };
        players.push(createPlayer);
      }
      let winningPlayers: Player[] = [];

      displayRank(players, winningPlayers);
      result = await toolbox.prompt.ask<Prompt>([
        {
          type: "input",
          name: "winPoints",
          message: "Select the win score",
          required: true,
        },
      ]);
      let winPoints = Number(result.winPoints);
      if (!isNormalInteger(winPoints)) {
        throw new Error(
          `Win score entered was invalid ${numberOfPlayers}, should be an integer greater than 1`
        );
      }

      console.log(" -------------------------------------- ");
      console.log("|                                      |");
      console.log("|       LET THE GAME BEGIN             |");
      console.log("|                                      |");
      console.log(" -------------------------------------- ");

      shuffle(players);
      gameRound(players, toolbox, winPoints, winningPlayers);
    } catch (error) {
      console.log("Error - ", error.message);
    }
  },
};

export default command;

import diceRandomNumber from "./diceRandomNumber";
import { Player, Prompt } from "../commands/play";
import { GluegunToolbox } from "gluegun";
import displayRank from "./displayRank";

async function rollDice(
  player: Player,
  toolbox: GluegunToolbox,
  winningPoints: number
): Promise<Player> {
  if (player.skip) {
    player.lastScore = 0;
    player.skip = false;
    return player;
  }
  await toolbox.prompt.ask<Prompt>([
    {
      type: "select",
      name: "rollADice",
      message: `${player.name} its your turn, Roll a dice`,
      choices: ["r"],
      required: true,
    },
  ]);
  let currentScore = diceRandomNumber();

  player.totalScore = player.totalScore + currentScore;
  if (player.totalScore >= winningPoints) {
    return player;
  }
  if (currentScore === 6) {
    console.log(`HURRRAY ${player.name} got a 6, ROLL AGAIN!!!`);
    player = await rollDice(player, toolbox, winningPoints);
  } else if (currentScore === 1 && player.lastScore === 1) {
    player.skip = true;
    console.log(`OOOOPS!!, ${player.name} will be skipped in the next round`);
  } else {
    console.log(" The Dice value is ---------- ", currentScore);
  }
  return player;
}

export default async function gameRound(
  players: Player[],
  toolbox: GluegunToolbox,
  winningPoints: number,
  winningPlayers: Player[]
) {
  for (let player of players) {
    player = await rollDice(player, toolbox, winningPoints);
    if (player.totalScore >= winningPoints) {
      player.rank = winningPlayers.length + 1;
      winningPlayers.push(player);
      console.log(
        ` HURRRRRAYYYYY! ${player.name} have completed the final score and secured the rank of ${player.rank}`
      );
    }
  }
  players = players.filter((player) => {
    return player.totalScore < winningPoints;
  });

  displayRank(players, winningPlayers);
  if (players.length) {
    await gameRound(players, toolbox, winningPoints, winningPlayers);
  }
}

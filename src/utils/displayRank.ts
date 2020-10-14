import { Player } from "../commands/play";

export default function displayRank(
  players: Player[],
  winningPlayers: Player[]
): Player[] {
  console.log("| Player Name | Total Score | Rank |");
  console.log(" ----------------------------------------");
  for (let player of winningPlayers) {
    console.log(
      "| ",
      player.name,
      "  |      ",
      player.totalScore,
      "    |  ",
      player.rank,
      " | "
    );
  }
  if (players.length) {
    let sortedPlayers = players.slice(0);
    sortedPlayers.sort(function (a, b) {
      return b.totalScore - a.totalScore;
    });

    var numTies = 0;
    sortedPlayers[0].rank = winningPlayers.length + 1;
    for (let i = 1; i < sortedPlayers.length; i++) {
      if (sortedPlayers[i].totalScore === sortedPlayers[i - 1].totalScore) {
        numTies++;
        sortedPlayers[i].rank = sortedPlayers[i - 1].rank;
      } else {
        sortedPlayers[i].rank = sortedPlayers[i - 1].rank + 1 + numTies;
        numTies = 0;
      }
    }
    for (let player of sortedPlayers) {
      console.log(
        "| ",
        player.name,
        "  |      ",
        player.totalScore,
        "    |  ",
        player.rank,
        " | "
      );
    }
  }
  return players;
}

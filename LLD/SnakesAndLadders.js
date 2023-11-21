class Board {
  constructor(N, snakes, ladders) {
    this.N = N;
    this.ladders = new Map(ladders);
    this.snakes = new Map(snakes);
  }
}

class Player {
  constructor(id) {
    this.id = id;
    this.pos = 0;
  }
}

function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  return dice;
}

function playGame() {
  let N = 100;
  let M = 100;
  let snakes = [
    [62, 5],
    [33, 6],
    [49, 9],
    [88, 16],
    [41, 20],
    [56, 53],
    [98, 64],
    [93, 73],
    [95, 75],
  ];

  const ladders = [
    [2, 37],
    [27, 46],
    [10, 32],
    [51, 68],
    [61, 79],
    [65, 84],
    [71, 91],
    [81, 100],
  ];

  const board = new Board(N, snakes, ladders);
  //   const player1 = new Player("p1");
  //   const player2 = new Player("p2");
  let players = [];
  for (let i = 0; i < M; i++) {
    const player = new Player(`p${i + 1}`);
    players.push(player);
  }

  let isPlaying = true;

  while (isPlaying) {
    //Player 1
    for (let i = 0; i < M; i++) {
      let dice = rollDice();
      let initialPos = players[i].pos;
      players[i].pos += dice;

      while (
        board.snakes.has(players[i].pos) ||
        board.ladders.has(players[i].pos)
      ) {
        if (board.snakes.has(players[i].pos)) {
          console.log(`Player ${players[i].id} hit a snake`);
          players[i].pos = board.snakes.get(players[i].pos);
        }

        if (board.ladders.has(players[i].pos)) {
          console.log(`Player ${players[i].id} hit a ladder`);
          players[i].pos = board.ladders.get(players[i].pos);
        }
      }

      if (players[i].pos > board.N) {
        players[i].pos = initialPos;
        console.log(
          `${players[i].id} rolled a ${dice} and moved from ${initialPos} to ${players[i].pos}`
        );
      } else if (players[i].pos === N) {
        console.log(
          `${players[i].id} rolled a ${dice} and moved from ${initialPos} to ${players[i].pos}`
        );
        console.log(`${players[i].id} wins the game`);
        isPlaying = false;
        break;
      } else {
        console.log(
          `${players[i].id} rolled a ${dice} and moved from ${initialPos} to ${players[i].pos}`
        );
      }
    }
  }
}

playGame();

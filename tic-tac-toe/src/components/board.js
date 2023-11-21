import styles from "./Board.module.css";
import { useState, useRef, useEffect } from "react";

function Board() {
  const [turn, setTurn] = useState("X");
  const [values, setValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [winnerText, setWinnerText] = useState("");

  function checkWinner() {
    //Check every column
    let pos = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < pos.length; i++) {
      //Check whether all entries are same for any subarray
      let sub = pos[i];

      if (
        values[sub[0]] === values[sub[1]] &&
        values[sub[1]] === values[sub[2]] &&
        values[sub[2]] === values[sub[0]]
      ) {
        setWinnerText(values[sub[0]]);
        break;
      }
    }
    //0 3 6

    //1 4 7

    //2 5 8

    //Check every row
    // 0 1 2
    // 3 4 5
    // 6 7 8

    //Check both diagonals
    //0 4 8
    //2 4 6
  }

  useEffect(() => {
    checkWinner();
  }, [checkWinner, values]);

  function handleClick(index) {
    if (winnerText) return;
    //Handle game logic here....
    if (values[index] === "") {
      setValues((values) => {
        values[index] = turn;
        return values;
      });

      setTurn((turn) => {
        if (turn === "X") {
          return "O";
        } else {
          return "X";
        }
      });
    }
  }
  return (
    <>
      <div className={styles.boardRow}>
        <div
          className={styles.cell}
          onClick={() => {
            handleClick(0);
          }}
        >
          {values[0]}
        </div>
        <div
          className={styles.cell}
          onClick={() => {
            handleClick(1);
          }}
        >
          {values[1]}
        </div>
        <div
          className={styles.cell}
          onClick={() => {
            handleClick(2);
          }}
        >
          {values[2]}
        </div>
      </div>
      <div className={styles.boardRow2}>
        <div
          className={styles.cell}
          onClick={() => {
            handleClick(3);
          }}
        >
          {values[3]}
        </div>
        <div
          className={styles.cell}
          onClick={() => {
            handleClick(4);
          }}
        >
          {values[4]}
        </div>
        <div
          className={styles.cell}
          onClick={() => {
            handleClick(5);
          }}
        >
          {values[5]}
        </div>
      </div>
      <div className={styles.boardRow2}>
        <div
          className={styles.cell}
          onClick={() => {
            handleClick(6);
          }}
        >
          {values[6]}
        </div>
        <div
          className={styles.cell}
          onClick={() => {
            handleClick(7);
          }}
        >
          {values[7]}
        </div>
        <div
          className={styles.cell}
          onClick={() => {
            handleClick(8);
          }}
        >
          {values[8]}
        </div>
      </div>
      <p>{winnerText}</p>
    </>
  );
}

export default Board;

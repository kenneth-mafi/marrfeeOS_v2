import { useState } from "react";
import { RPSGameContext } from "../contexts/contexts";

const WIN_SCORE = 10;

const RPSGameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    round: 1,

    playerScore: 0,
    computerScore: 0,

    playerRoundScore: 0,
    computerRoundScore: 0,

    lastResult: null,
    lastMoves: null,

    uiState: "idle",       // 👈 controls UI
    roundWinner: null
  });

  const getComputerMove = () => {
    const moves = ["rock", "paper", "scissors"];
    return moves[Math.floor(Math.random() * moves.length)];
  };

  const hasPlayerWon = (p, c) =>
    (p === "scissors" && c === "paper") ||
    (p === "rock" && c === "scissors") ||
    (p === "paper" && c === "rock");

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      round: 1,
      roundWinner: null,
      lastResult: null,
      lastMoves: null,
      uiState: "idle",
      playerRoundScore: 0,
      computerRoundScore: 0,
      playerScore: 0,
      computerScore: 0
    }));
  };

  const nextMove = () => {
    setGameState(prev => ({
      ...prev,
      uiState: "idle",
      lastResult: null,
      lastMoves: null
    }));
  };

  const nextRound = () => {
    setGameState(prev => ({
      ...prev,
      round: prev.round + 1,
      uiState: "idle",
      roundWinner: null,
      playerScore: 0,
      computerScore: 0,
      lastResult: null,
      lastMoves: null
    }));
  };

  const playGame = (playerMove) => {
    const computerMove = getComputerMove();

    if (playerMove === computerMove) {
      setGameState(prev => ({
        ...prev,
        lastResult: "draw",
        lastMoves: { playerMove, computerMove },
        uiState: "result"
      }));
      return;
    }

    const playerWon = hasPlayerWon(playerMove, computerMove);

    setGameState(prev => {
      const nextPlayerScore = playerWon
        ? prev.playerScore + 1
        : prev.playerScore;

      const nextComputerScore = !playerWon
        ? prev.computerScore + 1
        : prev.computerScore;

      // round finished?
      if (nextPlayerScore === WIN_SCORE) {
        return {
          ...prev,
          playerRoundScore: prev.playerRoundScore + 1,
          lastResult: "win",
          lastMoves: { playerMove, computerMove },
          uiState: "roundEnd",
          roundWinner: "player",
          playerScore: nextPlayerScore,
          computerScore: nextComputerScore
        };
      }

      if (nextComputerScore === WIN_SCORE) {
        return {
          ...prev,
          computerRoundScore: prev.computerRoundScore + 1,
          lastResult: "lose",
          lastMoves: { playerMove, computerMove },
          uiState: "roundEnd",
          roundWinner: "computer",
          playerScore: nextPlayerScore,
          computerScore: nextComputerScore
        };
      }

      return {
        ...prev,
        playerScore: nextPlayerScore,
        computerScore: nextComputerScore,
        lastResult: playerWon ? "win" : "lose",
        lastMoves: { playerMove, computerMove },
        uiState: "result"
      };
    });
  };

  return (
    <RPSGameContext.Provider
      value={{ gameState, playGame, nextMove, nextRound, resetGame }}
    >
      {children}
    </RPSGameContext.Provider>
  );
};


export default RPSGameProvider;

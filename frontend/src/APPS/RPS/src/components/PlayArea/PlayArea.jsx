import { useRPSGameContext } from "../../hooks/useRPSGameContex";
import ButtonsContainer from "../Cards/ButtonsContainer";
import FinalScoreCard from "../Cards/FinalScoreCard";
import MessageCard from "../Cards/MessageCard";

const beatsMap = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};

const PlayArea = () => {
  const { gameState, nextRound } = useRPSGameContext();
  const {
    lastMoves,
    lastResult,
    roundWinner,
    uiState,
    round,
    playerScore,
    computerScore,
  } = gameState;

  let playerMove;
  let computerMove;

  if (lastMoves) {
    ({ playerMove, computerMove } = lastMoves);
  }

  /* ---------------- MESSAGE TEXT BUILDERS ---------------- */

    let choiceUpdate = null;
    let verdict = null;
    let result = null;
    let color = null;

    const Bold = ({ children }) => <strong>{children}</strong>;


    if (lastMoves) {
    choiceUpdate = (
        <>
        You picked <Bold>{playerMove}</Bold> and computer picked{" "}
        <Bold>{computerMove}</Bold>
        </>
    );

    if (lastResult === "draw") {
        verdict = null;
        result = <>It’s a draw!</>;
    } 
    else if (lastResult === "win") {
        verdict = (
        <>
            <Bold>{playerMove}</Bold> beats <Bold>{computerMove}</Bold>
        </>
        );
        result = <>You won!</>;
        color = "green"
    } 
    else if (lastResult === "lose") {
        verdict = (
        <>
            <Bold>{computerMove}</Bold> beats <Bold>{playerMove}</Bold>
        </>
        );
        result = <>Computer won!</>;
        color = "red"
    }
    }


  /* ---------------- FINAL ROUND TEXT ---------------- */

  let finalVerdict = "";
  let finalMessage = "";
  let finalColor;
    
  if (roundWinner === "player") {
    finalVerdict = "You won this round!";
    finalMessage = "Great job 🎉";
    finalColor = "green"
  } else if (roundWinner === "computer") {
    finalVerdict = "Computer won this round!";
    finalMessage = "Try again 💪";
    finalColor = "red"
  }

  /* ---------------- UI SWITCH ---------------- */

  if (uiState === "roundEnd") {
    return (
      <FinalScoreCard
        round={round}
        prSc={playerScore}
        crSc={computerScore}
        verd={finalVerdict}
        msg={finalMessage}
        color={finalColor}
        onClick={() => {nextRound()}}
      />
    );
  }

  if (uiState === "result") {
    return (
      <MessageCard
        choiceUpdate={choiceUpdate}
        verdict={verdict}
        result={result}
        color={color}
      />
    );
  }

  return <ButtonsContainer />;
};

export default PlayArea;

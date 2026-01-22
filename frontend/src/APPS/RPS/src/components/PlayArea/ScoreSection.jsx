
import { useRPSGameContext } from "../../hooks/useRPSGameContex";
import RoundScoreCard from "../Cards/RoundScoreCard";

const ScoreSection = () => {
  const { gameState } = useRPSGameContext();
  const { playerScore, computerScore, playerRoundScore, computerRoundScore, round } = gameState;

  if (gameState.uiState === "roundEnd") return null;

  return <RoundScoreCard 
        round={round}
        pScore={playerScore}
        cRoundSc={computerRoundScore}
        pRoundSc={playerRoundScore}
        cScore={computerScore}
  />;
};

export default ScoreSection;

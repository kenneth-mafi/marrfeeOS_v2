import SubHeader from "../../components/header/RpsHeader2";
import "./rulesPage.css";

const RulesPage = () => {
  return (
    <div className="rules-page">
        <SubHeader />
      <div className="rules-card">
        <h1 className="rules-title">
          <strong>Rock Paper Scissors</strong> Rules
        </h1>

        <ul className="rules-list">
          <li>
            <b>Rock</b> beats <b>Scissors</b>
          </li>
          <li>
            <b>Scissors</b> beats <b>Paper</b>
          </li>
          <li>
            <b>Paper</b> beats <b>Rock</b>
          </li>
        </ul>

        <div className="divider" />

        <h2>How the Game Works</h2>
        <p>
          You and the computer both choose one of the three options.  
          The winner of each move earns <b>1 point</b>.
        </p>

        <p>
          The first player to reach <b>10 points</b> wins the round.
        </p>

        <p>
          After a round ends, a new round begins and the winner gets a
          <b> round point</b>.
        </p>

        <div className="divider" />

        <h2>Scoring</h2>
        <ul className="rules-list">
          <li>Win a move → +1 score</li>
          <li>First to 10 → wins the round</li>
          <li>Rounds won are tracked separately</li>
        </ul>

        <div className="goodluck">
          🎮 <strong>Good luck & have fun!</strong>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;

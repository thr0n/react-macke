import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withFirebase } from "../../firebase";
import { NumericStat } from "./NumericStat";
import { PercentageStat } from "./PercentageStat";

class Stats extends React.Component {
  state = {
    gameStats: {},
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.gameStats().on("value", snapshot => {
      this.setState({
        loading: false,
        gameStats: snapshot.val()
      });
    });
  }

  renderStats = () => {
    const { gamesFinished, gamesStarted, highscore } = this.state.gameStats;
    const finishingRate = (gamesFinished / gamesStarted) * 100;

    return (
      <>
        <NumericStat label="Spiele gestarted" value={gamesStarted} />
        <NumericStat label="Spiele beendet" value={gamesFinished} />
        <PercentageStat
          label="beendet"
          value={isNaN(finishingRate) ? 0 : finishingRate}
        />
        {highscore > 0 && <NumericStat label="Highscore" value={highscore} />}
        {/* <NumericStat label="Längstes Spiel" value={gamesFinished} />
        <NumericStat label="Kürzestes Spiel" value={gamesFinished} /> */}
      </>
    );
  };

  render() {
    return (
      <div style={{ marginTop: "2vh" }}>
        {this.state.loading ? <CircularProgress /> : this.renderStats()}
      </div>
    );
  }
}

export default withFirebase(Stats);

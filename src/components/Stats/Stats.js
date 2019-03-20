import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withFirebase } from "../../firebase";
import { NumericStat } from "./NumericStat";

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStats: {},
      loading: true
    };
  }

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
    return (
      <>
        <NumericStat
          label="Spiele gestarted"
          value={this.state.gameStats.gamesStarted}
        />
        <NumericStat
          label="Spiele beendet"
          value={this.state.gameStats.gamesFinished}
        />
      </>
    );
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <CircularProgress />
        ) : (
          <div>{this.renderStats()}</div>
        )}
      </div>
    );
  }
}

export default withFirebase(Stats);

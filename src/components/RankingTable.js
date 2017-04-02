import React, { Component } from 'react';
import Table from 'rebass/dist/Table';
import Select from 'rebass/dist/Select';

const sorter = sortBy => {
  const propIndex = {
    matches: 1,
    wins: 2,
    loss: 3
  }[sortBy];
  return (contentA, contentB) => {
    if (contentA[propIndex] < contentB[propIndex]) {
      return 1;
    } else if (contentA[propIndex] > contentB[propIndex]) {
      return -1;
    } else {
      return 0;
    }
  };
};

class RankingTable extends Component {
  state = {
    players: {}
  };

  handleUpdateWinRateVs = (player, target) => {
    this.setState(prevState => ({
      ...prevState,
      players: {
        ...prevState.players,
        [player]: target
      }
    }));
  };

  render() {
    const { rankingData, defaultSort } = this.props;
    return (
      <Table
        data={Object.keys(rankingData)
          .map(player => {
            const {
              name,
              matches
            } = rankingData[player];

            const wins = matches.filter(
              ({ result }) => result === 'win'
            ).length;
            const vsPlayer = this.state.players[player];
            const winRate = vsPlayer
              ? matches
                  .filter(match => {
                    return match.playedAgainst.indexOf(vsPlayer) !== -1;
                  })
                  .reduce(
                    (prev, current, index, self) => {
                      return {
                        ...prev,
                        matches: self.length,
                        wins: prev.wins + (current.result === 'win' ? 1 : 0)
                      };
                    },
                    { matches: 0, wins: 0 }
                  )
              : { matches: 0, wins: 0 };
            return [
              name,
              matches.length,
              wins,
              matches.length - wins,
              <Select
                label="vs"
                name="winvs"
                value={vsPlayer}
                options={matches
                  .reduce(
                    (prev, current) => {
                      return [...prev, ...current.playedAgainst];
                    },
                    vsPlayer ? [] : ['Choose one']
                  )
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map(player => ({
                    children: player,
                    value: player
                  }))}
                onChange={({ target: { value } }) =>
                  this.handleUpdateWinRateVs(player, value)}
              />,
              winRate.matches ? `${winRate.wins / winRate.matches * 100}%` : ''
            ];
          })
          .sort(sorter(defaultSort))}
        headings={['Name', 'Matches', 'Wins', 'Loss', 'Win rate vs', '']}
      />
    );
  }
}

export default RankingTable;

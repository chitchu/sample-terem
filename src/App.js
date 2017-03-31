import React, { Component } from 'react';
import Container from 'rebass/dist/Container';
import ScoreForm from './components/ScoreForm';
import PageHeader from 'rebass/dist/PageHeader';
import Rankings from './components/Rankings';

import Button from 'rebass/dist/Button';

class App extends Component {
  state = JSON.parse(localStorage.getItem(`sample-terem`)) || {
    matches: [],
    players: {},
    isAdding: false
  };
  componentDidUpdate() {
    const serializedState = JSON.stringify(this.state);
    localStorage.setItem(`sample-terem`, serializedState);
  }
  handleSave = ({ team1Players, team2Players, winner, matchDate }) => {
    const matchType = `${team1Players.length} v ${team2Players.length}`;

    const reducer = (winCondition, playedAgainst) =>
      (prev, current) => {
        const propName = current.toLowerCase().split(' ').join('-');
        const playerObj = prev[propName] || {
          name: current,
          matches: []
        };
        return {
          ...prev,
          [propName]: {
            ...playerObj,
            matches: playerObj.matches.concat([
              {
                matchType,
                result: winner === winCondition ? 'win' : 'lose',
                playedAgainst,
                matchDate
              }
            ])
          }
        };
      };

    this.setState(prevState => {
      return {
        ...prevState,
        matches: prevState.matches.concat({
          team1Players,
          team2Players,
          winner,
          matchDate
        }),
        players: {
          ...prevState.players,
          ...team2Players.reduce(
            reducer(2, team1Players),
            team1Players.reduce(reducer(1, team2Players), this.state.players)
          )
        },
        isAdding: false
      };
    });
  };
  handleShowAddForm = () => {
    this.setState(prevState => ({
      ...prevState,
      isAdding: true
    }));
  };

  handleHideAddForm = () => {
    this.setState(prevState => ({
      ...prevState,
      isAdding: false
    }));
  };
  render() {
    return (
      <Container>
        <PageHeader
          pt={0}
          pb={0}
          mt={1}
          mb={2}
          heading={`Foosball Matches`}
          description={`Rankings`}
        />
        {this.state.isAdding
          ? <ScoreForm
              onSave={this.handleSave}
              onCancel={this.handleHideAddForm}
            />
          : <Button onClick={this.handleShowAddForm}>Add match</Button>}
        <Rankings rankingData={this.state.players} />
      </Container>
    );
  }
}

export default App;

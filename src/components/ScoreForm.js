import React, { Component } from 'react';
import Button from 'rebass/dist/Button';
import Panel from 'rebass/dist/Panel';
import PanelHeader from 'rebass/dist/PanelHeader';
import Divider from 'rebass/dist/Divider';

import PlayersForm from './PlayersForm';

class ScoreForm extends Component {
  state = {
    team1Players: [''],
    team2Players: [''],
    winner: 1,
    matchDate: new Date().toDateString()
  };

  handleAddPlayer = team => {
    this.setState(prevState => {
      const props = {
        [`team${team}Players`]: prevState[`team${team}Players`].concat('')
      };
      return { ...prevState, ...props };
    });
  };

  handleRemovePlayer = team => {
    this.setState(prevState => {
      const props = {
        [`team${team}Players`]: prevState[`team${team}Players`].length > 1
          ? prevState[`team${team}Players`].slice(0, -1)
          : prevState[`team${team}Players`]
      };
      return { ...prevState, ...props };
    });
  };

  handleSave = () => {
    this.props.onSave(this.state);
  };
  handleWinnerUpdate = team => {
    this.setState(prevState => ({
      ...prevState,
      winner: team
    }));
  };
  handlePlayerNameChange = (team, index, name) => {
    this.setState(prevState => {
      prevState[`team${team}Players`][index] = name;
      return { ...prevState };
    });
  };

  isFormInvalid = () => {
    return !this.state.team1Players
      .concat(this.state.team2Players)
      .every(player => player !== '');
  };
  render() {
    return (
      <Panel>
        <PanelHeader inverted>
          Enter match details
        </PanelHeader>
        <PlayersForm
          team1={this.state.team1Players}
          team2={this.state.team2Players}
          winner={this.state.winner}
          onChange={this.handlePlayerNameChange}
          onAddPlayer={this.handleAddPlayer}
          onRemovePlayer={this.handleRemovePlayer}
          onUpdateWinner={this.handleWinnerUpdate}
        />
        <Divider />
        <Button
          backgroundColor={this.isFormInvalid() ? 'disabled' : 'primary'}
          color="white"
          inverted
          rounded
          disabled={this.isFormInvalid()}
          onClick={this.handleSave}
        >
          Save
        </Button>
        <Button
          backgroundColor="secondary"
          color="white"
          inverted
          rounded
          onClick={this.props.onCancel}
        >
          Cancel
        </Button>
      </Panel>
    );
  }
}

export default ScoreForm;

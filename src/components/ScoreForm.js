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
    matchDate: new Date().toDateString()
  };
  handleAddPlayer = team => {
    this.setState(prevState => {
      let props;
      if (team === 1) {
        props = { team1Players: prevState.team1Players.concat('') };
      } else {
        props = { team2Players: prevState.team2Players.concat('') };
      }
      return { ...prevState, ...props };
    });
  };
  handleRemovePlayer = team => {
    this.setState(prevState => {
      let props;
      if (team === 1) {
        props = {
          team1Players: prevState.team1Players.length > 1
            ? prevState.team1Players.slice(0, -1)
            : prevState.team1Players
        };
      } else {
        props = {
          team2Players: prevState.team2Players.length > 1
            ? prevState.team2Players.slice(0, -1)
            : prevState.team2Players
        };
      }
      return { ...prevState, ...props };
    });
  };

  handleSave = () => {
    console.log('save!');
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
          onChange={this.handlePlayerNameChange}
          onAddPlayer={this.handleAddPlayer}
          onRemovePlayer={this.handleRemovePlayer}
        />
        <Divider />
        <Button
          backgroundColor="primary"
          color="white"
          inverted
          rounded
          disabled={'disabled'}
          onClick={this.handleSave}
        >
          Save
        </Button>
      </Panel>
    );
  }
}

export default ScoreForm;

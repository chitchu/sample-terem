import React from 'react';
import Input from 'rebass/dist/Input';
import Heading from 'rebass/dist/Heading';
import Section from 'rebass/dist/Section';
import PlayerActions from './PlayerActions';
import Divider from 'rebass/dist/Divider';
import Radio from 'rebass/dist/Radio';

import './PlayersForm.css';

const PlayersForm = (
  {
    team1,
    team2,
    winner,
    onChange,
    onAddPlayer,
    onRemovePlayer,
    onUpdateWinner
  }
) => {
  let playerIndex = 0;

  const playerInputMap = team =>
    (player, index) => {
      ++playerIndex;
      return (
        <Input
          key={index}
          label={`Player ${playerIndex}`}
          name={`player-${playerIndex}`}
          placeholder="Player name"
          rounded
          autoFocus={team1.length - 1 === index}
          onChange={({ target: { value } }) => onChange(team, index, value)}
          type="text"
        />
      );
    };
  return (
    <div className="player-form-container">
      <Section pt={0} pb={2}>
        <Heading level={3}>Team 1</Heading>
        <PlayerActions
          onAddPlayer={() => onAddPlayer(1)}
          onRemovePlayer={() => onRemovePlayer(1)}
        />
        <Radio
          mt={2}
          mb={2}
          circle
          checked={winner === 1}
          label="is the winner?"
          name="winner"
          onChange={() => onUpdateWinner(1)}
        />
        <Divider />
        {team1.map(playerInputMap(1))}
      </Section>
      <Heading level={3}>VS</Heading>
      <Section pt={0} pb={2}>
        <Heading level={3}>Team 2</Heading>
        <PlayerActions
          onAddPlayer={() => onAddPlayer(2)}
          onRemovePlayer={() => onRemovePlayer(2)}
        />
        <Radio
          mt={2}
          mb={2}
          circle
          checked={winner === 2}
          label="is the winner?"
          name="winner"
          onChange={() => onUpdateWinner(2)}
        />
        <Divider />
        {team2.map(playerInputMap(2))}
      </Section>
    </div>
  );
};

export default PlayersForm;

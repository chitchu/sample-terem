import React from 'react';
import Input from 'rebass/dist/Input';
import Heading from 'rebass/dist/Heading';
import Section from 'rebass/dist/Section';

import PlayerActions from './PlayerActions';

const PlayersForm = (
  { team1, team2, onChange, onAddPlayer, onRemovePlayer }
) => {
  let playerIndex = 0;
  const playerInputMap = (player, index) => {
    ++playerIndex;
    return (
      <Input
        key={index}
        label={`Player ${playerIndex}`}
        name={`player-${playerIndex}`}
        placeholder="Player name"
        rounded
        autoFocus={team1.length - 1 === index}
        type="text"
      />
    );
  };
  return (
    <Section pt={0} pb={0}>
      <Section pt={0} pb={2}>
        <Heading level={3}>Team 1</Heading>
        {team1.map(playerInputMap)}
        <PlayerActions
          onAddPlayer={() => onAddPlayer(1)}
          onRemovePlayer={() => onRemovePlayer(1)}
        />
      </Section>
      <Heading level={3}>VS</Heading>
      <Section pt={0} pb={0}>
        <Heading level={3}>Team 2</Heading>
        {team2.map(playerInputMap)}
        <PlayerActions
          onAddPlayer={() => onAddPlayer(2)}
          onRemovePlayer={() => onRemovePlayer(2)}
        />
      </Section>
    </Section>
  );
};

export default PlayersForm;

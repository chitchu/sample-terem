import React from 'react';
import Button from 'rebass/dist/Button';

const PlayerActions = ({ onAddPlayer, onRemovePlayer }) => {
  return (
    <div>
      <Button
        backgroundColor="success"
        color="white"
        inverted
        rounded
        onClick={onAddPlayer}
      >
        Add player
      </Button>
      <Button
        backgroundColor="secondary"
        color="white"
        inverted
        rounded
        onClick={onRemovePlayer}
      >
        Remove player
      </Button>
    </div>
  );
};

export default PlayerActions;

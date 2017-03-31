import React from 'react';
import ButtonCircle from 'rebass/dist/ButtonCircle';
import Icon from 'react-geomicons';
import Tooltip from 'rebass/dist/Tooltip';

import './PlayerActions.css';
const PlayerActions = ({ onAddPlayer, onRemovePlayer }) => {
  return (
    <div className="player-actions-container">
      <Tooltip inverted rounded title="Add player">
        <ButtonCircle
          backgroundColor="success"
          color="white"
          inverted
          rounded
          onClick={onAddPlayer}
        >
          <Icon name="user" />
        </ButtonCircle>
      </Tooltip>
      <Tooltip inverted rounded title="Remove player">
        <ButtonCircle
          backgroundColor="secondary"
          color="white"
          inverted
          rounded
          onClick={onRemovePlayer}
        >
          <Icon name="close" />
        </ButtonCircle>
      </Tooltip>
    </div>
  );
};

export default PlayerActions;

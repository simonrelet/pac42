import React from 'react';
import PropTypes from 'prop-types';
import Ghost from './Ghost';
import ScaredGhost from './ScaredGhost';

const GhostWrapper = props =>
  props.effect === 'scared' ? <ScaredGhost {...props} /> : <Ghost {...props} />;

GhostWrapper.propTypes = {
  effect: PropTypes.string,
};

export default GhostWrapper;

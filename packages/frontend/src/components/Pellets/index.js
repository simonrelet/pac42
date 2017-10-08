import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = theme => ({
  pellets: {
    position: 'absolute',
  },
  pellet: {
    fill: theme.pellets.color,
  },
  superPellet: {
    fill: theme.pellets.superColor,
  },
});

const Pellet = ({ classes, type, pos: { line, column } }) => {
  const centerX = column * 16 + 8;
  const centerY = line * 16 + 8;
  const radius = type === 'normal' ? 2 : 6;
  const className = type === 'normal' ? classes.pellet : classes.superPellet;
  return <circle cx={centerX} cy={centerY} r={radius} className={className} />;
};

const Pellets = ({ classes, pellets, nbColumns, size: { height, width } }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className={classes.pellets}
      height={height}
      width={width}
    >
      {pellets.map(pellet => (
        <Pellet
          key={pellet.pos.line * nbColumns + pellet.pos.column}
          classes={classes}
          {...pellet}
        />
      ))}
    </svg>
  );
};

Pellets.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.object.isRequired,
  nbColumns: PropTypes.number.isRequired,
  pellets: PropTypes.array.isRequired,
};

export default injectSheet(styles)(Pellets);

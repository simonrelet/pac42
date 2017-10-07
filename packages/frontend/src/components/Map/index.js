import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = theme => ({
  map: {
    fill: theme.walls.fill,
    position: 'absolute',
    stroke: theme.walls.borderColor,
    strokeWidth: theme.walls.borderWidth,
  },
});

const Map = ({ classes, paths, size: { height, width } }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes.map}
      viewBox={`0 0 ${width} ${height}`}
      height={height}
      width={width}
    >
      {paths.map((path, i) => <path key={path} d={path} />)}
    </svg>
  );
};

Map.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.object.isRequired,
  paths: PropTypes.array.isRequired,
};

export default injectSheet(styles)(Map);

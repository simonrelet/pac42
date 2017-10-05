import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Map = ({ paths, size: { height, width } }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="Map"
      viewBox={`0 0 ${width} ${height}`}
      height={height}
      width={width}
      fill="#bdbdbd"
    >
      {paths.map((path, i) => <path key={path} d={path} />)}
    </svg>
  );
};

Map.propTypes = {
  size: PropTypes.object.isRequired,
  paths: PropTypes.array.isRequired,
};

export default Map;

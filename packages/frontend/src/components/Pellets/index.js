import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Pellet = ({ line, column }) => {
  const style = {
    backgroundPositionX: -16 * 7,
    top: line * 16,
    left: column * 16,
  };
  return <div style={style} className="Pellet" />;
};

class Pellets extends PureComponent {
  render() {
    const { size, items } = this.props;
    const style = {
      height: 16 * size.nbLines,
      width: 16 * size.nbColumns,
    };

    return (
      <div className="Pellets" style={style}>
        {items.map(item => (
          <Pellet key={item.line * size.nbColumns + item.column} {...item} />
        ))}
      </div>
    );
  }
}

Pellets.propTypes = {
  size: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

export default Pellets;

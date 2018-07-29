import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = theme => ({
  button: {
    position: 'fixed',
    padding: [6, 12, 4, 12],
    top: 20,
    right: 20,
    border: [2, 'solid', theme.walls.fill],
    borderRadius: 4,
    cursor: 'pointer',
    backgroundColor: theme.background,
    color: theme.color,
    font: 'inherit',
    '&:focus': {
      outline: 'none',
    },
  },
});

const Toogle = ({ classes, children, onChange }) => {
  return (
    <button className={classes.button} onClick={onChange}>
      {children}
    </button>
  );
};

Toogle.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default injectSheet(styles)(Toogle);

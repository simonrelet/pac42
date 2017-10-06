import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socketIO from 'socket.io-client';
import injectSheet from 'react-jss';
import extractWalls from './extractWalls';
import getSVGPaths from './getSVGPaths';
import Map from '../Map';
import Players from '../Players';
import styles from './styles';

const handleJSON = cb => data => cb(JSON.parse(data));

class Game extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    map: null,
    players: [],
    paths: [],
  };

  componentDidMount() {
    const socket = socketIO();

    socket.on(
      'map',
      handleJSON(map => {
        this.setState({
          map,
          paths: getSVGPaths(extractWalls(map.tiles), map.tiles[0].length),
        });
      }),
    );

    socket.on(
      'update',
      handleJSON(({ players }) => {
        this.setState({ players });
      }),
    );
  }

  renderMap() {
    const { map, players, paths } = this.state;
    const { classes } = this.props;
    const nbLines = map.tiles.length;
    const nbColumns = map.tiles[0].length;
    const height = 16 * nbLines;
    const width = 16 * nbColumns;
    const size = { height, width };

    return (
      <div style={size} className={classes.appMap}>
        <Map paths={paths} size={size} />
        <Players size={size} players={players} />
      </div>
    );
  }

  render() {
    const { map, players } = this.state;
    const { classes } = this.props;

    let content;
    if (map && players) {
      content = this.renderMap();
    } else {
      content = <div>Loading...</div>;
    }
    return <div className={classes.app}>{content}</div>;
  }
}

export default injectSheet(styles)(Game);

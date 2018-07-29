import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socketIO from 'socket.io-client';
import changeCase from 'change-case';
import injectSheet from 'react-jss';
import extractWalls from './extractWalls';
import getSVGPaths from './getSVGPaths';
import Toogle from '../Toogle';
import Map from '../Map';
import Pellets from '../Pellets';
import Players from '../Players';

const styles = theme => ({
  game: {
    color: theme.color,
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameMap: {
    margin: [20, 0],
  },
});

const handleJSON = cb => data => cb(JSON.parse(data));

class Game extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onChangeTheme: PropTypes.func.isRequired,
    themeName: PropTypes.string.isRequired,
  };

  state = {
    map: null,
    pellets: [],
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
      handleJSON(({ players, pellets }) => {
        this.setState({ players, pellets });
      }),
    );
  }

  renderMap() {
    const { map, players, paths, pellets } = this.state;
    const { classes } = this.props;
    const nbLines = map.tiles.length;
    const nbColumns = map.tiles[0].length;
    const height = 16 * nbLines;
    const width = 16 * nbColumns;
    const size = { height, width };

    return (
      <div style={size} className={classes.gameMap}>
        <Map paths={paths} size={size} />
        <Pellets pellets={pellets} size={size} nbColumns={nbColumns} />
        <Players players={players} size={size} />
      </div>
    );
  }

  render() {
    const { map, players } = this.state;
    const { classes, onChangeTheme, themeName } = this.props;

    let content;
    if (map && players) {
      content = this.renderMap();
    } else {
      content = <div>Loading...</div>;
    }
    return (
      <div className={classes.game}>
        {content}
        <Toogle onChange={onChangeTheme}>
          {changeCase.sentenceCase(themeName)}
        </Toogle>
      </div>
    );
  }
}

export default injectSheet(styles)(Game);

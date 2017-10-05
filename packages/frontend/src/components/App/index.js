import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import extractWalls from './extractWalls';
import getSVGPaths from './getSVGPaths';
import Map from '../Map';
import Players from '../Players';
import './index.css';

const handleJSON = cb => data => cb(JSON.parse(data));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { map: null, players: [], paths: [] };
  }

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
    const nbLines = map.tiles.length;
    const nbColumns = map.tiles[0].length;
    const height = 16 * nbLines;
    const width = 16 * nbColumns;
    const size = { height, width };

    return (
      <div style={size} className="App-map">
        <Map paths={paths} size={size} />
        <Players size={size} players={players} />
      </div>
    );
  }

  render() {
    const { map, players } = this.state;
    let content;
    if (map && players) {
      content = this.renderMap();
    } else {
      content = <div>Loading...</div>;
    }
    return <div className="App">{content}</div>;
  }
}

export default App;

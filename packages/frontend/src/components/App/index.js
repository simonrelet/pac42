import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import Map from '../Map';
// import Pellets from '../Pellets';
import Players from '../Players';
import './index.css';

const handleJSON = cb => data => cb(JSON.parse(data));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { map: null, players: [] };
  }

  componentDidMount() {
    const socket = socketIO();

    socket.on(
      'map',
      handleJSON(map => {
        this.setState({ map });
      }),
    );

    socket.on(
      'update',
      handleJSON(({ players }) => {
        this.setState({ players });
      }),
    );
  }

  render() {
    const { map, players } = this.state;
    const style = map
      ? {
          height: 16 * map.tiles.length,
          width: 16 * map.tiles[0].length,
        }
      : {};

    return (
      <div className="App">
        <div style={style} className="App-map">
          {map && <Map style={style} tiles={map.tiles} />}
          {/*map && pellets && <Pellets size={map.size} items={pellets} />*/}
          {map && players && <Players style={style} players={players} />}
        </div>
      </div>
    );
  }
}

export default App;

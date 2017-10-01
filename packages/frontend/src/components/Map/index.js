import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Tile = ({ tile, r, c }) => {
  const style = {
    backgroundPositionX: -16 * tile.type,
    top: r * 16,
    left: c * 16,
  };

  return <div style={style} className="Tile-wall" />;
};

class Map extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { style, tiles } = this.props;
    const nbLines = tiles.length;
    const nbColumns = tiles[0].length;

    tiles.forEach((row, r) =>
      row.forEach((tile, c) => {
        if (tile.wall) {
          let type = 0;
          if (r - 1 < 0 || !tiles[r - 1][c].wall) {
            type = 4;
          } else if (r + 1 >= nbLines || !tiles[r + 1][c].wall) {
            type = 1;
          }

          if (c - 1 < 0 || !tiles[r][c - 1].wall) {
            type += 8;
          } else if (c + 1 >= nbColumns || !tiles[r][c + 1].wall) {
            type += 2;
          }

          if (type) {
            switch (type) {
              case 2:
              case 8:
                tile.type = 0;
                break;
              case 1:
              case 4:
                tile.type = 1;
                break;
              case 9:
                tile.type = 2;
                break;
              case 12:
                tile.type = 3;
                break;
              case 6:
                tile.type = 4;
                break;
              case 3:
                tile.type = 5;
                break;
              default:
                break;
            }
            return;
          }

          if (!tiles[r - 1][c - 1].wall) {
            type = 8;
          } else if (!tiles[r + 1][c + 1].wall) {
            type = 2;
          }

          if (!tiles[r - 1][c + 1].wall) {
            type = 4;
          } else if (!tiles[r + 1][c - 1].wall) {
            type = 1;
          }

          switch (type) {
            case 4:
              tile.type = 2;
              break;
            case 2:
              tile.type = 3;
              break;
            case 1:
              tile.type = 4;
              break;
            case 8:
              tile.type = 5;
              break;
            case 0:
            default:
              tile.type = 6;
              break;
          }
        }
      }),
    );

    return (
      <div className="Map" style={style}>
        {tiles.map((row, r) =>
          row.map(
            (tile, c) =>
              tile.wall ? (
                <Tile key={r * nbColumns + c} tile={tile} r={r} c={c} />
              ) : null,
          ),
        )}
      </div>
    );
  }
}

Map.propTypes = {
  style: PropTypes.object.isRequired,
  tiles: PropTypes.array.isRequired,
};

export default Map;

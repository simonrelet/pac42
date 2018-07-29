import React, { Component, Fragment } from 'react'
import DocumentTitle from '../../components/DocumentTitle'
import classes from './Demo.module.scss'
import Pacman from '../../components/Pacman'
import Directions from '../../core/Directions'
// import Ghost from '../../components/Ghost'

function Block({ children }) {
  return (
    <div className={classes.block}>
      <svg
        className={classes.svg}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        {children}
      </svg>
    </div>
  )
}

class Demo extends Component {
  state = {
    pacmanDirection: Directions.all[0],
  }

  handleChangeDirection = e => {
    this.setState({ pacmanDirection: Directions.all[e.target.value] })
  }

  render() {
    return (
      <Fragment>
        <DocumentTitle title="Demo" />
        <div className={classes.root}>
          <Block>
            <Pacman
              pos={{ x: 16, y: 16 }}
              direction={this.state.pacmanDirection}
            />
          </Block>

          <label>
            Direction
            <select
              value={Directions.all.indexOf(this.state.pacmanDirection)}
              onChange={this.handleChangeDirection}
            >
              {Directions.all.map((direction, index) => (
                <option key={direction.toString()} value={index}>
                  {direction.toString()}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Fragment>
    )
  }
}

export default Demo

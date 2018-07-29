import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import './index.scss'
import initializeI18n from './initializeI18n'

initializeI18n()

const moutingPointId = 'root'
const mountingPoint = document.getElementById(moutingPointId)

if (!mountingPoint) {
  throw new Error(
    'The mounting point of the application was not found.' +
      ` Please make sure an element with \`id="${moutingPointId}"\` exist in index.html.`,
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  mountingPoint,
)

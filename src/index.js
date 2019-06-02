import React from 'react'
import ReactDOM from 'react-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './App'
import * as serviceWorker from './serviceWorker'

const StyledApp = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <App />
  </MuiThemeProvider>
)

ReactDOM.render(<StyledApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

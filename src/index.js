import React from 'react';
import {render} from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import registerServiceWorker from './services/registerServiceWorker';

import App from './containers/App';

import './index.css';


injectTapEventPlugin();

const Main = () => (
  <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
    <App />
  </MuiThemeProvider>
);

render(<Main />, document.getElementById('root'));
registerServiceWorker();

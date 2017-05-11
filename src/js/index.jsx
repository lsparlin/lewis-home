require('../less/main.less');

import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import App from './app.jsx'

render((
	<BrowserRouter>
    <Route path="/" component={App}>
    </Route>
  </BrowserRouter>
	), document.getElementById('app')
);


require('../less/main.less');

import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import App from './pages/App.jsx'
import PrismicPage from './pages/PrismicPage.jsx'

let PRISMIC_API = "https://lewismsparlin.prismic.io/api"

render((
	<BrowserRouter>
		<div>
			<PrismicPage prismicApi={PRISMIC_API} />

			<Route path="/" component={App} />
		</div>
  </BrowserRouter>
	), document.getElementById('app')
);


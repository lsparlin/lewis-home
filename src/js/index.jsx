require('../less/main.less');

import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrismicPage from './pages/PrismicPage.jsx'
import NetlifyFooter from './pages/NetlifyFooter.jsx'

let PRISMIC_API = "https://lewismsparlin.prismic.io/api"

const HomePage = () => <PrismicPage prismicApi={PRISMIC_API} />
const FourOFour = () => <h1>NOT FOUND &#128542;</h1>

render((
	<BrowserRouter>
		<div>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route component={FourOFour} />
			</Switch>

			<NetlifyFooter />
		</div>
  </BrowserRouter>
	), document.getElementById('app')
);


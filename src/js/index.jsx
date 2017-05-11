require('../less/main.less');

import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrismicPage from './components/PrismicPage.jsx'
import BlogPostList from './components/BlogPostList.jsx'
import NetlifyFooter from './components/NetlifyFooter.jsx'

// these should come from a configuration
let PRISMIC_API = "https://lewismsparlin.prismic.io/api"
let should404 = false

const HomePage = () => <PrismicPage prismicApi={PRISMIC_API} />
const FourOFour = () => <h1>NOT FOUND &#128542;</h1>

render((
	<BrowserRouter>
		<div>
			<Switch>
				<Route exact={should404} path="/" component={HomePage} />
				<Route component={FourOFour} />
			</Switch>

			<BlogPostList prismicApi={PRISMIC_API} />

			<NetlifyFooter />
		</div>
  </BrowserRouter>
	), document.getElementById('app')
);


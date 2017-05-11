require('../less/main.less');

import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrismicPage from './components/PrismicPage.jsx'
import BlogPostList from './components/BlogPostList.jsx'
import BlogPost from './components/BlogPost.jsx'
import NetlifyFooter from './components/NetlifyFooter.jsx'

// these should come from a configuration
let PRISMIC_API = "https://lewismsparlin.prismic.io/api"
let should404 = false

const HomePage = () => <PrismicPage prismicApi={PRISMIC_API} />

render((
	<BrowserRouter>
		<div>
			<Route path="/" component={HomePage} />

			<Switch>
				<Route exact path="/" render={() => <BlogPostList prismicApi={PRISMIC_API}/>} />
				<Route path="/blog/:uid" render={() => <BlogPost />} />
			</Switch>

			<NetlifyFooter />
		</div>
  </BrowserRouter>
	), document.getElementById('app')
);


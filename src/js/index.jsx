require('../less/main.less');

import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrismicHeader from './components/PrismicHeader.jsx'
import BlogPostList from './components/BlogPostList.jsx'
import BlogPost from './components/BlogPost.jsx'
import NetlifyFooter from './components/NetlifyFooter.jsx'

// these should come from a configuration
let PRISMIC_API = "https://lewismsparlin.prismic.io/api"
let should404 = false

const FourZeroFour = () => <h1>NOT FOUND &#128542;</h1>

render((
	<BrowserRouter>
		<div>
      <PrismicHeader prismicApi={PRISMIC_API} />

			<Switch>
				<Route exact path="/" render={() => <BlogPostList prismicApi={PRISMIC_API}/>} />
				<Route path="/blog/:uid" render={({match}) => <BlogPost uid={match.params.uid} prismicApi={PRISMIC_API}/>} />
        <Route component={FourZeroFour} />
			</Switch>

			<NetlifyFooter />
		</div>
  </BrowserRouter>
	), document.getElementById('app')
);


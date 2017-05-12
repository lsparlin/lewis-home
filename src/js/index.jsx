require('../scss/main.scss');
var config = require('./app.config.json')

import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrismicHeader from './components/PrismicHeader.jsx'
import BlogPostList from './components/BlogPostList.jsx'
import BlogPost from './components/BlogPost.jsx'
import NetlifyFooter from './components/NetlifyFooter.jsx'

// these should come from a configuration
let PRISMIC_API = config.prismicApi

const HomeContent = () => {
  return (
    <div className="row">
      <div className="one-half column">
        <h4> BIO here</h4>
        <hr/>
      </div>
      <div className="one-half column">
        <BlogPostList prismicApi={PRISMIC_API} />
      </div>
    </div>
  )
}
const FourZeroFour = () => <h1>NOT FOUND &#128542;</h1>

render((
	<BrowserRouter>
		<div>
      <PrismicHeader prismicApi={PRISMIC_API} />

			<Switch>
				<Route exact path="/" render={HomeContent} />
				<Route path="/blog/:uid" render={({match}) => <BlogPost uid={match.params.uid} prismicApi={PRISMIC_API}/>} />
        <Route component={FourZeroFour} />
			</Switch>

			<NetlifyFooter />
		</div>
  </BrowserRouter>
	), document.getElementById('app')
);


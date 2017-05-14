require('../style/skeleton.css')
require('../style/normalize.css')
require('../scss/main.scss');
var config = require('./app.config.json')

import React from 'react';
import {render} from 'react-dom';

import PrismicHome from './components/PrismicHome.jsx'
import NetlifyFooter from './components/NetlifyFooter.jsx'

// these should come from a configuration
let PRISMIC_API = config.prismicApi

render((
    <div>
      <PrismicHome prismicApi={PRISMIC_API} />

      <NetlifyFooter />
    </div>
  ), document.getElementById('app')
);

setTimeout(() => { window.prerenderReady = true}, 1500);

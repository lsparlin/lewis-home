require('../style/normalize.css')
require('../style/skeleton.css')
require('../style/custom-bootstrap.min.css')
require('../style/prism.css')
require('../scss/main.scss');

import React from 'react';
import {render} from 'react-dom';

import HomePage from './components/HomePage'

function prerenderIsReady() {
  setTimeout(() => { window.prerenderReady = true }, 250)
}

render((
    <div>
      <HomePage onReady={prerenderIsReady} />
    </div>
  ), document.getElementById('app')
);


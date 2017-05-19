require('../style/normalize.css')
require('../style/skeleton.css')
require('../style/custom-bootstrap.min.css')
require('../scss/main.scss');

import React from 'react';
import {render} from 'react-dom';

import PrismicHome from './components/PrismicHome.jsx'

render((
    <div>
      <PrismicHome />

    </div>
  ), document.getElementById('app')
);

setTimeout(() => { window.prerenderReady = true}, 1500);

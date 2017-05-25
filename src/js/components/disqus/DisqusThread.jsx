import React from 'react';

import Disqus from '../../disqus'

export default (props) => {
  Disqus.initDisqus({
    url: props.url,
    identifier: props.identifier,
    title: props.title
  })

  return (<div id="disqus_thread"></div>)
}


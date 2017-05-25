import React from 'react';

import Disqus from '../../disqus'

export default (props) => {
  if (!ENV.disqusShortname) {
    return null
  }

  Disqus.initDisqus({
    shortname: props.shortname,
    url: props.url,
    identifier: props.identifier,
    title: props.title
  })

  return (<div id="disqus_thread"></div>)
}


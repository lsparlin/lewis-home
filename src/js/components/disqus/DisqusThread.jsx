import React from 'react';
import ReactDisqusComments from 'react-disqus-comments';

export default (props) => {
  if (!ENV.disqusShortname) {
    return null
  } else {
    return ( <ReactDisqusComments 
      shortname={props.shortname}
      url={props.url}
      identifier={props.identifier}
      title={props.title}
    /> )
  }
}


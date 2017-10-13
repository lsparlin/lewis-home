import React from 'react';

import {NotFound} from 'components/status'
import {BlogPost} from 'components/document-types'

const pageConfig = ENV.config.prismicPageMapping

const DocumentPage = (props) => {
  return (
    <div className="DocumentPage">
      { chooseView(props.type, props.uid) }
    </div>
  )
}

function chooseView(type, uid)  { 
  if (type === pageConfig.blogPost.customType) return (<BlogPost uid={uid} />)
  else return (<NotFound />)
}

export default DocumentPage

import React from 'react';
import { Link } from 'react-router-dom';

import StructuredText from './prismic/StructuredText.jsx'
import PrismicHelper from './prismic/PrismicHelper.jsx'

const blogConfig = ENV.config.prismicPageMapping.blogPost

const BlogListing = (props) => {
  let blogDoc = Object.assign({}, {uid: props.blogDoc.uid},
    PrismicHelper.stateObjectFromFragment(blogConfig, props.blogDoc.fragments, 'listProperties') )

  return(
    <div className="BlogListing">
      <div key={blogDoc.uid} className="blog-link">
        <Link to={'/blog/' + blogDoc.uid}> <StructuredText value={blogDoc.title} /> </Link>
        <StructuredText value={blogDoc.subTitle} />
      </div>
    </div>
  )
}

export default BlogListing

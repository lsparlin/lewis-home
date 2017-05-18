import React from 'react';
import { Link } from 'react-router-dom';

import StructuredText from './prismic/StructuredText.jsx'

const blogConfig = ENV.config.prismicPageMapping.blogPost

const BlogListing = (props) => {
  let blogDoc = {uid: props.blogDoc.uid}
  blogConfig.listProperties.forEach(prop => blogDoc[prop.name] = props.blogDoc.fragments[blogConfig.customType + '.' + prop.apiName])
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

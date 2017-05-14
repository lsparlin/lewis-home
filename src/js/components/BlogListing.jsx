import React from 'react';
import { Link } from 'react-router-dom';

import StructuredText from './prismic/StructuredText.jsx'

const BlogListing = (props) => {
    let blogDoc = props.blogDoc
    return(
      <div className="BlogListing">
        <div key={blogDoc.uid} className="blog-link">
          <Link to={'/blog/' + blogDoc.uid}> <StructuredText value={blogDoc.fragments['blog-post.title']} /> </Link>
          <StructuredText value={blogDoc.fragments['blog-post.subtitle']} />
        </div>
      </div>
    )
}

export default BlogListing

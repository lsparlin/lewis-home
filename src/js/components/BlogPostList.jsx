import React from 'react';

import BlogListing from './BlogListing.jsx'
import {queryByDocType} from './prismic/PrismicHelper.jsx'

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentWillMount() {
    queryByDocType('blog-post', 'ordered', ['blog-post.title', 'blog-post.subtitle'])
      .then(results => this.setState({loading: false, blogDocuments: results}) )
  }

  render () {
    if (this.state.loading) {
      return(
      <div>Loading Blogs...</div>
      )
    }
    return(
      <div className="BlogPostList">
        <h4>Most Recent Writings</h4>
        <hr />
        <div className="blog-list">
          { this.state.blogDocuments.map( (blogDoc) => (<BlogListing key={blogDoc.uid} blogDoc={blogDoc} />) )}
        </div>
      </div>
    )
  }
}

export default BlogPostList

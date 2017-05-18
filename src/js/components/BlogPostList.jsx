import React from 'react';

import BlogListing from './BlogListing.jsx'
import PrismicHelper from './prismic/PrismicHelper.jsx'

var blogConfig = ENV.config.prismicPageMapping.blogPost

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentWillMount() {
    let limitToProperties = blogConfig.listProperties.map(prop => blogConfig.customType + '.' + prop.apiName)
    PrismicHelper.queryByDocType(blogConfig.customType, 'ordered', limitToProperties)
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

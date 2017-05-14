var Prismic = require('prismic.io');
import React from 'react';

import BlogListing from './BlogListing.jsx'

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
    this.prismicApi = props.prismicApi
  }

  componentWillMount() {
    var blogData = {}
    Prismic.api(this.prismicApi).then((api) => {
      api.query(Prismic.Predicates.at('document.type', 'blog-post'),
        {'orderings': '[document.last_publication_date desc]', 'fetch': ['blog-post.title', 'blog-post.subtitle']}
      ).then((blogResponse) => {
        if (blogResponse.results_size) {
          blogData.loading = false
          blogData.blogDocuments = blogResponse.results
          this.setState(blogData)
        }
      })
    })
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

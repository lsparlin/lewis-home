var Prismic = require('prismic.io');
import React from 'react';

import BlogListing from './BlogListing.jsx'

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, tagName: props.tagName};
    this.prismicApi = props.prismicApi
  }

  componentWillMount() {
    var blogData = {}
    Prismic.api(this.prismicApi).then((api) => {
      api.query(Prismic.Predicates.at('document.tags', [this.state.tagName]),
        {'orderings': '[document.last_publication_date desc]'}
      ).then((docResponse) => {
        blogData.loading = false
        blogData.documents = docResponse.results
        this.setState(blogData)
      })
    })
  }

  render () {
    if (this.state.loading) {
      return(
      <div>Loading Docs tagged with [{this.state.tagName}]...</div>
      )
    }
    return(
      <div className="Tag">
        <h4>Tag: <span className="label label-default">{this.state.tagName}</span></h4>
        <hr />
        <div className="tagged-list">
          { this.state.documents.map( (doc) => (<BlogListing key={doc.uid} blogDoc={doc} />) )}
        </div>
      </div>
    )
  }
}

export default BlogPostList

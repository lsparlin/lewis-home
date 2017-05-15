var Prismic = require('prismic.io');
import React from 'react';

import BlogListing from './BlogListing.jsx'
import {queryAt} from './prismic/PrismicHelper.jsx'

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, tagName: props.tagName};
  }

  componentWillMount() {
    queryAt('document.tags', [this.state.tagName], 'ordered')
      .then(results => this.setState({loading: false, documents: results}) )
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

import React from 'react';
import { Helmet } from 'react-helmet';

import BlogListing from './BlogListing.jsx'
import PrismicHelper from './prismic/PrismicHelper.jsx'

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, tagName: props.tagName};
  }

  componentWillMount() {
    PrismicHelper.queryAt('document.tags', [this.state.tagName], 'ordered')
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
        <Helmet>
          <title>{'Tagged with ' + this.state.tagName.toUpperCase()}</title>
        </Helmet>

        <h4>Tag: <span className="label label-default">{this.state.tagName}</span></h4>
        <hr />
        <div className="tagged-list">
          { this.state.documents.map( (doc) => (<BlogListing key={doc.uid} blogDoc={doc} />) )}
        </div>
      </div>
    )
  }
}

export default Tag

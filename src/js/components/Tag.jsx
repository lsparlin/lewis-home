import React from 'react';
import { Helmet } from 'react-helmet';

import TitleSubTitleListing from './TitleSubTitleListing'
import PrismicHelper from './prismic/PrismicHelper'

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, tagName: props.tagName};
  }

  componentWillMount() {
    PrismicHelper.queryAt('document.tags', [this.state.tagName], 'ordered', false, 10)
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
          { this.state.documents.map( (doc) => (<TitleSubTitleListing key={doc.uid} doc={doc} type={appTypeFromPrismicType(doc.type)} />) )}
        </div>
      </div>
    )
  }
}

function appTypeFromPrismicType(prismicType) {
  let prismicMapping = ENV.config.prismicPageMapping
  let foundType = Object.keys(prismicMapping)
    .find(key => prismicMapping[key].customType && prismicMapping[key].customType === prismicType)
  return foundType || 'blogPost'
}

export default Tag

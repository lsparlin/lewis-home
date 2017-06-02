import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; 

import TitleSubTitleListing from './TitleSubTitleListing'
import PrismicHelper from './common/PrismicApiHelper'

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title || 'Recent Writings'
    this.type = props.type
    this.docTypeConfig = ENV.config.prismicPageMapping[props.type]
    this.state = {documents: null}
  }

  componentWillMount() {
    let limitToProperties = this.docTypeConfig.listProperties && 
      this.docTypeConfig.listProperties.map(prop => this.docTypeConfig.customType + '.' + prop.apiName)

    PrismicHelper.queryByDocType(this.docTypeConfig.customType, 'ordered', limitToProperties, this.docTypeConfig.pageSize)
      .then(results => this.setState({documents: results}) )
  }

  render () {
    return (
      <div className="DocumentList">
        <h4 className="column-title">{this.title}</h4>
        <hr />
        <div className="document-list">
          <CSSTransitionGroup
            transitionName="easein"
            transitionAppear={true}
            transitionAppearTimeout={300}
            transitionEnter={false}
            transitionLeave={false} >
            { this.state.documents &&
                this.state.documents.map( (doc) => (<TitleSubTitleListing key={doc.uid} doc={doc} type={this.type}/>) )
            }
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default DocumentList

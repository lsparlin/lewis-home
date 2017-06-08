import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; 

import TitleSubTitleListing from './TitleSubTitleListing'
import PrismicHelper from './prismic/PrismicHelper'

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title || 'Recent Writings'
    this.type = props.type
    this.docTypeConfig = ENV.config.prismicPageMapping[props.type]
    this.state = {documents: null, categoryTags: props.categoryTags}
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
            { this.state.documents && categorizedDocuments(this.state.documents, this.type, this.state.categoryTags) }
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
}

const categorizedDocuments = (documents, type, categoryTags) => {
  if (!categoryTags.length) {
    return documents.map( doc => (<TitleSubTitleListing key={doc.uid} doc={doc} type={type}/>) )
  } 

  return [...categoryTags, ''].map( tag => {
    let categoryName = tag ? tag.replace(ENV.config.categoryTagPrefix, '') : 'misc.'
    let documentsInCategory = documents.filter(doc => documentIsInCategory(doc, tag))

    if (!documentsInCategory.length) { return null }
    return (
      <div key={tag} className="document-category">
        <h5 className="document-category-name">on {categoryName}</h5>
        { documentsInCategory.map( doc => <TitleSubTitleListing key={doc.uid} doc={doc} type={type}/> ) }
      </div>
    )
  })
}

const documentIsInCategory = (doc, tag) => {
  if (tag) { return doc.tags.includes(tag) }
  else { return !doc.tags.find(docTag => docTag.startsWith(ENV.config.categoryTagPrefix)) }
}

export default DocumentList

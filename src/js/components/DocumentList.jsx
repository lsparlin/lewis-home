import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; 

import TitleSubTitleListing from 'components/TitleSubTitleListing'
import {PrismicHelperV2} from 'prismic'

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title || 'Recent Writings'
    this.type = props.type
    this.docTypeConfig = ENV.config.prismicPageMapping[props.type]
    this.state = {documents: null, categoryTags: props.categoryTags}
  }

  componentDidMount() {
    let limitToProperties = this.docTypeConfig.listProperties && 
      this.docTypeConfig.listProperties.map(prop => this.docTypeConfig.customType + '.' + prop.apiName)

    PrismicHelperV2.queryByDocType(this.docTypeConfig.customType, 'ordered', limitToProperties, this.docTypeConfig.pageSize)
      .then(results => this.setState({documents: results}) )
  }

  render () {
    return (
      <div className="DocumentList page-block">
        <h1 className="column-title">{this.title}</h1>
        <div className="document-list row">
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
    return documents.map( doc => (<TitleSubTitleListing doc={doc} type={type} key={doc.uid} className="four columns"/>) )
  } 

  return [...categoryTags, ''].map( tag => {
    let categoryName = tag ? tag.replace(ENV.config.categoryTagPrefix, '') : 'misc.'
    let documentsInCategory = documents.filter(doc => documentIsInCategory(doc, tag))

    if (!documentsInCategory.length) { return null }
    return (
      <div key={tag} className="document-category row">
        <h4 className="document-category-name">on {categoryName}</h4>
        { documentsInCategory.map( doc => <TitleSubTitleListing doc={doc} type={type} key ={doc.uid} className="four columns"/> ) }
      </div>
    )
  })
}

const documentIsInCategory = (doc, tag) => {
  if (tag) { return doc.tags.includes(tag) }
  else { return !doc.tags.find(docTag => docTag.startsWith(ENV.config.categoryTagPrefix)) }
}

export default DocumentList

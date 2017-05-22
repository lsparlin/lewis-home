import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; 

import BlogListing from './BlogListing.jsx'
import PrismicHelper from './prismic/PrismicHelper.jsx'

var blogConfig = ENV.config.prismicPageMapping.blogPost

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {blogDocuments: null}
  }

  componentWillMount() {
    let limitToProperties = blogConfig.listProperties.map(prop => blogConfig.customType + '.' + prop.apiName)
    PrismicHelper.queryByDocType(blogConfig.customType, 'ordered', limitToProperties)
      .then(results => this.setState({blogDocuments: results}) )
  }

  render () {
    return (
      <div className="BlogPostList">
        <h4>Recent Writings</h4>
        <hr />
        <div className="blog-list">
          <CSSTransitionGroup
            transitionName="easein"
            transitionAppear={true}
            transitionAppearTimeout={300}
            transitionEnter={false}
            transitionLeave={false} >
            { this.state.blogDocuments &&
                this.state.blogDocuments.map( (blogDoc) => (<BlogListing key={blogDoc.uid} blogDoc={blogDoc} />) )
            }
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default BlogPostList

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
var dateFormat = require('dateformat');

import StructuredText from './prismic/StructuredText.jsx'
import SliceZone from './prismic/SliceZone.jsx'
import PrismicHelper from './prismic/PrismicHelper.jsx'

const blogConfig = ENV.config.prismicPageMapping.blogPost

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true}
    this.blogUID = props.uid
  }

  componentWillMount() {
    PrismicHelper.queryByTypeAndUid(blogConfig.customType, this.blogUID).then(blogDocument => {
      let propsFromFragments = PrismicHelper.stateObjectFromFragment(blogConfig, blogDocument.fragments)
      this.setState( Object.assign({}, propsFromFragments,
        {loading: false, url: ENV.url, uid: this.blogUID, tags: blogDocument.tags, date: blogDocument.firstPublicationDate})
      )
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <div></div>
      )
    }
    return(
      <div className="BlogPost">
        <Helmet>
          <title>{'Blog: ' + this.state.title.blocks[0].text}</title>
          { this.state.shortDescriptionTextOnly &&
              <meta name="description" content={this.state.shortDescriptionTextOnly} /> 
          }
          <meta property="og:url" content={this.state.url + '/blog/' + this.state.uid} />
          <meta property="og:type" content="article" />
          <meta name="twitter:title" content={this.state.titleTextOnly} />
          <meta property="og:title" content={this.state.titleTextOnly} />
          <meta name="twitter:description" content={this.state.subTitleTextOnly} />
          <meta property="og:description" content={this.state.subTitleTextOnly} />
        </Helmet>

        <ReactCSSTransitionGroup
          transitionName="home"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnter={false}
          transitionLeave={false} >
          <StructuredText value={this.state.title} />
          <StructuredText value={this.state.subTitle} />
          <div>
            <span className="publish-date">{dateFormat(this.state.date, 'mediumDate')}</span>
            { this.state.tags.map((tagName) => (
              <Link key={tagName} to={'/tag/' + tagName}> 
                <span className="label label-default margin-h-1m">{tagName}</span> 
              </Link>
              )
            )}
          </div>
          <hr />

          <div className="blog-content">
            { this.state.blogBody ? <SliceZone value={this.state.blogBody} /> : 
                <StructuredText value={this.state.blogContent} /> }
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default BlogPost

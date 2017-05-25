import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; 
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
var dateFormat = require('dateformat');

import NotFound from '../../NotFound'
import StructuredText from '../StructuredText'
import { imageBackgroundStyle } from '../Image'
import SliceZone from '../SliceZone'
import PrismicHelper from '../PrismicHelper'

const blogConfig = ENV.config.prismicPageMapping.blogPost

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true}
    this.blogUID = props.uid

    this.renderMetaTags = this.renderMetaTags.bind(this)
  }

  componentWillMount() {
    PrismicHelper.queryByTypeAndUid(blogConfig.customType, this.blogUID).then(blogDocument => {
      if (!blogDocument) {
        this.setState({loading: false})
      } else {
        let propsFromFragments = PrismicHelper.stateObjectFromFragment(blogConfig, blogDocument.fragments)
        this.setState( Object.assign({}, propsFromFragments,
          {loading: false, url: ENV.url, uid: this.blogUID, tags: blogDocument.tags, date: blogDocument.firstPublicationDate})
        )
      }
    })
  }

  render () {
    if (this.state.loading) {
      return ( <div></div> )
    } else if (!this.state.title) {
      return ( <NotFound /> )
    }
    return (
      <div className="BlogPost">
        { this.renderMetaTags() }
        <CSSTransitionGroup
          transitionName="easein"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnter={false}
          transitionLeave={false} >
          <div className="blog-post-hero-header" style={imageBackgroundStyle(this.state.titleImage, this.state.titleColorOnImageTextOnly)}> 
            <div className="hero-text">
            <StructuredText value={this.state.title} />
            <StructuredText value={this.state.subTitle} color={this.state.subTitleColorOnImageTextOnly} />
            </div>
          </div>
          <div className="tags margin-left-2p">
            <span className="publish-date">{dateFormat(this.state.date, 'mediumDate')}</span>
            { this.state.tags.map(tagName =>
              <Link key={tagName} to={'/tag/' + tagName}> 
                <span className="label label-default margin-h-1m">{tagName}</span> 
              </Link> )
            }
          </div>

          <article className="blog-content">
            <SliceZone value={this.state.blogBody} /> 
          </article>
        </CSSTransitionGroup>
      </div>
    )
  }

  renderMetaTags() {
    return (
      <Helmet>
        <title>{this.state.title.blocks[0].text}</title>
        { this.state.shortDescriptionTextOnly &&
            <meta name="description" content={this.state.shortDescriptionTextOnly} /> 
        }
        { this.state.titleImage &&
            <meta name="twitter:card" content="summary_large_image" /> }
        { this.state.titleImage &&
            <meta name="twitter:image" content={this.state.titleImage.main.url} /> }
        { this.state.titleImage &&
            <meta property="og:image" content={this.state.titleImage.main.url} /> }
        <meta property="og:url" content={this.state.url + '/blog/' + this.state.uid} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={this.state.titleTextOnly} />
        <meta property="og:title" content={this.state.titleTextOnly} />
        <meta name="twitter:description" content={this.state.subTitleTextOnly} />
        <meta property="og:description" content={this.state.subTitleTextOnly} />
        <link rel="canonical" href={ENV.url + blogConfig.documentRoute + this.blogUID} />
      </Helmet>
    )
  }

}

export default BlogPost

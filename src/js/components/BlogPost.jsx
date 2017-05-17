import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
var dateFormat = require('dateformat');

import StructuredText from './prismic/StructuredText.jsx'
import {queryByTypeAndUid} from './prismic/PrismicHelper.jsx'

let contentType = 'blog-post'
let blogProperties = ['title', 'subtitle', 'content']

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true}
    this.blogUID = props.uid
  }

  componentWillMount() {
    queryByTypeAndUid(contentType, this.blogUID).then(blogDocument => {
      var blog = {loading: false, tags: blogDocument.tags, date: blogDocument.firstPublicationDate}
      blogProperties.forEach(property => blog[property] = blogDocument.fragments[contentType + '.' + property])
      blog.blogTitle = blog.title.blocks[0].text
      blog.blogSubtitle = blog.subtitle.blocks[0].text
      blog.blogContent = blog.content.blocks[0].text + '...'
      this.setState(blog)
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
          <meta name="twitter:title" content={this.state.blogTitle + ': ' + this.state.blogSubtitle} />
          <meta property="og:title" content={this.state.blogTitle + ': ' + this.state.blogSubtitle} />
          <meta name="twitter:description" content={this.state.blogContent} />
          <meta property="og:description" content={this.state.blogContent} />
        </Helmet>

        <StructuredText value={this.state.title} />
        <StructuredText value={this.state.subtitle} />
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

        <StructuredText value={this.state.content} />
      </div>
    )
  }
}

export default BlogPost

var Prismic = require('prismic.io');
import React from 'react';
import { Link } from 'react-router-dom';

import StructuredText from './prismic/StructuredText.jsx'
import {queryByTypeAndUid} from './prismic/PrismicHelper.jsx'

let contentType = 'blog-post'
let blogProperties = ['title', 'subtitle', 'content']

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true}
    this.blogUID = props.uid
    this.prismicApi = props.prismicApi
  }

  componentWillMount() {
    queryByTypeAndUid(contentType, this.blogUID).then(blogDocument => {
      var blog = {loading: false, tags: blogDocument.tags}
      blogProperties.forEach(property => blog[property] = blogDocument.fragments[contentType + '.' + property])
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
        <StructuredText value={this.state.title} />
        <StructuredText value={this.state.subtitle} />
        { this.state.tags.map((tagName) => (
          <Link key={tagName} to={'/tag/' + tagName}> 
            <span className="label label-default margin-h-1m">{tagName}</span> 
          </Link>
          )
        )}
        <hr />

        <StructuredText value={this.state.content} />
      </div>
    )
  }
}

export default BlogPost

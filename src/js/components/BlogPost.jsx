var Prismic = require('prismic.io');
import React from 'react';

import StructuredText from './prismic/StructuredText.jsx'

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
    var blog = {}
    Prismic.api(this.prismicApi).then((api) => {
      api.getByUID(contentType, this.blogUID).then((blogResponse) => {
        blog.loading = false
        blogProperties.forEach((property) => blog[property] = blogResponse.fragments[contentType + '.' + property])
        blog.tags = blogResponse.tags
        this.setState(blog)
        console.log(this.state)
      })
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
        { this.state.tags.map((tagName) => <span className="label label-default margin-h-1m" key={tagName}>{tagName}</span> ) }
        <hr />

        <StructuredText value={this.state.content} />
      </div>
    )
  }
}

export default BlogPost

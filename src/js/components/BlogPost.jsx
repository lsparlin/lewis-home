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
        blogProperties.forEach((property) => blog[property] = blogResponse.data[contentType + '.' + property])
     	  this.setState(blog)
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
        <hr />

        <StructuredText value={this.state.content} />
      </div>
    )
  }
}

export default BlogPost

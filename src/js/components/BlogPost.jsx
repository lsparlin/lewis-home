var Prismic = require('prismic.io');
import React from 'react';

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
      <div>
			  <h1>{this.state.title.value[0].text}</h1>
        <h3>{this.state.subtitle.value[0].text}</h3>

        { this.state.content.value.map((value, index) => <p key={index}>{value.text}</p>) }
      </div>
    )
  }
}

export default BlogPost

var Prismic = require('prismic.io');
import React from 'react';
import { Link } from 'react-router-dom';

let contentType = 'blog-post'

class BlogPostList extends React.Component {
	constructor(props) {
    super(props);
    this.state = {loading: true};
		this.prismicApi = props.prismicApi
  }

  componentWillMount() {
    var blogData = {}
    Prismic.api(this.prismicApi).then((api) => {
      api.query(Prismic.Predicates.at('document.type', 'blog-post')).then((blogResponse) => {
				if (blogResponse.results_size) {
        	blogData.loading = false
					blogData.blogDocuments = blogResponse.results
					console.log(blogData)
        	this.setState(blogData)
				}
      })
    })
  }

  render () {
    if (this.state.loading) {
      return(
      <div>Loading Blogs...</div>
      )
    }
    return(
      <div>
				<ul>
					{ this.state.blogDocuments.map( (blogDoc) => {
						let uid = blogDoc.uid
						return (<li key={uid}> <Link to={'blog/' + uid}>{blogDoc.data['blog-post.title'].value[0].text}</Link> </li>)
						})
				 	}
				</ul>
      </div>
    )
  }
}

export default BlogPostList

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
      api.query(Prismic.Predicates.at('document.type', 'blog-post'),
        {'orderings': '[document.last_publication_date desc]', 'fetch': ['blog-post.title', 'blog-post.subtitle']}
      ).then((blogResponse) => {
				if (blogResponse.results_size) {
        	blogData.loading = false
					blogData.blogDocuments = blogResponse.results
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
      <div className="BlogPostList">
        <h2>Stuff I've Written</h2>
        <hr />
				<div className="blog-list">
					{ this.state.blogDocuments.map( (blogDoc) => {
						let uid = blogDoc.uid
						return (
              <div className="blog-link">
                <h4 key={uid}> <Link to={'blog/' + uid}>{blogDoc.data['blog-post.title'].value[0].text}</Link> <br/>
                  <small>{blogDoc.data['blog-post.subtitle'].value[0].text}</small>
                </h4>
              </div>
            )
						})
				 	}
				</div>
      </div>
    )
  }
}

export default BlogPostList

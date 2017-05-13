var Prismic = require('prismic.io');
import React from 'react';
import { Link } from 'react-router-dom';

import StructuredText from './prismic/StructuredText.jsx'

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
        <h4>Most Recent Writings</h4>
        <hr />
        <div className="blog-list">
          { this.state.blogDocuments.map( (blogDoc) => {
            let uid = blogDoc.uid
            return (
              <div key={uid} className="blog-link">
                <Link to={'blog/' + uid}> <StructuredText value={blogDoc.fragments['blog-post.title']} /> </Link>
                <StructuredText value={blogDoc.fragments['blog-post.subtitle']} />
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

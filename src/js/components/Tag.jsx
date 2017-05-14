var Prismic = require('prismic.io');
import React from 'react';
import { Link } from 'react-router-dom';

import StructuredText from './prismic/StructuredText.jsx'

let contentType = 'blog-post'

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {loading: true, tagName: props.tagName};
    this.prismicApi = props.prismicApi
  }

  componentWillMount() {
    var blogData = {}
    Prismic.api(this.prismicApi).then((api) => {
      api.query(Prismic.Predicates.at('document.tags', [this.state.tagName]),
        {'orderings': '[document.last_publication_date desc]'}
      ).then((docResponse) => {
        if (docResponse.results_size) {
          blogData.loading = false
          blogData.documents = docResponse.results
          this.setState(blogData)
        }
      })
    })
  }

  render () {
    if (this.state.loading) {
      return(
      <div>Loading Docs tagged with [{this.state.tagName}...</div>
      )
    }
    return(
      <div className="Tag">
        <h4>Tag: <span className="label label-default">{this.state.tagName}</span></h4>
        <hr />
        <div className="tagged-list">
          { this.state.documents.map( (doc) => {
            let uid = doc.uid
            return (
              <div key={uid} className="blog-link">
                <Link to={'/blog/' + uid}> <StructuredText value={doc.fragments['blog-post.title']} /> </Link>
                <StructuredText value={doc.fragments['blog-post.subtitle']} />
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

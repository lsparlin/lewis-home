var Prismic = require('prismic.io');
import React from 'react';

let contentType = 'page'
let prismicProps = ['title', 'subtitle', 'content']

class PrismicPage extends React.Component {
	constructor(props) {
    super(props);
    this.state = {loading: true};
		this.prismicApi = props.prismicApi
  }

  componentWillMount() {
    var pageContent = {}
    Prismic.api(this.prismicApi).then((api) => {
      api.getByUID('page', 'home').then((homeResponse) => {
        pageContent.loading = false
        prismicProps.forEach((prismicProperty) => {
          pageContent[prismicProperty] =  homeResponse.data['page.' + prismicProperty].value[0].text
        })
        this.setState(pageContent)
      })
    })
  }

  render () {
    if (this.state.loading) {
      return(
      <div></div>
      )
    }
    return(
      <div>
        <div className="jumbotron">
            <h1>{this.state.title}</h1>

            <p>{this.state.subtitle}</p>
        </div>
        <div>
          <p> {this.state.content}</p>
        </div>
      </div>
    )
  }
}

export default PrismicPage

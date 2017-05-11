var Prismic = require('prismic.io');
import React from 'react';

let contentType = 'site-header'
let pageProps = ['title', 'subtitle']

class PrismicHeader extends React.Component {
	constructor(props) {
    super(props);
    this.state = {loading: true};
		this.prismicApi = props.prismicApi
  }

  componentWillMount() {
    var pageContent = {}
    Prismic.api(this.prismicApi).then((api) => {
      api.getByUID(contentType, 'lewismsparlin-header').then((homeResponse) => {
        pageContent.loading = false
        pageProps.forEach((prismicProperty) => {
          pageContent[prismicProperty] =  homeResponse.data[contentType + '.' + prismicProperty].value[0].text
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
      <div className="PrismicHeader">
        <div className="jumbotron">
            <h1>{this.state.title}</h1>

            <p>{this.state.subtitle}</p>
        </div>
      </div>
    )
  }
}

export default PrismicHeader

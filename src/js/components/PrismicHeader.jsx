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
          pageContent[prismicProperty] =  homeResponse.fragments[contentType + '.' + prismicProperty].blocks[0].text
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
      <section className="PrismicHeader">
        <h1> <a href="/">{this.state.title}</a> </h1>

        <h5>{this.state.subtitle}</h5>
      </section>
    )
  }
}

export default PrismicHeader

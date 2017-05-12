var Prismic = require('prismic.io');
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BlogPostList from './BlogPostList.jsx'
import BlogPost from './BlogPost.jsx'

let contentType = 'site-header'
let pageProps = ['title', 'subtitle', 'bio']

class PrismicHome extends React.Component {
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
      <div className="PrismicHome">
        <section className="page-heading">
          <h1> <a href="/">{this.state.title}</a> </h1>

          <h5>{this.state.subtitle}</h5>
        </section>
	      <BrowserRouter>
	      	<Switch>
	      		<Route exact path="/" render={() => <HomeContent prismicApi={this.prismicApi} bio={this.state.bio} />} />
	      		<Route path="/blog/:uid" render={({match}) => <BlogPost uid={match.params.uid} prismicApi={this.prismicApi}/>} />
            <Route component={FourZeroFour} />
	      	</Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const HomeContent = (props) => (
  <div className="row">
    <div className="one-half column">
      <h4> BIO here</h4>
      <hr/>
      <p>{props.bio}</p>
    </div>
    <div className="one-half column">
      <BlogPostList prismicApi={props.prismicApi} />
    </div>
  </div>
)
const FourZeroFour = () => <h1>NOT FOUND &#128542;</h1>

export default PrismicHome

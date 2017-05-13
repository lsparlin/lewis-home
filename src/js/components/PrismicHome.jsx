var Prismic = require('prismic.io');
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BlogPostList from './BlogPostList.jsx'
import BlogPost from './BlogPost.jsx'
import StructuredText from './prismic/StructuredText.jsx'
import SocialLink from './prismic/SocialLink.jsx'

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
		var socialLinks = { links: [] }
    Prismic.api(this.prismicApi).then((api) => {
      api.getByUID(contentType, 'lewismsparlin-header').then((homeResponse) => {
        pageContent.loading = false
        pageProps.forEach((prismicProperty) => { pageContent[prismicProperty] = homeResponse.fragments[contentType + '.' + prismicProperty] })
        this.setState(pageContent)
      })
			api.query(Prismic.Predicates.at('document.type', 'social-link')).then((linkResponse) => {
				socialLinks.links = linkResponse.results.map((doc) => doc.fragments)
				this.setState(socialLinks)
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
          <a href="/"> <StructuredText value={this.state.title}/> </a>

          <StructuredText value={this.state.subtitle} />
					<div className="align-center">
						{ this.state.links && this.state.links.map((link, index) => 
								<span key={index} className="margin-h-1m"> <SocialLink fragment={link} multiplier={2} /> </span>) 
						}
					</div>
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
  <div className="HomeContent row">
    <div className="five columns">
      <h4> Quick Intro</h4>
      <hr/>
      <StructuredText value={props.bio} />
    </div>
    <div className="seven columns">
      <BlogPostList prismicApi={props.prismicApi} />
    </div>
  </div>
)
const FourZeroFour = () => <h1>NOT FOUND &#128542;</h1>

export default PrismicHome

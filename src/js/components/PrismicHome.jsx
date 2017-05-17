import Prismic from 'prismic.io';
import React from 'react';
import {Helmet} from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SocialLink from './prismic/SocialLink.jsx'
import BlogPostList from './BlogPostList.jsx'
import BlogPost from './BlogPost.jsx'
import Tag from './Tag.jsx'
import StructuredText from './prismic/StructuredText.jsx'
import {queryByTypeAndUid, queryByDocType} from './prismic/PrismicHelper.jsx'

let contentType = 'site-header'
let pageProps = ['title', 'subtitle', 'bio']

class PrismicHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentWillMount() {
    queryByTypeAndUid(contentType, 'lewismsparlin-header').then(homeDoc => {
      var pageContent = {loading: false}
      pageProps.forEach((prismicProperty) => { pageContent[prismicProperty] = homeDoc.fragments[contentType + '.' + prismicProperty] })
      pageContent.siteTitle = pageContent.title.blocks[0].text
      this.setState(pageContent)
    })
    queryByDocType('social-link')
      .then(results => results.map(doc => doc.fragments) )
      .then(fragments => { this.setState({links: fragments}) })
  }

  render () {
    if (this.state.loading) {
      return(
      <div></div>
      )
    }
    return(
      <div className="PrismicHome">
        <Helmet titleTemplate={'%s | ' + this.state.siteTitle}>
          <title>Home</title>
        </Helmet>

        <section className="page-heading">
          <a href="/"> <StructuredText value={this.state.title}/> </a>

          <div>
            { this.state.links && this.state.links.map((link, index) => 
                <span key={index} className="margin-h-1m"> <SocialLink fragment={link} multiplier={2} /> </span>) 
            }
          </div>
          <StructuredText value={this.state.subtitle} />
        </section>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <HomeContent bio={this.state.bio} />} />
            <Route path="/blog/:uid" render={({match}) => <BlogPost uid={match.params.uid} />} />
            <Route path="/tag/:name" render={({match}) => <Tag tagName={match.params.name} />} />
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
      <BlogPostList />
    </div>
  </div>
)
const FourZeroFour = () => <div> <Helmet><title>NOT FOUND</title></Helmet> <h1>NOT FOUND &#128542;</h1> </div>

export default PrismicHome

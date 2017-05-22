import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import {Helmet} from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SocialLinks from './SocialLinks.jsx'
import BlogPostList from './BlogPostList.jsx'
import BlogPost from './BlogPost.jsx'
import Tag from './Tag.jsx'
import StructuredText from './prismic/StructuredText.jsx'
import PrismicHelper from './prismic/PrismicHelper.jsx'

import NetlifyFooter from './NetlifyFooter.jsx'

let homeConfig = ENV.config.prismicPageMapping.home

class PrismicHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentWillMount() {
    PrismicHelper.queryByTypeAndUid(homeConfig.customType, homeConfig.uid).then(homeDoc => {
      let propsFromFragments = PrismicHelper.stateObjectFromFragment(homeConfig, homeDoc.fragments)
      this.setState(Object.assign({}, propsFromFragments,
        {loading: false, url: ENV.url} )
      )
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
        <Helmet titleTemplate={'%s | ' + this.state.titleTextOnly}>
          <title>Home</title>
          <meta name="description" content={this.state.siteDescriptionTextOnly} />
          <meta name="keywords" content={this.state.siteKeywordsTextOnly} />
          <meta name="twitter:card" content="summary" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={this.state.url} />
          <meta property="og:site_name" content={this.state.titleTextOnly} />
          <meta property="og:locale" content="en_US" />
          <meta name="twitter:title" content={this.state.titleTextOnly} />
          <meta property="og:title" content={this.state.titleTextOnly} />
          <meta name="twitter:description" content={this.state.siteDescriptionTextOnly} />
          <meta property="og:description" content={this.state.siteDescriptionTextOnly} />
          { this.state.socialCardImage &&
            <meta name="twitter:image" content={this.state.socialCardImage.main.url} />
          }
          { this.state.socialCardImage &&
            <meta property="og:image" content={this.state.socialCardImage.main.url} />
          }
        </Helmet>

        <ReactCSSTransitionGroup
          transitionName="easein"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnter={false}
          transitionLeave={false} >
          <section className="page-heading">
            <a href="/"> <StructuredText value={this.state.title}/> </a>

            <SocialLinks multiplier={1.5} />
            <StructuredText value={this.state.subTitle} />
          </section>

          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <HomeContent bio={this.state.biography} />} />
              <Route path="/blog/:uid" render={({match}) => <BlogPost uid={match.params.uid} />} />
              <Route path="/tag/:name" render={({match}) => <Tag tagName={match.params.name} />} />
              <Route component={FourZeroFour} />
            </Switch>
          </BrowserRouter>

          <NetlifyFooter />
        </ReactCSSTransitionGroup>
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

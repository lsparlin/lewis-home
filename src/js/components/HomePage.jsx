import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; 
import {Helmet} from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './NotFound.jsx'
import SocialLinks from './SocialLinks.jsx'
import DocumentList from './DocumentList.jsx'
import DocumentPage from './DocumentPage.jsx'
import Tag from './Tag.jsx'
import StructuredText from './prismic/StructuredText.jsx'
import PrismicHelper from './prismic/PrismicHelper.jsx'

import NetlifyFooter from './NetlifyFooter.jsx'

let homeConfig = ENV.config.prismicPageMapping.home

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};

    this.renderMetaTags = this.renderMetaTags.bind(this)
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
      return( <div></div> )
    }
    return(
      <div className="PrismicHome">
        { this.renderMetaTags() }
        <CSSTransitionGroup
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
              { Object.keys(ENV.config.prismicPageMapping).map(key => ENV.config.prismicPageMapping[key])
                  .filter(config => config.documentRoute)
                  .map(config =>
                    <Route key={config.customType} path={config.documentRoute + ':uid'} 
                      render={({match}) => <DocumentPage uid={match.params.uid} type={config.customType} />} />) }
              <Route path="/tag/:name" render={({match}) => <Tag tagName={match.params.name} />} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>

          <NetlifyFooter />
        </CSSTransitionGroup>
      </div>
    )
  }

  renderMetaTags() {
    return (
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
      <DocumentList type="blogPost"/>
    </div>
  </div>
)

export default HomePage

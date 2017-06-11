import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; 
import {Helmet} from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './status'
import SocialLinks from './SocialLinks'
import DocumentList from './DocumentList'
import DocumentPage from './DocumentPage'
import TagPage from './TagPage'
import StructuredText from './prismic/StructuredText'
import {AdditionalSiteMessage} from './prismic/CustomGroups'
import PrismicHelper from './prismic/PrismicHelper'

let homeConfig = ENV.config.prismicPageMapping.home

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};

    this.onReady = props.onReady
    this.renderMetaTags = this.renderMetaTags.bind(this)
  }

  componentWillMount() {
    PrismicHelper.getAllTags().then(tags => this.setState({ categoryTags: tags.filter(tag => tag.startsWith(ENV.config.categoryTagPrefix)) }) )
    PrismicHelper.queryByTypeAndUid(homeConfig.customType, homeConfig.uid).then(homeDoc => {
      this.setState(Object.assign({}, {loading: false, url: ENV.url},
        PrismicHelper.stateObjectFromFragments(homeConfig, homeDoc.fragments) )
      )
    }).then(this.onReady)
  }

  render () {
    if (this.state.loading) {
      return( <div></div> )
    }
    return(
      <BrowserRouter>
      <div className="HomePage">
        { this.renderMetaTags() }
        <CSSTransitionGroup
          transitionName="easein"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnter={false}
          transitionLeave={false} >
          <Switch>
            <Route exact path="/" render={() => <PageHeader state={this.state} biography={this.state.biography} headerClass="page-block"/> }/>
            <Route render={() => <PageHeader state={this.state}/> }/>
          </Switch>
          

          <Switch>
            <Route exact path="/" component={() => <DocumentList type="blogPost" title="Blog" categoryTags={this.state.categoryTags}/> }/>
            { Object.keys(ENV.config.prismicPageMapping).map(key => ENV.config.prismicPageMapping[key])
                .filter(config => config.documentRoute)
                .map( config =>
                  <Route key={config.customType} path={config.documentRoute + ':uid'} 
                    component={({match}) => <DocumentPage uid={match.params.uid} type={config.customType} />} /> ) 
            }
            <Route path="/tag/:name" component={({match}) => <TagPage tagName={match.params.name} />} />
            <Route component={NotFound} />
          </Switch>

          <Footer />
        </CSSTransitionGroup>
      </div>
      </BrowserRouter>
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
        <link rel="canonical" href={ENV.url} />
      </Helmet>
    )
  }

}

const PageHeader = (props) => (
  <section className={props.headerClass}>
    <a href="/"> <StructuredText value={props.state.title}/> </a>

    <SocialLinks multiplier={1.5} />
    <StructuredText value={props.state.subTitle} />
    <AdditionalSiteMessage value={props.state.additionalMessage} />
    { props.biography && 
        <div className="biography">
          <StructuredText value={props.biography} />
        </div>
    }
  </section> 
)

const Footer = () => (
  <div className="Footer">
    <a href="https://www.netlify.com">
      <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" />
    </a>
  </div>
)

export default HomePage

import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; 
import {Helmet} from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {NotFound} from 'components/status'
import SocialLinks from 'components/SocialLinks'
import DocumentList from 'components/DocumentList'
import DocumentPage from 'components/DocumentPage'
import TagPage from 'components/TagPage'
import {
  PrismicHelperV2,
  StructuredText,
  AdditionalSiteMessage } from 'prismic'

let homeConfig = ENV.config.prismicPageMapping.home

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};

    this.onReady = props.onReady
    this.renderMetaTags = this.renderMetaTags.bind(this)
  }

  componentWillMount() {
    PrismicHelperV2.getAllTags().then(tags => this.setState({ categoryTags: tags.filter(tag => tag.startsWith(ENV.config.categoryTagPrefix)) }) )
    PrismicHelperV2.queryByTypeAndUid(homeConfig.customType, homeConfig.uid).then(homeDoc => {
      this.setState(Object.assign({}, {loading: false, url: ENV.url},
        PrismicHelperV2.stateObjectFromData(homeConfig, homeDoc.data) )
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
      <Helmet titleTemplate={'%s | ' + this.state.title[0].text}>
        <title>Home</title>
        <meta name="description" content={this.state.siteDescription[0].text} />
        <meta name="keywords" content={this.state.siteKeywords[0].text} />
        <meta name="twitter:card" content="summary" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={this.state.url} />
        <meta property="og:site_name" content={this.state.title[0].text} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:title" content={this.state.title[0].text} />
        <meta property="og:title" content={this.state.title[0].text} />
        <meta name="twitter:description" content={this.state.siteDescription[0].text} />
        <meta property="og:description" content={this.state.siteDescription[0].text} />
        { this.state.socialCardImage &&
          <meta name="twitter:image" content={this.state.socialCardImage.url} />
        }
        { this.state.socialCardImage &&
          <meta property="og:image" content={this.state.socialCardImage.url} />
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

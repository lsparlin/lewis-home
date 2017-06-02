import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; 
import {Helmet} from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from '../NotFound'
import SocialLinks from './SocialLinks'
import {DocumentList, DocumentPage, TagPage} from '../Document'
import StructuredText from '../prismic/StructuredText'
import {AdditionalSiteMessage} from '../prismic/CustomGroups'
import PrismicHelper from '../common/PrismicApiHelper'

const HomePage = (props) => {
  if (!props.fragments) {
    return( <div></div> )
  }
  return(
    <div className="HomePage">
      <HomePageHeader fragments={props.fragments} />
      <CSSTransitionGroup
        transitionName="easein"
        transitionAppear={true}
        transitionAppearTimeout={300}
        transitionEnter={false}
        transitionLeave={false} >
        <section className="page-heading">
          <a href="/"> <StructuredText value={props.fragments.title}/> </a>

          <SocialLinks multiplier={1.5} />
          <StructuredText value={props.fragments.subTitle} />
          <AdditionalSiteMessage value={props.fragments.additionalMessage} />
        </section>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <RootContent bio={props.fragments.biography} />} />
            { Object.keys(ENV.config.prismicPageMapping).map(key => ENV.config.prismicPageMapping[key])
                .filter(config => config.documentRoute)
                .map( config =>
                  <Route key={config.customType} path={config.documentRoute + ':uid'} 
                    render={({match}) => <DocumentPage uid={match.params.uid} type={config.customType} />} 
                  /> ) 
            }
            <Route path="/tag/:name" render={({match}) => <TagPage tagName={match.params.name} />} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>

        <Footer />
      </CSSTransitionGroup>
    </div>
  )
}

const HomePageHeader = (props) =>  {
  return (
    <Helmet titleTemplate={'%s | ' + props.fragments.titleTextOnly}>
      <title>Home</title>
      <meta name="description" content={props.fragments.siteDescriptionTextOnly} />
      <meta name="keywords" content={props.fragments.siteKeywordsTextOnly} />
      <meta name="twitter:card" content="summary" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={props.fragments.url} />
      <meta property="og:site_name" content={props.fragments.titleTextOnly} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:title" content={props.fragments.titleTextOnly} />
      <meta property="og:title" content={props.fragments.titleTextOnly} />
      <meta name="twitter:description" content={props.fragments.siteDescriptionTextOnly} />
      <meta property="og:description" content={props.fragments.siteDescriptionTextOnly} />
      { props.fragments.socialCardImage &&
        <meta name="twitter:image" content={props.fragments.socialCardImage.main.url} />
      }
      { props.fragments.socialCardImage &&
        <meta property="og:image" content={props.fragments.socialCardImage.main.url} />
      }
      <link rel="canonical" href={ENV.url} />
    </Helmet>
  )
}
const RootContent = (props) => (
  <div className="RootContent row">
    <div className="five columns">
      <h4 className="column-title"> Quick Intro</h4>
      <hr/>
      <StructuredText value={props.bio} />
    </div>
    <div className="seven columns">
      <DocumentList type="blogPost"/>
    </div>
  </div>
)

const Footer = () => (
  <div className="Footer">
    <a href="https://www.netlify.com">
      <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" />
    </a>
  </div>
)

export default HomePage

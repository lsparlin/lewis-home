import React from 'react';

import {PrismicHelper} from './prismic'

const socialLinkConfig = ENV.config.prismicPageMapping.socialLink

class SocialLinks extends React.Component {
  constructor(props) {
    super(props)
    this.state = { multiplier: props.multiplier }
  }

  componentWillMount() {
    PrismicHelper.queryByDocType(socialLinkConfig.customType)
      .then(results => this.setState({linkDocuments: results}) )
  }

  render() {
    return (
      <div className="SocialLinks">
        { this.state.linkDocuments && this.state.linkDocuments.map((linkDoc, index) => 
            <SocialLink key={index} fragments={linkDoc.fragments} multiplier={this.state.multiplier} /> )
        }
      </div>
     )
  }

}

const SocialLink = (props) => {
  let m = props.multiplier || 1
  let fragmentProps = PrismicHelper.stateObjectFromFragments(socialLinkConfig, props.fragments)
  let title = 'Link to ' + fragmentProps.nameTextOnly
  
  return (
    <a className="SocialLink margin-h-1m" rel="me" href={fragmentProps.socialUrlTextOnly} title={title}
      target="_blank" style={{targetNew: 'tab'}}>
      <img className="fade" alt={title} src={fragmentProps.image.main.url} 
        height={(fragmentProps.image.main.height * m)  + 'px'} 
        width={(fragmentProps.image.main.width * m) +'px'} />
    </a>
  )
}

export default SocialLinks

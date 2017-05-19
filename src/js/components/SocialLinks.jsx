import React from 'react';

import SocialLink from './SocialLink.jsx'
import PrismicHelper from './prismic/PrismicHelper.jsx'

const socialLinkConfig = ENV.config.prismicPageMapping.socialLink

class SocialLinks extends React.Component {
  constructor(props) {
    super(props)
    this.state = { multiplier: props.multiplier || 1 }
  }

  componentWillMount() {
    PrismicHelper.queryByDocType(socialLinkConfig.customType)
      .then(results => results.map(doc => doc.fragments) )
      .then(fragments => this.setState({links: fragments}) )
  }

  render() {
    return (
      <div className="SocialLinks">
        { this.state.links && this.state.links.map((link, index) => (
            <span key={index} className="margin-h-1m"> <SocialLink fragment={link} multiplier={this.state.multiplier} /> </span>
          ) 
        )}
      </div>
     )
  }

}
              
              

export default SocialLinks

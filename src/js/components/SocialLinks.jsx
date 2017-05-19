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
      .then(results => this.setState({linkDocuments: results}) )
  }

  render() {
    return (
      <div className="SocialLinks">
        { this.state.linkDocuments && this.state.linkDocuments.map((linkDoc, index) => (
            <span key={index} className="margin-h-1m"> <SocialLink fragments={linkDoc.fragments} multiplier={this.state.multiplier} /> </span>
          ) 
        )}
      </div>
     )
  }

}
              
              

export default SocialLinks

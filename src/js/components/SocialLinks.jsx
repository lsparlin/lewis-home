import React from 'react';

import SocialLink from './SocialLink.jsx'
import PrismicHelper from './prismic/PrismicHelper.jsx'

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
              
              

export default SocialLinks

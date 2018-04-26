import React from 'react';

import {PrismicHelperV2} from 'prismic'

const socialLinkConfig = ENV.config.prismicPageMapping.socialLink

class SocialLinks extends React.Component {
  constructor(props) {
    super(props)
    this.state = { multiplier: props.multiplier }
  }

  componentDidMount() {
    PrismicHelperV2.queryByDocType(socialLinkConfig.customType)
      .then(results => this.setState({linkDocuments: results}) )
  }

  render() {
    return (
      <div className="SocialLinks">
        { this.state.linkDocuments && this.state.linkDocuments.map((linkDoc, index) => 
            <SocialLink key={index} data={linkDoc.data} multiplier={this.state.multiplier} /> )
        }
      </div>
     )
  }

}

const SocialLink = (props) => {
  let m = props.multiplier || 1
  let dataProps = PrismicHelperV2.stateObjectFromData(socialLinkConfig, props.data)
  let title = 'Link to ' + dataProps.name
  
  return (
    <a className="SocialLink margin-h-1m" rel="me" href={dataProps.socialUrl.url} title={title}
      target="_blank" style={{targetNew: 'tab'}}>
      <img className="fade" alt={title} src={dataProps.image.url} 
        height={(dataProps.image.dimensions.height * m)  + 'px'} 
        width={(dataProps.image.dimensions.width * m) +'px'} />
    </a>
  )
}

export default SocialLinks

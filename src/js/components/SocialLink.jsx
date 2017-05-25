import React from 'react';

import PrismicHelper from './prismic/PrismicHelper'

const socialLinkConfig = ENV.config.prismicPageMapping.socialLink

class SocialLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      { multiplier: props.multiplier || 1 },
      PrismicHelper.stateObjectFromFragment(socialLinkConfig, props.fragments) )
  }


  render() {
    let m = this.state.multiplier
    let image = this.state.image
    let url = this.state.socialUrl
  
    return (
      <a className="SocialLink margin-h-1m" rel="me" href={url.value.url} target="_blank" style={{targetNew: 'tab'}}>
        <img alt={image.main.alt} src={image.main.url} height={(image.main.height * m)  + 'px'} width={(image.main.width * m) +'px'} />
      </a>
    )
  }
}

export default SocialLink

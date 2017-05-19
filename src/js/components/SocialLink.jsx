import React from 'react';

const socialLinkConfig = ENV.config.prismicPageMapping.socialLink

class SocialLink extends React.Component {
  constructor(props) {
    super(props)
    let linkProps = socialLinkConfig.properties.map(confProp => {
      return { [confProp.name] : props.fragment[socialLinkConfig.customType + '.' + confProp.apiName] } 
    }).reduce((acc, curr) => Object.assign({}, acc, curr) )

    this.state = Object.assign({}, { multiplier: props.multiplier || 1 }, linkProps )
  }


  render() {
    let m = this.state.multiplier
    let image = this.state.image
    let url = this.state.socialUrl
  
    return (
      <a className="SocialLink" href={url.value.url} target="_blank" style={{targetNew: 'tab'}}>
        <img alt={image.main.alt} src={image.main.url} height={(image.main.height * m)  + 'px'} width={(image.main.width * m) +'px'} />
      </a>
    )
  }
}

export default SocialLink

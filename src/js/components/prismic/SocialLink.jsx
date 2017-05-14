import React from 'react';

let IMAGE_PROP = 'social-link.image'
let URL_PROP = 'social-link.url'

class SocialLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      multiplier: props.multiplier || 1,
      image: props.fragment[IMAGE_PROP],
      url: props.fragment[URL_PROP]
    }
  }


  render() {
    let m = this.state.multiplier
    let image = this.state.image
    let url = this.state.url
  
    return (
      <a className="SocialLink" href={url.value.url} target="_blank" style={{targetNew: 'tab'}}>
        <img alt={image.main.alt} src={image.main.url} height={(image.main.height * m)  + 'px'} width={(image.main.width * m) +'px'} />
      </a>
    )
  }
}

export default SocialLink

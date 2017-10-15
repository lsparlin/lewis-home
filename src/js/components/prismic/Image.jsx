import React from 'react';

const Image = (props) => {
  let imageMain = props.value.main || props.value
  let dimensions = {
    width: props.width || imageMain.width,
    height: props.height || imageMain.height
  }

  return ( <img src={imageMain.url} alt={imageMain.alt} {...dimensions} /> )
}

function imageBackgroundStyle(image, titleColor) {
  if (image) {
    let url = image.main ? image.main.url : image.url // TODO v1_remove
    return Object.assign({},
      { backgroundImage: 'url(' + url + ')' },
      titleColor && { color: titleColor}
    )
  }
  else return {
    height: '150px',
    color: '#333'
  }
}

export default Image

export { 
  Image,
  imageBackgroundStyle
}

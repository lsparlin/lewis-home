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
    return Object.assign({},
      { backgroundImage: 'url(' + image.url + ')' },
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

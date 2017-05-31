import React from 'react';

const Image = (props) => {
  let imageMain = props.value.main

  return ( <img src={imageMain.url} height={imageMain.height} width={imageMain.width} alt={imageMain.alt} /> )
}

function imageBackgroundStyle(image, titleColor) {
  if (image) {
    return Object.assign({},
      { backgroundImage: 'url(' + image.main.url + ')' },
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

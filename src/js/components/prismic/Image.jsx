import React from 'react';

const Image = (props) => {
  let imageMain = props.value.main

  return ( <img src={imageMain.url} height={imageMain.height} width={imageMain.width} /> )
}

function imageBackgroundStyle(image) {
  if (image) {
    return {
      backgroundImage: 'url(' + image.main.url + ')'
    }
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

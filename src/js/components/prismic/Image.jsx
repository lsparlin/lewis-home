import React from 'react';

const Image = (props) => {
  let imageMain = props.value.main
  let style = Object.assign({}, props.float && {float: props.float, margin: 0})

  return ( <img src={imageMain.url} height={imageMain.height} width={imageMain.width} alt={imageMain.alt} style={style} /> )
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

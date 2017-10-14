import React from 'react';

import ParagraphWithSpans from 'prismic/ParagraphWithSpans'

class StructuredText extends React.Component {
  constructor(props) {
    super(props);
    this.parts = props.value
    if (this.parts.blocks) { // TODO v1_remove
      this.parts = this.parts.blocks
    }
    this.color = props.color
    this.imageComponent = props.imageComponent
  }

  render() {
    if (!this.parts || !this.parts.length) {
      return null
    }

    return (
      <div className="StructuredText">
        { this.imageComponent && this.imageComponent() }
        { this.parts.map((value, index) => {
            var hasSpans = value.spans && !!value.spans.length
            if (value.type.includes('heading')) return ( <Heading key={index} value={value} color={this.color} /> )
            else if (value.type === 'paragraph' && hasSpans) return ( <ParagraphWithSpans key={index} value={value} /> )
            else if (value.type === 'paragraph') return ( <Par key={index} value={value} /> )
            else if (value.type === 'preformatted') return ( <Pre key={index} value={value} /> )
            else if (value.type === 'image') return ( <Img key={index} value={value} /> )
            else return ( <Par key={index} value={value} /> )
          })
        }
      </div>
    )
  }
}

const Par = (props) => ( <p>{props.value.text}</p> )

const Pre = (props) => ( <pre>{props.value.text}</pre> )

const Img = (props) => ( <img src={props.value.url} 
  height={props.value.dimensions.height} width={props.value.dimensions.width} alt={props.value.alt} /> )

const Heading = (props) => {
  var styleIfColor = props.color && {color: props.color}

  return React.createElement(props.value.type.replace('heading', 'h'),
    {style: styleIfColor},
    [props.value.text])
}

export default StructuredText;

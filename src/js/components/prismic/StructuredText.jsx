import React from 'react';

class StructuredText extends React.Component {
  constructor(props) {
    super(props);
    this.structuredText = props.value
  }

  render() {
    // If the text contains spans for rich text - I will :( use this unsafe operation so I don't re-invent the wheel
    var isTooComplexForMe = this.structuredText.blocks.filter(block => block.spans && !!block.spans.length).length
    if (isTooComplexForMe) {
      return ( 
        <div dangerouslySetInnerHTML={{__html: this.structuredText.asHtml()}}></div>
      )
    }

    return (
      <span>
        { this.structuredText.blocks.map((value, index) => {
            if (value.type.includes('heading')) return ( <Heading key={index} value={value} /> )
            else if (value.type === 'paragraph') return ( <Par key={index} value={value} /> )
            else if (value.type === 'preformatted') return ( <Pre key={index} value={value} /> )
            else if (value.type === 'image') return ( <Img key={index} value={value} /> )
            else return ( <Par key={index} value={value} /> )
          })
        }
      </span>
    )
  }
}

const Par = (props) => ( <p>{props.value.text}</p> )

const Pre = (props) => ( <pre>{props.value.text}</pre> )

const Img = (props) => ( <img src={props.value.url} height={props.value.dimensions.height} width={props.value.dimensions.width} /> )

const Heading = (props) => {
  if (props.value.type === "heading1") return ( <h1>{props.value.text}</h1> )
  if (props.value.type === "heading2") return ( <h2>{props.value.text}</h2> )
  if (props.value.type === "heading3") return ( <h3>{props.value.text}</h3> )
  if (props.value.type === "heading4") return ( <h4>{props.value.text}</h4> )
  if (props.value.type === "heading5") return ( <h5>{props.value.text}</h5> )
  if (props.value.type === "heading6") return ( <h6>{props.value.text}</h6> )
}

export default StructuredText;

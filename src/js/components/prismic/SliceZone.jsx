import React from 'react';

import StructuredText from './StructuredText.jsx';

class SliceZone extends React.Component {
  constructor(props) {
    super(props);
    this.sliceZone = props.value
  }

  render() {
    return (
      <div className="SliceZone">
        { this.sliceZone && this.sliceZone.slices.map((slice, index) => {
            if (slice.sliceType === 'text') return ( <StructuredText key={index} value={slice.value} /> )
            else if (slice.sliceType === 'code-sample') return ( <CodeSlice key={index} value={slice.value.blocks[0]} /> )
            else if (slice.sliceType === 'image') return ( <ImageSlice key={index} value={slice.value.main} /> )
            else return null
          })
        }
      </div>
    )
  }
}
const CodeSlice = (props) => ( <pre> <code className="overflow-scroll-x">{props.value.text}</code> </pre> )

const ImageSlice = (props) => (
  <div className="overflow-scroll-x"> <img src={props.value.url} height={props.value.height} width={props.value.width} /> </div>
)

export default SliceZone

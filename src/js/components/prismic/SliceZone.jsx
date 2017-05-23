import React from 'react';

import StructuredText from './StructuredText.jsx';
import Image from './Image.jsx';

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
            else if (slice.sliceType === 'image') return ( <div key={index} className="overflow-scroll-x"><Image value={slice.value} /> </div> )
            else return null
          })
        }
      </div>
    )
  }
}
const CodeSlice = (props) => ( <pre> <code className="overflow-scroll-x">{props.value.text}</code> </pre> )

export default SliceZone

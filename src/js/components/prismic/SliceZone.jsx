import React from 'react';

import StructuredText from './StructuredText';
import Image from './Image';

const SliceZone = (props) => {
  let sliceZone = props.value
  return (
    <div className="SliceZone">
      { sliceZone && sliceZone.slices.map((slice, index) => {
          if (slice.sliceType === 'text') return ( <StructuredText key={index} value={slice.value} /> )
          else if (slice.sliceType === 'code-sample') return ( <CodeSlice key={index} value={slice.value} /> )
          else if (slice.sliceType === 'ordered-list') return (<OrderedListSlice key={index} value={slice.value} /> )
          else if (slice.sliceType === 'image') return ( <div key={index} className="overflow-scroll-x"><Image value={slice.value} /> </div> )
          else return null
        })
      }
    </div>
  )
}

const CodeSlice = (props) => ( 
  <pre> 
    { props.value.blocks.map( (block, index) => <code key={index} className="overflow-scroll-x">{block.text}</code> ) }
  </pre> 
)

const OrderedListSlice = (props) => (
  <ol>
    { props.value.blocks.map( (block, index) => <li key={index}>{block.text}</li> ) }
  </ol>
)

export default SliceZone

import React from 'react';

import StructuredText from 'prismic/StructuredText';
import Image from 'prismic/Image';
import {StyledCode, TextWithInlineImage} from 'prismic/CustomGroups';

const SliceZone = (props) => {
  let sliceZone = props.value
  let slices = sliceZone
  let sliceType = 'slice_type'
  return (
    <div className="SliceZone">
      { slices && slices.map((slice, index) => {
          if (slice[sliceType] === 'text') return ( <StructuredText key={index} value={slice.value} /> )
          else if (slice[sliceType] === 'quote') return ( <QuoteSlice key={index} value={slice.value} /> )
          else if (slice[sliceType] === 'code-sample') return ( <CodeSlice key={index} value={slice.value} /> )
          else if (slice[sliceType] === 'styled-code-sample') return ( <StyledCodeSlice key={index} value={slice.value} /> )
          else if (slice[sliceType] === 'ordered-list') return (<OrderedListSlice key={index} value={slice.value} /> )
          else if (slice[sliceType] === 'image') return ( <div key={index} className="image-container overflow-scroll-x"><Image value={slice.value} /> </div> )
          else if (slice[sliceType] === 'text-inline-image') return ( <TextWithInlineImage key={index} value={slice.value} />)
          else return null
        })
      }
    </div>
  )
}

const QuoteSlice = (props) => (
  <blockquote> <p>
      {props.value.value}
  </p> </blockquote>
)

const CodeSlice = (props) => ( 
  <pre> 
    { props.value.map( (block, index) => 
      <code key={index} className={'overflow-scroll-x ' + (props.languageClass || '')}>{block.text}</code> ) 
    }
  </pre> 
)

const StyledCodeSlice = (props) => { 
  const codeComponent = (styledCode, languageClass) =>
    ( <CodeSlice value={styledCode} languageClass={languageClass} /> )
  return ( <StyledCode value={props.value} codeComponent={codeComponent} /> )
}

const OrderedListSlice = (props) => (
  <ol>
    { props.value.map( (block, index) => <li key={index}>{block.text}</li> ) }
  </ol>
)

export default SliceZone

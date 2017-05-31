import React from 'react';

class ParagraphWithSpans extends React.Component {
  constructor(props) {
    super(props)
    this.block = props.value
  }

  render() {
    let text = this.block.text
    let orderedSpans = this.block.spans.sort((span, next) => span.start - next.start)
    orderedSpans = [newSpan(0, orderedSpans[0].start), 
      ...orderedSpans,
      newSpan(orderedSpans[orderedSpans.length-1].end, text.length + 1)]

    let spans = orderedSpans.reduce( (accumArr, nextSpan) => {
      let previousSpan = accumArr[accumArr.length-1]
      return [...accumArr, ...spanIfGap(previousSpan, nextSpan), nextSpan]
    }, [])

    return (
      <p>
        {spans.map( (span, index) => {
          let substring =  text.substring(span.start, span.end) 
          if (span.start == span.end || span.end == -1) return null
          else if (span.type === 'hyperlink') return (<Hyperlink key={index} text={substring} data={span.data} />)
          else if (span.type === 'em') return (<em key={index}>{substring}</em>)
          else if (span.type === 'strong') return (<strong key={index}>{substring}</strong>)
          else return (<span key={index}> {substring} </span>)
          })
        }
      </p>
    )
  }

}

const Hyperlink = (props) => (
  <a href={props.data.value.url} target="_blank">{ props.text }</a>
)

export default ParagraphWithSpans

function spanIfGap(previous, next) {
  if (previous && previous.end + 1 < next.start) {
    return [newSpan(previous.end + 1, next.start)]
  }
  return []
}

function newSpan(start, end) {
  return {
    start: start,
    end: end - 1,
    type: 'none'
  }
}

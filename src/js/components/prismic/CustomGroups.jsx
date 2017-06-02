import React from 'react';

import StructuredText from './StructuredText'
import Image from './Image'
import PrismicHelper from '../common/PrismicApiHelper'

let groupConfig = ENV.config.prismicGroupMapping

const AdditionalSiteMessage = (props) => {
  let messageProps = PrismicHelper.stateObjectFromFragments(
    groupConfig.siteAdditionalMessage, 
    fragmentsFromNoRepeatGroup(props.value) )
  return <StructuredText value={messageProps.additionalMessage} color={messageProps.messageColorTextOnly} />
}

const TextWithInlineImage = (props) => {
  let  inlineImgProps = PrismicHelper.stateObjectFromFragments(
    groupConfig.textWithInlineImage,
    fragmentsFromNoRepeatGroup(props.value) )
  let floatClass = inlineImgProps.imageFloatTextOnly ? 'float-' + inlineImgProps.imageFloatTextOnly : ''
  let imageComponent = () => (
    <div className={'overflow-scroll-x ' + floatClass}>
      <Image value={inlineImgProps.inlineImage} />
    </div>
  )

  return ( 
    <div className="TextWithInlineImage">
      <StructuredText value={inlineImgProps.text} imageComponent={imageComponent} /> 
    </div>
  )
}

const StyledCode = (props) => {
  let styledCodeProps = PrismicHelper.stateObjectFromFragments(
    groupConfig.styledCode,
    fragmentsFromNoRepeatGroup(props.value) )
  return props.codeComponent(styledCodeProps.styledCode, styledCodeProps.languageTextOnly)
}

export {
  AdditionalSiteMessage,
  TextWithInlineImage,
  StyledCode
}

const fragmentsFromNoRepeatGroup = (group) => {
  return group.value[0].fragments
}



import React from 'react';

import StructuredText from 'prismic/StructuredText'
import Image from 'prismic/Image'
import PrismicHelper from 'prismic/PrismicHelper'
import PrismicHelperV2 from 'prismic/PrismicHelperV2'

let groupConfig = ENV.config.prismicGroupMapping

const AdditionalSiteMessage = (props) => {
  let messageProps = PrismicHelperV2.stateObjectFromData(
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
  let languageClass = styledCodeProps.language && 'language-' + styledCodeProps.languageTextOnly
  return props.codeComponent(styledCodeProps.styledCode, languageClass)
}

export {
  AdditionalSiteMessage,
  TextWithInlineImage,
  StyledCode
}

const fragmentsFromNoRepeatGroup = (group) => {
  if (group.value) { // TODO v1_remove
    return group.value[0].fragments
  } else {
    return group[0]
  }
}



import React from 'react';

import StructuredText from 'prismic/StructuredText'
import Image from 'prismic/Image'
import PrismicHelperV2 from 'prismic/PrismicHelperV2'

let groupConfig = ENV.config.prismicGroupMapping

const AdditionalSiteMessage = (props) => {
  let messageProps = PrismicHelperV2.stateObjectFromData(
    groupConfig.siteAdditionalMessage, 
    fragmentsFromNoRepeatGroup(props.value) )
  return <StructuredText value={messageProps.additionalMessage} color={messageProps.messageColor} />
}

const TextWithInlineImage = (props) => {
  let  inlineImgProps = PrismicHelperV2.stateObjectFromData(
    groupConfig.textWithInlineImage,
    fragmentsFromNoRepeatGroup(props.value) )
  let floatClass = inlineImgProps.imageFloat ? 'float-' + inlineImgProps.imageFloat : ''
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
  let styledCodeProps = PrismicHelperV2.stateObjectFromData(
    groupConfig.styledCode,
    fragmentsFromNoRepeatGroup(props.value) )
  let languageClass = styledCodeProps.language && 'language-' + styledCodeProps.language
  return props.codeComponent(styledCodeProps.styledCode, languageClass)
}

export {
  AdditionalSiteMessage,
  TextWithInlineImage,
  StyledCode
}

const fragmentsFromNoRepeatGroup = (group) => {
  return group[0]
}



import React from 'react';

import StructuredText from './StructuredText'
import PrismicHelper from './PrismicHelper'

let groupConfig = ENV.config.prismicGroupMapping

const AdditionalSiteMessage = (props) => {

  let messageProps = PrismicHelper.stateObjectFromFragments(
    groupConfig.siteAdditionalMessage, 
    fragmentsFromNoRepeatGroup(props.value) )
  return <StructuredText value={messageProps.additionalMessage} color={messageProps.messageColorTextOnly} />
}

const StyledCode = (props) => {
  let styledCodeProps = PrismicHelper.stateObjectFromFragments(
    groupConfig.styledCode,
    fragmentsFromNoRepeatGroup(props.value) )
  return props.codeComponent(styledCodeProps.styledCode, styledCodeProps.languageTextOnly)
}

export {
  AdditionalSiteMessage,
  StyledCode
}

const fragmentsFromNoRepeatGroup = (group) => {
  return group.value[0].fragments
}



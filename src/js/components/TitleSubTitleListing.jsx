import React from 'react';
import { Link } from 'react-router-dom';

import StructuredText from './prismic/StructuredText'
import Image from './prismic/Image'
import PrismicHelper from './prismic/PrismicHelper'

const TitleSubTitleListing = (props) => {
  let docTypeConfig = ENV.config.prismicPageMapping[props.type]
  let doc = Object.assign({}, {uid: props.doc.uid},
    PrismicHelper.stateObjectFromFragments(docTypeConfig, props.doc.fragments, 'listProperties') )

  console.log(doc.titleImageSmall)
  return(
    <div className={'TitleSubTitleListing ' + (props.className || '')}>
      { doc.titleImageSmall && <Image value={doc.titleImageSmall} /> }
      <Link to={docTypeConfig.documentRoute + doc.uid}> <StructuredText value={doc.title} /> </Link>
      <StructuredText value={doc.subTitle} />
    </div>
  )
}

export default TitleSubTitleListing

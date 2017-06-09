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
    <div className={'TitleSubTitleListing dull-then-fade-in ' + (props.className || '')}>
      <Link to={docTypeConfig.documentRoute + doc.uid}>
        { doc.titleImageSmall && <Image value={doc.titleImageSmall} width="100%" height="160rem" /> }
        <div className="titles">
          <StructuredText value={doc.title} /> 
          <StructuredText value={doc.subTitle} />
        </div>
      </Link>
    </div>
  )
}

export default TitleSubTitleListing

import React from 'react';
import { Link } from 'react-router-dom';

import { PrismicHelper,
  StructuredText, 
  Image } from './prismic'

const TitleSubTitleListing = (props) => {
  let docTypeConfig = ENV.config.prismicPageMapping[props.type]
  let doc = Object.assign({}, {uid: props.doc.uid},
    PrismicHelper.stateObjectFromFragments(docTypeConfig, props.doc.fragments, 'listProperties') )

  return(
    <div className={'TitleSubTitleListing dull-then-fade-in ' + (props.className || '')}>
      <Link to={docTypeConfig.documentRoute + doc.uid}>
        { !props.noImage && doc.titleImageSmall && <Image value={doc.titleImageSmall} width="100%" height="160rem" /> }
        <div className="titles">
          <StructuredText value={doc.title} /> 
          <StructuredText value={doc.subTitle} />
        </div>
      </Link>
    </div>
  )
}

export default TitleSubTitleListing

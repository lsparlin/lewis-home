import React from 'react';
import { Link } from 'react-router-dom';

import StructuredText from './prismic/StructuredText'
import PrismicHelper from './prismic/PrismicHelper'

const TitleSubTitleListing = (props) => {
  let docTypeConfig = ENV.config.prismicPageMapping[props.type]
  let doc = Object.assign({}, {uid: props.doc.uid},
    PrismicHelper.stateObjectFromFragment(docTypeConfig, props.doc.fragments, 'listProperties') )

  return(
    <div className="TitleSubTitleListing">
      <Link to={docTypeConfig.documentRoute + doc.uid}> <StructuredText value={doc.title} /> </Link>
      <StructuredText value={doc.subTitle} />
    </div>
  )
}

export default TitleSubTitleListing

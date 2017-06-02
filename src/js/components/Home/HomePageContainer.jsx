import React from 'react';

import HomePage from './HomePage'
import PrismicHelper from '../common/PrismicApiHelper'

let homeConfig = ENV.config.prismicPageMapping.home

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};

    this.onReady = props.onReady
  }

  componentWillMount() {
    PrismicHelper.queryByTypeAndUid(homeConfig.customType, homeConfig.uid).then(homeDoc => {
      this.setState(Object.assign({}, {loading: false, url: ENV.url},
        {fragments: PrismicHelper.stateObjectFromFragments(homeConfig, homeDoc.fragments)} )
      )
    }).then(this.onReady)
  }

  render () {
    return(
      <HomePage fragments={this.state.fragments} />
    )
  }

}

export default HomePageContainer

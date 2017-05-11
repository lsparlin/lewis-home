import React from 'react';
import PrismicPage from './pages/PrismicPage.jsx'

let PRISMIC_API = "https://lewismsparlin.prismic.io/api"

class App extends React.Component {
	constructor(props) {
    super(props);
  }

  render () {
    return(
      <div>
				<PrismicPage prismicApi={PRISMIC_API}/>
			  <div className="footer">
			  	<a href="https://www.netlify.com">
        	  <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" />
        	</a>
			  </div>
      </div>
    )
  }
}

export default App

import React from 'react';


class NetlifyFooter extends React.Component {
	constructor(props) {
    super(props);
  }

  render () {
    return(
		 <div className="NetlifyFooter footer">
		 	<a href="https://www.netlify.com">
     	  <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" />
     	</a>
		 </div>
    )
  }
}

export default NetlifyFooter

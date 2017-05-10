require('../less/main.less');
var Prismic = require('prismic.io');


import React from 'react';
import {render} from 'react-dom';

let contentType = 'page'
let prismicProps = ['title', 'subtitle', 'content']

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {loading: true, title: 'Default', subtitle: 'Subtitle here', content: 'Testing content'};
  }

  componentWillMount() {
    var newState = this.state
    Prismic.api('https://lewismsparlin.prismic.io/api').then((api) => {
      api.getByUID('page', 'home').then((homeResponse) => {
        newState.loading = false
        prismicProps.forEach((prismicProperty) => {
          newState[prismicProperty] =  homeResponse.data['page.' + prismicProperty].value[0].text
        })
        this.setState(newState)
      })
    })
  }

  render () {
    if (this.state.loading) {
      return(
      <div></div>
      )
    }
    return(
      <div>
        <div className="jumbotron">
            <h1>{this.state.title}</h1>

            <p>{this.state.subtitle}</p>
        </div>
        <div>
          <p> {this.state.content}</p>
        </div>
			  <div className="footer">
			  	<a href="https://www.netlify.com">
        	  <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" />
        	</a>
			  </div>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

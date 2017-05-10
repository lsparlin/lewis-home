require('../less/main.less');
var Prismic = require('prismic.io');


import React from 'react';
import {render} from 'react-dom';

let prismicProps = ['title', 'subtitle', 'content']

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {loading: true, title: 'Default', subtitle: 'Subtitle here', content: 'Testing content'};
  }

  componentWillMount() {
    Prismic.api('https://lewismsparlin.prismic.io/api').then((api) => {
      api.getByUID('blog-post', 'home').then((homeResponse) => {
        prismicProps.forEach((prismicProperty) => {
          this.setState({[prismicProperty]:  homeResponse.data['blog-post.' + prismicProperty].value[0].text})
        })
        this.setState({loading: false})
      })
    })
  }

  render () {
    if (this.state.loading) {
      return(
      <div>
        loading...
      </div>
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
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

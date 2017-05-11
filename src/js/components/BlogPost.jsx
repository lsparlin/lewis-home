import React from 'react';


class BlogPost extends React.Component {
	constructor(props) {
    super(props);
		console.log(props)
  }

  render () {
    return(
			<h1>A blog post goes here!</h1>
    )
  }
}

export default BlogPost

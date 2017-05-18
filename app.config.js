module.exports = {
  prismicApi: "https://lewismsparlin.prismic.io/api",
  omitTags: ["preview-only"],
  prismicPageMapping: {
    home: {
      customType: 'site-header',
      uid: 'lewismsparlin-header',
      properties: [
        {name: 'title', apiName: 'title'},
        {name: 'subTitle', apiName: 'subtitle'},
        {name: 'biography', apiName: 'bio'},
        {name: 'siteDescription', apiName: 'description'},
        {name: 'siteKeywords', apiName: 'keywords'}
      ]
    },
    socialLink: {
      customType: 'social-link'
    },
    blogPost: {
      customType: 'blog-post',
      listProperties: [
        {name: 'title', apiName: 'title'},
        {name: 'subTitle', apiName: 'subtitle'}
      ],
      properties: [
        {name: 'title', apiName: 'title'},
        {name: 'subTitle', apiName: 'subtitle'},
        {name: 'blogContent', apiName: 'content'}
      ]
    },
    tag: {
      customType: 'tag'
    }
  }
}

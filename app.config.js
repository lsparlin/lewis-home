module.exports = {
  prismicApi: ENV.prismicApi || 'https://lewismsparlin.prismic.io/api',
  omitTags: ENV.prismicOmitTags && ENV.prismicOmitTags.split(','),
  prismicPageMapping: {
    home: {
      customType: 'site-header',
      uid: 'lewismsparlin-header',
      properties: [
        {name: 'title', apiName: 'title'},
        {name: 'subTitle', apiName: 'subtitle'},
        {name: 'biography', apiName: 'bio'},
        {name: 'siteDescription', apiName: 'description'},
        {name: 'siteKeywords', apiName: 'keywords'},
        {name: 'socialCardImage', apiName: 'card-image'}
      ]
    },
    socialLink: {
      customType: 'social-link',
      properties: [
        {name: 'image', apiName: 'image'},
        {name: 'socialUrl', apiName: 'url'}
      ]
    },
    blogPost: {
      documentRoute: '/blog/',
      customType: 'blog-post',
      pageSize: 5,
      listProperties: [
        {name: 'title', apiName: 'title'},
        {name: 'subTitle', apiName: 'subtitle'}
      ],
      properties: [
        {name: 'title', apiName: 'title'},
        {name: 'subTitle', apiName: 'subtitle'},
        {name: 'titleImage', apiName: 'title-image'},
        {name: 'titleColorOnImage', apiName: 'title-color'},
        {name: 'subTitleColorOnImage', apiName: 'subtitle-color'},
        {name: 'shortDescription', apiName: 'short-description'},
        {name: 'blogContent', apiName: 'content'},
        {name: 'blogBody', apiName: 'body'}
      ]
    }
  }
}

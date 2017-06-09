module.exports = {
  prismicApi: ENV.prismicApi || 'https://lewismsparlin.prismic.io/api',
  omitTags: ENV.prismicOmitTags && ENV.prismicOmitTags.split(','),
  categoryTagPrefix: 'category-',
  prismicPageMapping: {
    home: {
      customType: 'site-header',
      uid: 'lewismsparlin-header',
      properties: [
        {name: 'title', apiName: 'title'},
        {name: 'subTitle', apiName: 'subtitle'},
        {name: 'additionalMessage', apiName: 'additional-site-message'},
        {name: 'biography', apiName: 'bio'},
        {name: 'siteDescription', apiName: 'description'},
        {name: 'siteKeywords', apiName: 'keywords'},
        {name: 'socialCardImage', apiName: 'card-image'}
      ]
    },
    socialLink: {
      customType: 'social-link',
      properties: [
        {name: 'name', apiName: 'name'},
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
        {name: 'subTitle', apiName: 'subtitle'},
        {name: 'titleImageSmall', apiName: 'title-image-small'}
      ],
      properties: [
        {name: 'title', apiName: 'title'},
        {name: 'subTitle', apiName: 'subtitle'},
        {name: 'titleImage', apiName: 'title-image'},
        {name: 'titleImageSmall', apiName: 'title-image-small'},
        {name: 'titleColorOnImage', apiName: 'title-color'},
        {name: 'subTitleColorOnImage', apiName: 'subtitle-color'},
        {name: 'shortDescription', apiName: 'short-description'},
        {name: 'blogBody', apiName: 'body'}
      ]
    }
  }, 
  prismicGroupMapping: { // definitions for custom field groupings
    siteAdditionalMessage: {
      properties: [
        {name: 'additionalMessage', apiName: 'additional-message'},
        {name: 'messageColor', apiName: 'additional-color'}
      ]
    },
    textWithInlineImage: {
      properties: [
        {name: 'text', apiName: 'text'},
        {name: 'imageFloat', apiName: 'image-float'},
        {name: 'inlineImage', apiName: 'image'}
      ]
    },
    styledCode: {
      properties: [
        {name: 'styledCode', apiName: 'styled-code'},
        {name: 'language', apiName: 'styled-code-language'}
      ]
    }
  }
}

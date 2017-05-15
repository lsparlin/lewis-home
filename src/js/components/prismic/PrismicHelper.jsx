import Prismic from 'prismic.io';

var config = require('../../app.config.json')

var API = undefined

function getApi() {
  if (!API) {
    API = Prismic.api(config.prismicApi)
  }
  return API
}

const queryByTypeAndUid = (type, uid) => {
  return getApi()
    .then((api) => {
      return api.getByUID(type, uid)
    })

}
const queryByDocType = (type, ordered, limitTo) => {
  return queryAt('document.type', type, ordered, limitTo)
}

const queryAt = (field, name, ordered, limitTo) => {
  var queryOptions = {}
  if (ordered) {
    queryOptions.orderings = '[document.last_publication_date desc]'
  }
  if (limitTo) {
    queryOptions.fetch = limitTo
  }
  return getApi()
    .then((api) => {
      return api.query(
        Prismic.Predicates.at(field, name),
        queryOptions
      ).then(response => response.results)
    })
}

export {
  queryByTypeAndUid,
  queryAt,
  queryByDocType
}

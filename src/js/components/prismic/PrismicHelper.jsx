import Prismic from 'prismic.io';

var config = require('../../app.config.json')

var API = undefined

function getApi() {
  if (!API) {
    API = Prismic.api(config.prismicApi)
  }
  return API
}

function predicateAndOmitTags(singlePredicate) {
  var predicates = [singlePredicate]
  if (config.omitTags) {
    predicates = [...predicates, Prismic.Predicates.not('document.tags', config.omitTags )]
  }
  return predicates
}

const queryByTypeAndUid = (type, uid) => {
  return getApi()
    .then((api) => {
      return api.query(predicateAndOmitTags(Prismic.Predicates.at('my.' + type + '.uid', uid)) )
         .then(response => response.results[0])
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
        predicateAndOmitTags(Prismic.Predicates.at(field, name)),
        queryOptions
      ).then(response => response.results)
    })
}

export {
  queryByTypeAndUid,
  queryAt,
  queryByDocType
}

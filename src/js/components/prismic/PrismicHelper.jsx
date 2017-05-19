import Prismic from 'prismic.io';

var API = undefined

function getApi() {
  if (!API) {
    API = Prismic.api(ENV.config.prismicApi)
  }
  return API
}

function predicateAndOmitTags(singlePredicate) {
  var predicates = [singlePredicate]
  if (ENV.config.omitTags) {
    predicates = [...predicates, Prismic.Predicates.not('document.tags', ENV.config.omitTags )]
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

const stateObjectFromFragment = (pageConfig, fragments) => {
    return pageConfig.properties.map(prop => {
      return { [prop.name] : fragments[pageConfig.customType + '.' + prop.apiName] } 
    }).reduce((acc, curr) => Object.assign({}, acc, curr) )
}

export default {
  queryByTypeAndUid,
  queryAt,
  queryByDocType,
  stateObjectFromFragment
}

import Prismic from 'prismic-javascript'

var API = undefined

function getApi() {
  if (!API) {
    API = Prismic.api(ENV.config.prismicApi + '/v2')
  }
  return API
}

function getAllTags() {
  return getApi().then(api => api.data.tags)
}

function predicateAndOmitTags(singlePredicate) {
  let predicates = [singlePredicate]
  if (ENV.config.omitTags) {
    let notPredicates = ENV.config.omitTags.map(omit => Prismic.Predicates.not('document.tags', [omit]) )
    return [...predicates, ...notPredicates]
  }
  return predicates
}

const queryByDocType = (type, ordered, limitTo, pageSize, page) => {
  return queryAt('document.type', type, ordered, limitTo, pageSize, page)
}
const queryByTypeAndUid = (type, uid) => {
  return getApi().then( api => {
    return api.query(predicateAndOmitTags(Prismic.Predicates.at('my.' + type + '.uid', uid)) )
    .then(response => response.results[0])
  })
}

const queryAt = (field, name, ordered, limitTo, pageSize, page) => {
  var queryOptions = {pageSize: pageSize || 10, page: page || 1}
  if (ordered) {
    queryOptions.orderings = '[document.last_publication_date desc]'
  }
  if (limitTo) {
    queryOptions.fetch = limitTo
  }
  return getApi().then( api => {
    return api.query(
      predicateAndOmitTags(Prismic.Predicates.at(field, name)),
      queryOptions
    ).then(response => response.results)
  })
}

const stateObjectFromData = (config, data, listName) => {
  let properties = config.properties
  let propPrefix = ''
  if (listName && config[listName]) {
    properties = config[listName]
  }
  if (config.customType) {
    propPrefix = config.customType + '.'
  }

  return properties.map(prop => {
    let value = data[prop.apiName]
    return { [prop.name] : value }
    //return { [prop.name] : fragment, [prop.name + 'TextOnly'] : fragment && fragment.asText() } 
  }).reduce((acc, curr) => Object.assign({}, acc, curr) )
}

export default {
  getAllTags,
  queryAt,
  queryByDocType,
  queryByTypeAndUid,
  stateObjectFromData
}

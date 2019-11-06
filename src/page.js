const EDITOR_URL = 'https://test.skohub.io/editor/'
const SCHEMA_URL = 'https://raw.githubusercontent.com/literarymachine/oer-metadata-schemas/generic-OER/oer.json'

const url = new URL(EDITOR_URL)
url.searchParams.set('schema', SCHEMA_URL)

const getMetaTag = (attribute, value) => {
  return (document.querySelector(`meta[${attribute}="${value}"]`) && document.querySelector(`meta[${attribute}="${value}"]`).content) || null
}

const pageGetData = () => {
  return {
    name: getMetaTag('property', 'og:title') ||
      getMetaTag('name', 'twitter:title') ||
      document.title,
    id: getMetaTag('property', 'og:url') || window.location.href,
    description: getMetaTag('name', 'description') ||
      getMetaTag('property', 'og:description') ||
      getMetaTag('name', 'twitter:description'),
    keywords: getMetaTag('name', 'keywords'),
    author: getMetaTag('name', 'author'),
    image: getMetaTag('property', 'og:image') ||
      getMetaTag('name', 'twitter:image'),
    locale: getMetaTag('property', 'og:locale'),
    type: getMetaTag('property', 'og:type') || 'CreativeWork'
  }
}

const data = pageGetData()
Object.entries(data)
  .filter(([key, val]) => val !== null)
  .forEach(([key, value]) => {
    url.searchParams.set(key, encodeURIComponent(value))
  })

window.open(url.href, '_blank')

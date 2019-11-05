const url = new URL('https://test.skohub.io/editor/')
url.searchParams.set('schema', 'https://raw.githubusercontent.com/literarymachine/oer-metadata-schemas/generic-OER/oer.json')

const pageGetData = () => {
  return {
    name: document.title,
    id: window.location.href,
    description: (document.querySelector('meta[name=description]') && document.querySelector('meta[name=description]').content) || ''
  }
}

const data = pageGetData()
Object.entries(data).map(([key, value]) => {
  url.searchParams.set(key, encodeURIComponent(value))
})

window.open(url.href, '_blank')

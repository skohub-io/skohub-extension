
/* global chrome */
var attach = async () => {
  const EDITOR_URL = 'https://test.skohub.io/editor/'

  const loadSavedOptions = new Promise((resolve, reject) => {
    chrome.storage.local.get({ defaultSchema: null }, (options) => {
      resolve(options)
    })
  })
  const { defaultSchema } = await loadSavedOptions

  const url = new URL(EDITOR_URL)
  defaultSchema && url.searchParams.set('schema', defaultSchema)

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

  const styleContent = `
    #SkoHubFrame {
      position: fixed;
      height: 100%;
      width: 500px;
      top: 0;
      right: 0;
      z-index: 2147483647;
      box-shadow: 0px 3px 15px hsla(0, 0%, 0%, 0.2);
      transition: transform 0.5s;
      border: none;
    }

    #SkoHubCollapseBtn {
      position: fixed;
      top: 0;
      right: 500px;
      width: 40px;
      height: 40px;
      background-size: contain;
      background-image: url(${chrome.runtime.getURL('icons/chevron-right.svg')});
      background-color: hsl(154, 68%, 47%);
      z-index: 2147483647;
      border: none;
      border-radius: 0 0 0 14px;
      transition: transform 0.5s;
    }

    #SkoHubCollapseBtn.collapsed {
      transition: transform 0.5s;
      transform: translateX(500px);
      background-image: url(${chrome.runtime.getURL('icons/chevron-left.svg')});
    }

    #SkoHubFrame.collapsed {
      transition: transform 0.5s;
      transform: translateX(500px);
    }
  `

  const SkoHubCollapseBtn = document.createElement('button')
  SkoHubCollapseBtn.id = 'SkoHubCollapseBtn'
  SkoHubCollapseBtn.title = 'Collapse'
  SkoHubCollapseBtn.addEventListener('click', () => {
    const iframe = document.getElementById('SkoHubFrame')
    if (iframe.classList.contains('collapsed')) {
      iframe.classList.remove('collapsed')
      SkoHubCollapseBtn.classList.remove('collapsed')
      SkoHubCollapseBtn.title = 'Collapse'
    } else {
      iframe.classList.add('collapsed')
      SkoHubCollapseBtn.classList.add('collapsed')
      SkoHubCollapseBtn.title = 'Expand'
    }
  })

  const style = document.createElement('style')
  style.appendChild(document.createTextNode(styleContent))

  const iframe = document.createElement('iframe')
  iframe.src = url
  iframe.id = 'SkoHubFrame'

  document.body.appendChild(style)
  document.body.appendChild(iframe)
  document.body.appendChild(SkoHubCollapseBtn)
}

var iframeExist = document.getElementById('SkoHubFrame')

if (!iframeExist) {
  attach()
} else {
  iframeExist.remove()
  document.getElementById('SkoHubCollapseBtn').remove()
}

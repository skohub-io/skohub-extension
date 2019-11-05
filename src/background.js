/* global chrome */
const openInSkoHub = (url) => {
  chrome.tabs.executeScript({
    file: 'page.js'
  })
}

chrome.browserAction.onClicked.addListener(({ url }) => {
  openInSkoHub(url)
})

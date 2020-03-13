/* global chrome */
const saveOptions = async (e) => {
  e.preventDefault()
  const { value } = document.getElementById('defaultSchema')
  const saveBtn = document.getElementById('saveBtn')
  await chrome.storage.local.set({
    defaultSchema: value
  })

  saveBtn.textContent = 'Options saved'
  setTimeout(() => {
    saveBtn.textContent = 'Save'
  }, 750)
}

const restoreOptions = () => {
  chrome.storage.local.get({
    defaultSchema: ''
  }, ({ defaultSchema }) => {
    document.getElementById('defaultSchema').value = defaultSchema
  })
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById('optionsForm').addEventListener('submit', saveOptions)

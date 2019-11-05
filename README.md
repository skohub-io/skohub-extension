# Skohub-extension

Webextension to send page data to the skohub-editor

## Instructions for install

### Add to Chrome

In `Extensions`, click `load unpacked`, open the directory `skohub-extension/src`.

### Add to firefox

Go to `Add-ons` in `Tools for Add-ons` click `Debug Add-ons` and load a new temporary add-on selecting the manifes in `skohub-extension/src`.

### Lunch with a temporal Firefox Profile

```
npm run start:firefox
```

## Usage

After installing the extension click the new extension icon on any webpage, this will open a new tab to Skohub-editor with the extracted content of the page.

## Test

```
npm install // Only the first time
npm run test
```

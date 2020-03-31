# SkoHub WebExtension

WebExtension to send page data to the [skohub-editor](https://github.com/hbz/skohub-editor)

## Instructions for installing

```
$ git clone https://github.com/hbz/skohub-extension.git
$ cd skohub-extension
$ npm install
```

### Add to Chrome

- Add extension from the Chrome Web Store: https://chrome.google.com/webstore/detail/skohub/ghalhmcgaicdcpmdicinaegnoanfmggd
- Alternatively, you can load the unpacked extension from the repo: In `Extensions`, enable Developer mode, click `load unpacked` and open the directory `skohub-extension/src`.

### Add to Firefox

- Add the official extension from https://addons.mozilla.org/firefox/addon/skohub-extension/ 
- Alternatively, go to `Add-ons` in `Tools for Add-ons` click `Debug Add-ons` and load a new temporary add-on selecting the manifest in `skohub-extension/src`. You can also directly launch Firefox with a temporary profile by running `npm run start:firefox`

## Usage

After installing the extension click the new extension icon on any webpage, this will open a new tab to SkoHub Editor with the extracted content of the page.

## Test

```
$ npm run test
```

import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json' assert { type: 'json' }

export default defineManifest({
  manifest_version: 3,
  name: packageData.name,
  description: packageData.description,
  version: packageData.version,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  options_ui: {
    page: 'options.html',
    open_in_tab: true,
  },
  content_scripts: [
    {
      matches: ['*://gpokr.com/*'],
      js: ['src/contentScript/index.js'],
    },
  ],
  permissions: ['storage', 'declarativeNetRequest', 'declarativeNetRequestFeedback'],
  host_permissions: ['*://*.gpokr.com/*'],
  web_accessible_resources: [
    {
      resources: [
        'sounds/bet.mp3',
        'sounds/cards.mp3',
        'sounds/shuffle.mp3',
        'img/logo-16.png',
        'img/logo-34.png',
        'img/logo-48.png',
        'img/logo-128.png',
      ],
      matches: ['*://gpokr.com/*'],
    },
  ],
  declarative_net_request: {
    rule_resources: [
      {
        id: 'ruleset_1',
        enabled: true,
        path: 'rules.json',
      },
    ],
  },
})

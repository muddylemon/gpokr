console.log('background is running')
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.url.endsWith('your_turn.mp3')) {
      return { redirectUrl: chrome.runtime.getURL('sounds/bet.mp3') }
    }
  },
  { urls: ['*://gpokr.com/gpokr2/sound/*'] },
  ['blocking'],
)

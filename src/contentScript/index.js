// src/contentScript/index.js
console.info('🃏 gpokr is running')

// Function to efficiently create chat buttons
function createChatButtons(chatPanel, chatInput, chatButton, buttonData) {
  // Create button container only once
  const chatButtonContainer = document.createElement('div')
  chatButtonContainer.classList.add('iogc-chat-buttons')
  chatButtonContainer.style.cssText = 'display:flex;justify-content:flex-start;flex-wrap:wrap;'

  // Create document fragment for better performance
  const fragment = document.createDocumentFragment()

  // Reuse common class names and styles
  const commonClasses = ['iogc-NewButton-white', 'iogc-NewButton', 'iogc-ButtonSpace-left']

  // Create buttons in batch
  buttonData.forEach(({ text, title }) => {
    const button = document.createElement('button')
    // Add all classes at once
    button.classList.add(...commonClasses)
    button.style.marginRight = '2px'
    button.textContent = title // Using textContent is faster than innerText

    // Use event delegation instead of individual listeners when possible
    button.dataset.chatText = text

    fragment.appendChild(button)
  })

  // Add event delegation to the container - one listener instead of many
  chatButtonContainer.addEventListener('click', (e) => {
    const target = e.target
    if (target.tagName === 'BUTTON' && target.dataset.chatText) {
      chatInput.value = target.dataset.chatText
      chatButton.click()
    }
  })

  // Append all buttons at once
  chatButtonContainer.appendChild(fragment)
  chatPanel.appendChild(chatButtonContainer)

  return true
}

function setupChatButtons(chatPanel) {
  try {
    const chatInput = document.querySelector('.iogc-ChatPanel-input input.gwt-TextBox')
    const chatButton = document.querySelector('.iogc-ChatPanel-input button')

    if (!chatInput || !chatButton) {
      console.warn('🃏 gpokr: Could not find chat input or button elements')
      return false
    }

    // Check if we already added the buttons to avoid duplication
    if (document.querySelector('.iogc-chat-buttons')) {
      return true
    }

    // Get buttons data from storage
    chrome.storage.sync.get(['chatButtons'], (result) => {
      try {
        const chatButtonsData = result.chatButtons || [
          { text: 'gg', title: 'gg 🃏' },
          { text: 'gl 2 all fiends, lets lagggg', title: 'gadbois' },
          { text: 'ty', title: 'ty' },
          { text: 'nh', title: 'nh' },
          { text: 'lol', title: 'lol 😜' },
          { text: 'rofl', title: 'rofl' },
        ]

        createChatButtons(chatPanel, chatInput, chatButton, chatButtonsData)
        console.log("🃏 gpokr's chat buttons have been added")
      } catch (error) {
        console.error('🃏 gpokr: Error setting up chat buttons:', error)
      }
    })

    return true
  } catch (error) {
    console.error('🃏 gpokr: Error in setupChatButtons:', error)
    return false
  }
}

// MutationObserver implementation (as provided in previous example)
function initObserver() {
  console.log('🃏 gpokr: Initializing MutationObserver')

  // Set a timeout for element detection
  const timeout = setTimeout(() => {
    console.warn('🃏 gpokr: Timed out waiting for chat panel to appear')
    observer.disconnect()
  }, 30000) // 30 second timeout

  const observer = new MutationObserver((mutations, obs) => {
    const chatPanel = document.querySelector('.iogc-ChatPanel')
    if (chatPanel) {
      const success = setupChatButtons(chatPanel)
      if (success) {
        clearTimeout(timeout)
        obs.disconnect()
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  // Immediate check in case the element already exists
  const chatPanel = document.querySelector('.iogc-ChatPanel')
  if (chatPanel) {
    setupChatButtons(chatPanel)
    clearTimeout(timeout)
    observer.disconnect()
  }
}

// Initialize the observer when the content script runs
initObserver()

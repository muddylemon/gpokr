console.info('🃏 gpokr is running')

const buttonsData = [
  { text: 'gg', title: 'gg 🃏' },
  { text: 'gl 2 all fiends, lets lagggg', title: 'gadbois' },
  { text: 'ty', title: 'ty' },
  { text: 'nh', title: 'nh' },
  { text: 'lol', title: 'lol 😜' },
  { text: 'rofl', title: 'rofl' },
]
const interval = setInterval(() => {
  const chatPanel = document.querySelector('.iogc-ChatPanel')
  if (chatPanel) {
    const chatInput = document.querySelector('.iogc-ChatPanel-input input.gwt-TextBox')
    const chatButton = document.querySelector('.iogc-ChatPanel-input button')

    const chatButtonContainer = document.createElement('div')
    chatButtonContainer.classList.add('iogc-chat-buttons')
    chatButtonContainer.style.display = 'flex'
    chatButtonContainer.style.justifyContent = 'flex-start'
    chatButtonContainer.style.flexWrap = 'wrap'

    // get buttons data from storage
    let chatButtonsData = buttonsData
    chrome.storage.sync.get(['chatButtons'], (result) => {
      if (result.chatButtons) {
        chatButtonsData = result.chatButtons
      }
      chatButtonsData.forEach((buttonData) => {
        const button = document.createElement('button')
        button.classList.add('iogc-NewButton-white')
        button.classList.add('iogc-NewButton')
        button.classList.add('iogc-ButtonSpace-left')
        button.style.rightMargin = '2px'
        button.innerText = buttonData.title
        button.addEventListener('click', () => {
          chatInput.value = `${buttonData.text}`
          chatButton.click()
        })
        chatButtonContainer.appendChild(button)
      })
    })
    console.log('🃏 chatButtonsData', chatButtonsData)

    console.log("🃏 gpokr's chat panel is loaded")
    chatPanel.appendChild(chatButtonContainer)
    clearInterval(interval)
  }
}, 100)

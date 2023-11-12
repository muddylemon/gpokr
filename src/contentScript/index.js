console.info('🃏 gpokr is running')

const buttonsData = [
  { text: 'gg', title: 'gg 🃏' },
  { text: 'gl 2 all fiends, lets lagggg', title: 'gadbois' },
  { text: 'ty', title: 'ty' },
  { text: 'nh', title: 'nh' },
  { text: 'lol', title: 'lol 😜' },
  { text: 'rofl', title: 'rofl' },
]

const chatInput = document.querySelector('.iogc-ChatPanel-input input.gwt-TextBox')
const chatButton = document.querySelector('.iogc-ChatPanel-input button')

const chatButtons = document.createElement('div')
chatButtons.classList.add('iogc-chat-buttons')
chatButtons.style.display = 'flex'
chatButtons.style.justifyContent = 'flex-start'
chatButtons.style.flexWrap = 'wrap'

buttonsData.forEach((buttonData) => {
  const button = document.createElement('button')
  button.classList.add(['iogc-NewButton-white', 'iogc-NewButton', 'iogc-ButtonSpace-left'])
  button.innerText = buttonData.text
  button.title = buttonData.title
  button.addEventListener('click', () => {
    chatInput.value = chatInput.value + ' ' + buttonData.text
    chatButton.click()
  })
  chatButtons.appendChild(button)
})

const interval = setInterval(() => {
  const chatPanel = document.querySelector('.iogc-ChatPanel')
  if (chatPanel) {
    console.log("🃏 gpokr's chat panel is loaded")
    chatPanel.appendChild(chatButtons)
    clearInterval(interval)
  }
}, 100)

import './Options.css'

import React, { useEffect, useState } from 'react'

const defaultChatButtons = [
  { text: 'gg', title: 'gg 🃏' },
  { text: 'gl 2 all fiends, lets lagggg', title: 'gadbois' },
  { text: 'ty', title: 'ty' },
  { text: 'nh', title: 'nh' },
  { text: 'lol', title: 'lol 😜' },
  { text: 'rofl', title: 'rofl' },
]

export const Options = () => {
  const [chatButtons, setChatButtons] = useState(defaultChatButtons)

  useEffect(() => {
    chrome.storage.sync.get(['chatButtons'], (result) => {
      if (result.chatButtons) {
        setChatButtons(result.chatButtons)
      }
    })
  }, [])

  const updateChatButtons = (newChatButtons) => {
    chrome.storage.sync.set({ chatButtons: newChatButtons }, () => {
      setChatButtons(newChatButtons)
      console.log('Chat buttons updated')
    })
  }
  // add a new chat button
  const addChatButton = () => {
    const newChatButtons = [...chatButtons, { text: '', title: '' }]
    updateChatButtons(newChatButtons)
  }

  return (
    <main>
      <h3>Gpokr Options Page</h3>
      <div className="edit-chat-buttons">
        {chatButtons.map((button, index) => (
          <div key={index}>
            <input
              type="text"
              value={button.title}
              onChange={(e) => {
                const newChatButtons = [...chatButtons]
                newChatButtons[index].title = e.target.value
                updateChatButtons(newChatButtons)
              }}
            />
            <input
              type="text"
              value={button.text}
              onChange={(e) => {
                const newChatButtons = [...chatButtons]
                newChatButtons[index].text = e.target.value
                updateChatButtons(newChatButtons)
              }}
            />
          </div>
        ))}
      </div>
      <button onClick={addChatButton}>Add Chat Button</button>
    </main>
  )
}

export default Options

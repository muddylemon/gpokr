import './Options.css'

// src/options/Options.jsx
import React, { useEffect, useState } from 'react'

const Options = () => {
  console.log('Loading options page')
  const [chatButtons, setChatButtons] = useState([])
  const [status, setStatus] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load saved chat buttons and theme preference
  useEffect(() => {
    chrome.storage.sync.get(['chatButtons', 'isDarkMode'], (result) => {
      if (result.chatButtons && result.chatButtons.length > 0) {
        setChatButtons(result.chatButtons)
      } else {
        // Default buttons if none are saved
        setChatButtons([
          { text: 'gg', title: 'gg 🃏' },
          { text: 'gl 2 all fiends, lets lagggg', title: 'gadbois' },
          { text: 'ty', title: 'ty' },
          { text: 'nh', title: 'nh' },
          { text: 'lol', title: 'lol 😜' },
          { text: 'rofl', title: 'rofl' },
        ])
      }

      setIsDarkMode(result.isDarkMode === true)
    })
  }, [])

  // Save theme preference when it changes
  useEffect(() => {
    chrome.storage.sync.set({ isDarkMode })

    // Apply theme to document
    document.body.classList.toggle('dark-theme', isDarkMode)
  }, [isDarkMode])

  // Save chat buttons to storage
  const saveChatButtons = (newButtons) => {
    chrome.storage.sync.set({ chatButtons: newButtons }, () => {
      setChatButtons(newButtons)
      showStatus('Changes saved!')
    })
  }

  // Show status message temporarily
  const showStatus = (message) => {
    setStatus(message)
    setTimeout(() => setStatus(''), 2000)
  }

  // Add a new chat button
  const addChatButton = () => {
    const newChatButtons = [...chatButtons, { text: '', title: '' }]
    saveChatButtons(newChatButtons)
  }

  // Remove a chat button
  const removeChatButton = (index) => {
    const newChatButtons = chatButtons.filter((_, i) => i !== index)
    saveChatButtons(newChatButtons)
  }

  // Update a chat button
  const updateChatButton = (index, field, value) => {
    const newChatButtons = [...chatButtons]
    newChatButtons[index][field] = value
    setChatButtons(newChatButtons)
  }

  // Reset to default buttons
  const resetToDefaults = () => {
    if (window.confirm('Reset to default chat buttons?')) {
      const defaultButtons = [
        { text: 'gg', title: 'gg 🃏' },
        { text: 'gl 2 all fiends, lets lagggg', title: 'gadbois' },
        { text: 'ty', title: 'ty' },
        { text: 'nh', title: 'nh' },
        { text: 'lol', title: 'lol 😜' },
        { text: 'rofl', title: 'rofl' },
      ]
      saveChatButtons(defaultButtons)
    }
  }

  return (
    <div className="options-container">
      <header>
        <div className="logo">
          <img src="../img/logo-48.png" alt="gpokr logo" />
          <h1>GPokr Extension</h1>
        </div>
        <div className="theme-toggle">
          <span>{isDarkMode ? '🌙' : '☀️'}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </header>

      <main>
        <section className="options-section">
          <h2>Custom Chat Buttons</h2>
          <p className="section-description">
            Configure quick chat messages for the gpokr website. The "Button Label" is what appears
            on the button, and the "Chat Message" is what gets sent when clicked.
          </p>

          <div className="chat-buttons-container">
            <div className="button-row header-row">
              <div className="button-label">Button Label</div>
              <div className="button-text">Chat Message</div>
              <div className="button-actions"></div>
            </div>

            {chatButtons.map((button, index) => (
              <div className="button-row" key={index}>
                <div className="button-label">
                  <input
                    type="text"
                    value={button.title}
                    placeholder="Button label"
                    onChange={(e) => updateChatButton(index, 'title', e.target.value)}
                    onBlur={() => saveChatButtons(chatButtons)}
                  />
                </div>
                <div className="button-text">
                  <input
                    type="text"
                    value={button.text}
                    placeholder="Chat message"
                    onChange={(e) => updateChatButton(index, 'text', e.target.value)}
                    onBlur={() => saveChatButtons(chatButtons)}
                  />
                </div>
                <div className="button-actions">
                  <button
                    className="delete-button"
                    onClick={() => removeChatButton(index)}
                    title="Remove button"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="button-controls">
            <button className="add-button" onClick={addChatButton}>
              Add Chat Button
            </button>
            <button className="reset-button" onClick={resetToDefaults}>
              Reset to Defaults
            </button>
            {status && <div className="status-message">{status}</div>}
          </div>
        </section>

        <section className="options-section">
          <h2>Preview</h2>
          <p className="section-description">Here's how your buttons will look in gpokr:</p>

          <div className="preview-container">
            <div className="chat-preview">
              {chatButtons.map(
                (button, index) =>
                  button.title && (
                    <button key={index} className="preview-button" title={button.text}>
                      {button.title}
                    </button>
                  ),
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>GPokr Extension v0.0.1 • Made with ♠️ ♥️ ♣️ ♦️</p>
      </footer>
    </div>
  )
}

export default Options

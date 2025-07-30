console.info('🃏 gpokr is running')

// Function to efficiently create chat buttons
function createChatButtons(chatPanel, chatInput, chatButton, buttonData) {
  // Remove existing buttons if they exist to prevent duplication on re-render
  const existingContainer = chatPanel.querySelector('.iogc-chat-buttons')
  if (existingContainer) {
    existingContainer.remove()
  }

  const chatButtonContainer = document.createElement('div')
  chatButtonContainer.classList.add('iogc-chat-buttons')
  chatButtonContainer.style.cssText =
    'display:flex;justify-content:flex-start;flex-wrap:wrap;margin-top: 5px;' // Added margin-top

  const fragment = document.createDocumentFragment()
  const commonClasses = ['iogc-NewButton-white', 'iogc-NewButton', 'iogc-ButtonSpace-left']

  buttonData.forEach(({ text, title }) => {
    const button = document.createElement('button')
    button.classList.add(...commonClasses)
    button.style.marginRight = '2px'
    button.textContent = title
    button.dataset.chatText = text
    fragment.appendChild(button)
  })

  chatButtonContainer.addEventListener('click', (e) => {
    const target = e.target
    if (target.tagName === 'BUTTON' && target.dataset.chatText) {
      chatInput.value = target.dataset.chatText
      chatButton.click()
    }
  })

  chatButtonContainer.appendChild(fragment)
  chatPanel.appendChild(chatButtonContainer)

  return true
}

// Function to apply dark mode and layout adjustments
function applyStyles(isDarkMode, hideHeader, hideSidebar) {
  console.log(
    '🃏 gpokr: Applying styles - Dark Mode:',
    isDarkMode,
    'Hide Header:',
    hideHeader,
    'Hide Sidebar:',
    hideSidebar,
  )

  // Apply dark mode styles
  const styleId = 'gpokr-dark-mode-styles'
  let styleTag = document.getElementById(styleId)

  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = styleId
    document.head.appendChild(styleTag)
  }

  let styles = ''

  if (isDarkMode) {
    styles += `
      /* General Dark Mode */
      body, html {
        background-color: #1a1a2e !important;
        color: #e0e0e0 !important;
      }
      /* Specific elements from gpokr.html and observed elements */
      #all, #outside, #mainpage, .iogc-GameWindow, .iogc-GameWindow-table,
      .iogc-MessagePanel-messages, .iogc-ChatPanel-messages,
      .iogc-SidePanel-inner, .iogc-LoginPanel, .iogc-tourny, .iogc-friends,
      .iogc-PlayerFavoritePanel, .iogc-favoritePanel-list,
      .iogc-CountdownPanel, .iogc-TouryCountdownPanel,
      .iogc-HeaderPanel, .rdews-RoundedComposite,
      .gwt-MenuBarPopup, .iogc-PlayerMenuImpl, .gwt-DialogBox .Caption,
      .iogc-DialogOuter, .gwt-TabBar .gwt-TabBarItem, .gwt-TabBar .gwt-TabBarItem-selected,
      .iogc-ScrollTable-scroll, .iogc-Controls, .gpokr-commandPanel,
      .iogc-NewButton-white, .iogc-NewButton-white:visited,
      .iogc-PlayerPanel .iogc-GamePanel,
      .gpokr-PlayerPanel-onsitout .iogc-GamePanel,
      .iogc-PlayerPanel-onturn .iogc-GamePanel,
      .iogc-PlayerStatsPanel, .iogc-PlayerPanel-name,
      .iogc-ChatPanel-input input.gwt-TextBox,
      .iogc-ChatPanel-input button.iogc-NewButton-white,
      .iogc-chat-buttons button.iogc-NewButton-white,
      .iogc-chat-buttons button.iogc-NewButton-white:visited,
      .iogc-chat-buttons button.iogc-NewButton-white:hover {
        background-color: #2a2a4a !important;
        color: #e0e0e0 !important;
        border-color: #444 !important;
      }

      /* Text and link colors */
      a, a:visited, a:hover,
      .iogc-LoginPanel-nameHeading, .iogc-LoginPanl-item a,
      .iogc-SidePanel-title, .iogc-tourny-item a,
      .iogc-tourny-table, .iogc-tourny-itemout a,
      .iogc-PlayerFavoritePanel-title a,
      .iogc-LoginPanelSmall-name, .iogc-LoginPanel-name,
      .iogc-GameWindow .title, .title .gwt-MenuItem,
      .gwt-MenuBarPopup .gwt-MenuItem,
      #playerTable div, #playerTable a,
      .iogc-GameWindow-replay a, .replay .iogc-GameWindow-replay a,
      .replay .iogc-GameWindow-replay a.selected,
      .iogc-PlayerMenuImpl a, .iogc-PlayerMenuImpl a:visited,
      .iogc-ChatPanel-messages div, .iogc-MessagePanel-messages div,
      .iogc-GettingStarted-message, .iogc-GettingStarted-next,
      .iogc-TipBubble-content, .iogc-TipStep-title, .iogc-TipStep-body,
      .iogc-NewButton-white, .iogc-NewButton-white:visited,
      .gpokr-GameWindow-potLabel, .gpokr-score,
      .iogc-PlayerPanel-name a, .iogc-PlayerPanel-name a:visited,
      .iogc-PlayerPanel-stat, .gwt-InlineLabel,
      .iogc-PlayerStatsPanel, .iogc-PlayerPanel-levelstat,
      .iogc-CountdownPanel-title, .iogc-CountdownPanel-desc,
      .iogc-TouryCountdownPanel-title, .iogc-TouryCountdownPanel-desc,
      .iogc-CountdownPanel-timer, .iogc-TouryCountdownPanel-timer,
      .iogc-TouryCountdownPanel-registered,
      .iogc-SignIn-registerHTML, .iogc-SignIn-registerHTML b,
      .iogc-SignIn-moreDetailsGame, .iogc-SignIn-moreDetailsStat,
      .iogc-SignIn-moreDetailsStat b, .iogc-SignIn-label,
      .iogc-SignIn-link a, .iogc-LoginPanel-quotePanel .quoteh,
      .iogc-LoginPanel-quotePanel .quote, .iogc-LoginPanel-quotePanel .quoteAuth,
      .footerGroup, .footerHeading, .footerSection, .footerSection a,
      .menu2 li a, .menu2 li a:visited {
        color: #e0e0e0 !important;
      }

      /* Specific background and border adjustments */
      #all {
        background-image: none !important; /* Remove old background image */
      }
      .iogc-GameWindow-layout {
        background: #3a3a4a !important;
        border-color: #555 !important;
      }
      .iogc-NewButton {
        background-color: #555 !important;
        border-color: #777 #333 #333 #777 !important;
      }
      .iogc-NewButton:hover {
        background-color: #777 !important;
      }
      .iogc-NewButton-green, .iogc-NewButton-green:visited {
        background-color: #4CAF50 !important; /* A darker green */
      }
      .iogc-NewButton-green:hover {
        background-color: #45a049 !important;
      }
      .iogc-NewButton-blue, .iogc-NewButton-blue:visited {
        background-color: #2196F3 !important; /* A darker blue */
      }
      .iogc-NewButton-blue:hover {
        background-color: #0b7dda !important;
      }
      .iogc-NewButton-orange, .iogc-NewButton-orange:visited {
        background-color: #FF9800 !important; /* A darker orange */
      }
      .iogc-NewButton-orange:hover {
        background-color: #fb8c00 !important;
      }
      .iogc-PlayerPanel .iogc-GamePanel {
        background-color: #3d3d5f !important;
        border-top-color: #007bb6 !important; /* Darker blue border */
      }
      .gpokr-PlayerPanel-onsitout .iogc-GamePanel {
        background-color: #333 !important;
        border-top-color: #555 !important;
      }
      .iogc-PlayerPanel-onturn .iogc-GamePanel {
        background-color: #5cb85c !important; /* Darker green for turn */
        border-top-color: #006400 !important;
      }
      .iogc-PlayerPanel-onturn a {
        color: #006400 !important;
      }
      .iogc-CountdownPanel-timer, .iogc-TouryCountdownPanel-timer {
        background-color: #000 !important;
        color: #fff !important;
      }
      .iogc-NewButton-white {
        background-color: #555 !important;
        color: #e0e0e0 !important;
      }
      .iogc-NewButton-white:hover {
        background-color: #777 !important;
      }
      .iogc-chat-buttons button {
        background-color: #555 !important;
        color: #e0e0e0 !important;
      }
      .iogc-chat-buttons button:hover {
        background-color: #777 !important;
      }
      .iogc-chatArrive, .iogc-chatLeave {
        color: #aaa !important;
      }
      .iogc-chatNew {
        color: #0a0 !important;
      }
      .iogc-chatLevelUp {
        color: #04b !important;
      }
      .gwt-DialogBox {
        background-color: rgba(0, 0, 0, 0.95) !important;
      }
      .gwt-DialogBox .Caption {
        color: #fff !important;
      }
      .iogc-GettingStarted-message {
        color: #6ad !important; /* Keep original color for emphasis */
      }
      .iogc-TipBubble-container {
        background-color: #333 !important;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.75) !important;
      }
      .iogc-TipBubble-top, .iogc-TipBubble-right, .iogc-TipBubble-bottom, .iogc-TipBubble-left {
        border-color: transparent transparent #333 transparent !important;
      }
      .iogc-NewButton-white, .iogc-NewButton-white:visited {
        background-color: #444 !important;
        color: #e0e0e0 !important;
        text-shadow: none !important;
      }
      .iogc-NewButton-white:hover {
        background-color: #666 !important;
      }
      .iogc-GameWindow-table.GI0BGFXCEI {
        background-image: none !important; /* Remove background image for poker table */
        background-color: #3a3a4a !important; /* Darker background for table */
      }
      .gpokr-ChipStack-label {
        color: #fff !important;
        background-color: #000 !important;
      }
      .gwt-TextBox {
        background-color: #3a3a4a !important;
        color: #e0e0e0 !important;
        border: 1px solid #555 !important;
      }
      .gwt-TextBox:focus {
        border-color: var(--primary-color) !important;
      }
      .menu2 {
        background-color: #2a2a4a !important;
        border-bottom: 1px solid #444 !important;
      }
      .menu2 li a:hover {
        background-color: #3a3a4a !important;
      }
      .footerGroup, .footerHeading {
        background-color: #2a2a4a !important;
        border-color: #444 !important;
      }
      .footerSection {
        color: #ccc !important;
      }
      .footerSection a {
        color: #61dafb !important; /* Keep a distinct link color */
      }
      .hmenu {
        background-color: #2a2a4a !important;
      }
      .hmenu a.current {
        background-color: #3a3a4a !important;
        color: #e0e0e0 !important;
      }
      .hmenu a.notcurrent {
        color: #aaa !important;
      }
      .profilemenu a.current, .profilemenu a.current:visited {
        color: #e0e0e0 !important;
      }
      .profilemenu a.notcurrent, .profilemenu a.notcurrent:visited {
        color: #61dafb !important;
      }
      #profile h2 span {
        color: #e0e0e0 !important;
      }
      #profile .tagline {
        color: #ccc !important;
      }
      .mainheader a, .mainheader a:visited {
        color: #ccc !important;
      }
      #forum .header {
        background-color: #3a3a4a !important;
        border-top-color: #555 !important;
      }
      .statCard {
        background-color: #3a3a4a !important;
      }
      .blockGray {
        background-color: #555 !important;
      }
      .blockDarkGray {
        background-color: #777 !important;
      }
      .blockBlue {
        background-color: #61dafb !important;
      }
      .iogc-tourny-odd {
        background-color: #3a3a4a !important;
      }
      .iogc-tourny-table {
        background: #4a4a6a !important;
      }
      .iogc-favoritePanelSmall {
        background-color: #3a3a4a !important;
        border-color: #555 !important;
      }
      .iogc-favoritePanelSmall-popup {
        background-color: #3a3a4a !important;
        border-color: #555 !important;
      }
      .iogc-GlassPanel {
        background-color: rgba(0, 0, 0, 0.7) !important; /* Slightly more opaque */
      }
    `
  }

  // Apply layout adjustments
  if (hideHeader) {
    styles += `
      #hd { display: none !important; }
      /* Adjust main content to take up the space */
      #all { margin-top: 0 !important; }
      #page { margin-top: 0 !important; }
    `
  } else {
    // Ensure header is visible if toggle is off
    styles += `#hd { display: flex !important; }`
  }

  if (hideSidebar) {
    styles += `
      /* Hide the sidebar itself */
      #menu-out {
        display: none !important;
      }

      /* Adjust the main content area to take full width */
      #yui-main {
        width: 100% !important;
        float: none !important; /* Remove float */
        margin-left: 0 !important;
        margin-right: 0 !important;
      }

      /* Override YUI grid specific floats and margins for #yui-main when sidebar is hidden */
      .yui-t4 #yui-main {
        float: none !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }

      /* Ensure parent containers are flexible */
      #all, #page {
        width: 100% !important;
        min-width: unset !important; /* Remove min-width constraints */
        display: block !important; /* Revert to block to avoid flex issues if not needed */
        height: auto !important; /* Let content define height */
        box-sizing: border-box !important;
      }
      #bd {
        width: 100% !important; /* Ensure body content takes full width */
        display: flex !important; /* Use flexbox for layout */
      }
      /* Override fixed width for #doc and related YUI grid elements */
      #doc, #doc2, #doc3, .yui-t1, .yui-t2, .yui-t3, .yui-t4, .yui-t5, .yui-t6, .yui-t7 {
        width: 100% !important;
        min-width: unset !important;
      }
      
      /* Ensure the main game content area takes available height */
      #mainpage {
        flex-grow: 1 !important; /* Allow it to grow and fill available space */
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important; /* Ensure it takes full width */
      }
      #GGame {
        flex-grow: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
      }
      .iogc-GameWindow {
        flex-grow: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
      }
      .iogc-GameWindow-layout {
        flex-grow: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
      }
      .iogc-GameWindow-table {
        flex-grow: 1 !important;
        height: auto !important; /* Allow height to be determined by flex-grow */
        width: 100% !important; /* Ensure it takes full width */
      }
      .iogc-MessagesPanel, .iogc-ChatPanel {
        height: auto !important; /* Allow chat/messages panel to adjust height */
        flex-shrink: 0; /* Prevent it from shrinking */
      }
      .iogc-MessagesPanel td, .iogc-ChatPanel td {
        height: auto !important;
      }
      .iogc-MessagePanel-messages, .iogc-ChatPanel-messages {
        height: 150px !important; /* Give a fixed height to chat/message scroll areas */
        min-height: 100px !important; /* Ensure minimum height */
      }
      /* Adjust footer positioning if necessary */
      footer {
        position: relative !important;
        width: 100% !important;
        margin-top: 20px !important; /* Add some margin */
      }
    `
  } else {
    // Revert sidebar visibility and layout if toggle is off
    styles += `
      /* Revert sidebar to its original display and positioning */
      #menu-out {
        display: block !important;
        position: relative !important; /* Ensure it's positioned relative to its parent */
        float: left !important; /* Assuming it floats left in original layout */
        width: 23.0759em !important; /* Example width, adjust based on actual original */
        margin-left: 0 !important; /* Reset margin */
        margin-right: 0 !important; /* Reset margin */
      }

      /* Revert main content area to its original positioning relative to sidebar */
      #yui-main {
        display: block !important;
        float: right !important; /* Assuming it floats right in original layout */
        width: 100% !important; /* Original YUI behavior where main content takes remaining width */
        margin-left: -25em !important; /* Original YUI negative margin to pull it left */
        margin-right: 0 !important; /* Reset margin */
      }

      /* Specific YUI grid overrides for .yui-t4 where sidebar is on the right */
      .yui-t4 #yui-main {
        float: left !important; /* Main content floats left */
        margin-right: 14.8456em !important; /* Margin for sidebar on right */
        margin-left: 0 !important; /* Reset left margin */
      }
      .yui-t4 #menu-out {
        display: block !important;
        float: right !important; /* Sidebar floats right */
        width: 13.8456em !important; /* Original width for right sidebar */
        margin-left: 0 !important; /* Reset margin */
        margin-right: 0 !important; /* Reset margin */
      }

      /* Revert overall page and container widths/display */
      #page, #all, #bd {
        width: 1000px !important; /* Revert to original fixed width */
        min-width: 750px !important; /* Revert min-width */
        display: block !important;
        height: auto !important;
        box-sizing: content-box !important;
      }
      /* Revert YUI grid widths to original values */
      #doc, #doc2, #doc3, .yui-t1, .yui-t2, .yui-t3, .yui-t4, .yui-t5, .yui-t6, .yui-t7 {
        width: 57.69em !important; /* Revert to original fixed width */
        *width: 56.3em !important; /* IE hack */
        min-width: 750px !important;
      }
      #doc2 {
        width: 73.074em !important;
        *width: 71.313em !important; /* IE hack */
        min-width: 950px !important;
      }
      
      /* Revert flexbox properties for main content areas */
      #mainpage, #GGame, .iogc-GameWindow, .iogc-GameWindow-layout {
        display: block !important;
        flex-grow: unset !important;
        width: auto !important;
      }
      .iogc-GameWindow-table {
        height: 390px !important; /* Revert to original fixed height */
        width: auto !important;
      }
      .iogc-MessagesPanel, .iogc-ChatPanel {
        height: auto !important;
        flex-shrink: unset !important;
      }
      .iogc-MessagePanel-messages, .iogc-ChatPanel-messages {
        height: 130px !important; /* Revert to original fixed height */
        min-height: unset !important;
      }
      footer {
        position: static !important;
        margin-top: 30px !important;
      }
    `
  }

  styleTag.textContent = styles
}

// Function to set up chat buttons and apply initial styles
function setupPageElements() {
  const chatPanel = document.querySelector('.iogc-ChatPanel')
  const chatInput = document.querySelector('.iogc-ChatPanel-input input.gwt-TextBox')
  const chatButton = document.querySelector('.iogc-ChatPanel-input button')
  const gameWindow = document.querySelector('.iogc-GameWindow')
  const header = document.getElementById('hd')
  const sidebar = document.getElementById('menu-out')

  if (!chatPanel || !chatInput || !chatButton || !gameWindow || !header || !sidebar) {
    // Elements not found yet, observer will retry
    return false
  }

  // Get preferences from storage and apply
  chrome.storage.sync.get(['chatButtons', 'isDarkMode', 'hideHeader', 'hideSidebar'], (result) => {
    const chatButtonsData = result.chatButtons || [
      { text: 'gg', title: 'gg 🃏' },
      { text: 'gl 2 all fiends, lets lagggg', title: 'gadbois' },
      { text: 'ty', title: 'ty' },
      { text: 'nh', title: 'nh' },
      { text: 'lol', title: 'lol 😜' },
      { text: 'rofl', title: 'rofl' },
    ]
    createChatButtons(chatPanel, chatInput, chatButton, chatButtonsData)

    applyStyles(result.isDarkMode === true, result.hideHeader === true, result.hideSidebar === true)
    console.log("🃏 gpokr's features have been applied.")
  })

  return true
}

// MutationObserver to detect when the chat panel and other elements are available
function initObserver() {
  console.log('� gpokr: Initializing MutationObserver for page elements')

  const observer = new MutationObserver((mutations, obs) => {
    const success = setupPageElements()
    if (success) {
      obs.disconnect() // Disconnect once elements are found and styles applied
      console.log('🃏 gpokr: MutationObserver disconnected.')
    }
  })

  // Observe the entire body for changes, including subtree modifications
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  // Immediate check in case the elements already exist on initial load
  if (setupPageElements()) {
    observer.disconnect()
    console.log('🃏 gpokr: Elements found on initial load, observer disconnected.')
  }
}

// Listen for messages from the options page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'apply-styles') {
    applyStyles(request.isDarkMode, request.hideHeader, request.hideSidebar)
    sendResponse({ status: 'styles applied' })
  } else if (request.action === 'update-chat-buttons') {
    const chatPanel = document.querySelector('.iogc-ChatPanel')
    const chatInput = document.querySelector('.iogc-ChatPanel-input input.gwt-TextBox')
    const chatButton = document.querySelector('.iogc-ChatPanel-input button')
    if (chatPanel && chatInput && chatButton) {
      createChatButtons(chatPanel, chatInput, chatButton, request.chatButtons)
      sendResponse({ status: 'chat buttons updated' })
    } else {
      console.warn('🃏 gpokr: Could not find chat elements to update buttons.')
      sendResponse({ status: 'chat elements not found' })
    }
  }
})

// Initialize the observer when the content script runs
initObserver()

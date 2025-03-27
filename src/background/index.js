console.log('background is running')

// Function to update declarative net request rules at runtime
async function updateRules() {
  try {
    // Get the extension ID
    const extensionId = chrome.runtime.id
    console.log('Extension ID:', extensionId)

    // Check existing rules
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules()
    const ruleIds = existingRules.map((rule) => rule.id)

    // Remove existing rules
    if (ruleIds.length > 0) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ruleIds,
      })
    }

    // Add new rule with correct extension ID
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id: 1,
          priority: 1,
          action: {
            type: 'redirect',
            redirect: {
              url: `chrome-extension://${extensionId}/sounds/cards.mp3`,
            },
          },
          condition: {
            urlFilter: '|https://gpokr.com/gpokr2/sound/your_turn.mp3',
            resourceTypes: ['media'],
          },
        },
      ],
    })

    console.log('Updated declarativeNetRequest rules with current extension ID')
  } catch (error) {
    console.error('Error updating rules:', error)
  }
}

// Update rules when the extension starts
updateRules()

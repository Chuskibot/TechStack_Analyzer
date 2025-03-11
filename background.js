// Listen for installation event
chrome.runtime.onInstalled.addListener(function() {
  console.log('Website Tech Stack Analyzer extension installed');
});

// Track which tabs have content scripts ready
const contentScriptReadyTabs = {};

// Cache for API responses to avoid repeated calls for the same URL
const apiCache = {};

// Cache for tech stack results to be passed to popup
const techStackResults = {};

// Function to inject the content script manually if needed
function injectContentScript(tabId, callback) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js']
  }, function(results) {
    console.log('Content script injected manually', results);
    if (callback) callback(results);
  });
}

// Listen for when the extension icon is clicked
chrome.action.onClicked.addListener(function(tab) {
  // This won't actually run since we have a default popup,
  // but it's here as a fallback in case the popup is disabled
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      alert('Please use the popup to analyze the tech stack of this website.');
    }
  });
});

// Listen for tab updates to track when content scripts should be ready
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    // Mark that this tab should have a content script ready soon
    contentScriptReadyTabs[tabId] = {
      timestamp: Date.now(),
      url: tab.url,
      ready: false
    };
    
    console.log('Tab updated, content script should initialize soon', tabId);
    
    // Clear any cached results for this tab when the page changes
    if (techStackResults[tabId]) {
      delete techStackResults[tabId];
      console.log('Cleared cached tech stack results for tab', tabId);
    }
  }
});

// Clean up old cache entries periodically
setInterval(function() {
  const now = Date.now();
  
  // Clean up tech stack results older than 5 minutes
  Object.keys(techStackResults).forEach(tabId => {
    if (techStackResults[tabId].timestamp < now - 300000) { // 5 minutes
      delete techStackResults[tabId];
      console.log('Cleaned up old tech stack results for tab', tabId);
    }
  });
  
  // Clean up API cache older than 1 hour
  Object.keys(apiCache).forEach(url => {
    if (apiCache[url].timestamp < now - 3600000) { // 1 hour
      delete apiCache[url];
      console.log('Cleaned up old API cache for URL', url);
    }
  });
  
  // Clean up content script ready status older than 30 minutes
  Object.keys(contentScriptReadyTabs).forEach(tabId => {
    if (contentScriptReadyTabs[tabId].timestamp < now - 1800000) { // 30 minutes
      delete contentScriptReadyTabs[tabId];
      console.log('Cleaned up old content script ready status for tab', tabId);
    }
  });
}, 300000); // Run every 5 minutes

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Background script received message:', request, sender);
  
  // Handle content script ready notification
  if (request.action === "contentScriptReady") {
    const tabId = sender.tab.id;
    contentScriptReadyTabs[tabId] = {
      timestamp: Date.now(),
      url: request.url,
      ready: true
    };
    console.log('Content script ready in tab', tabId);
    sendResponse({success: true});
    return true;
  }
  
  if (request.action === "getTabInfo") {
    // Get information about the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs && tabs.length > 0) {
        sendResponse({ tab: tabs[0] });
      } else {
        sendResponse({ error: "No active tab found" });
      }
    });
    return true; // Keep the message channel open for async response
  }
  
  // Check if content script is ready
  if (request.action === "isContentScriptReady") {
    const tabId = request.tabId;
    if (contentScriptReadyTabs[tabId] && contentScriptReadyTabs[tabId].ready) {
      sendResponse({ ready: true });
    } else {
      // Try to inject the content script if it's not ready
      injectContentScript(tabId, function() {
        // Wait a bit for the script to initialize
        setTimeout(function() {
          contentScriptReadyTabs[tabId] = {
            timestamp: Date.now(),
            url: request.url,
            ready: true
          };
        }, 500);
      });
      sendResponse({ ready: false });
    }
    return true;
  }
  
  // Handle API cache requests
  if (request.action === "checkApiCache") {
    const url = request.url;
    if (apiCache[url] && apiCache[url].timestamp > Date.now() - 3600000) { // Cache valid for 1 hour
      sendResponse({ cached: true, data: apiCache[url].data });
    } else {
      sendResponse({ cached: false });
    }
    return true;
  }
  
  // Store API response in cache
  if (request.action === "storeApiCache") {
    const url = request.url;
    const data = request.data;
    apiCache[url] = {
      timestamp: Date.now(),
      data: data
    };
    sendResponse({ success: true });
    return true;
  }
  
  // Store tech stack results from content script
  if (request.action === "techStackResults") {
    // Store the results with the sender tab ID as the key
    if (sender && sender.tab && sender.tab.id) {
      techStackResults[sender.tab.id] = {
        timestamp: Date.now(),
        results: request.results
      };
      console.log('Stored tech stack results for tab', sender.tab.id, request.results);
    }
    return true;
  }
  
  // Store direct detection results from popup
  if (request.action === "storeDirectResults") {
    const tabId = request.tabId;
    techStackResults[tabId] = {
      timestamp: Date.now(),
      results: request.results
    };
    console.log('Stored direct detection results for tab', tabId, request.results);
    sendResponse({ success: true });
    return true;
  }
  
  // Get tech stack results for popup
  if (request.action === "getTechStackResults") {
    const tabId = request.tabId;
    if (techStackResults[tabId] && techStackResults[tabId].timestamp > Date.now() - 300000) { // Results valid for 5 minutes
      console.log('Returning cached tech stack results for tab', tabId);
      sendResponse({ success: true, results: techStackResults[tabId].results });
    } else {
      console.log('No tech stack results found for tab', tabId);
      sendResponse({ success: false });
    }
    return true;
  }
}); 
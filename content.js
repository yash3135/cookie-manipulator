chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getCookies") {
      sendResponse({ cookies: document.cookie });
    }
  });
  
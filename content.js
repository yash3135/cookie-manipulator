chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getCookies") {
    sendResponse({ cookies: document.cookie });
  }
  if (request.action === "setCookies") {
    try {
        document.cookie = '';
        const cookies = JSON.parse(request.data);
        Object.entries(cookies).forEach(([key, value]) => {
          if (typeof(value) === 'object' && value !== null) {
            let subObject = JSON.stringify(value);
            document.cookie = `${key}=${encodeURIComponent(subObject)};`
          }
          else {
            document.cookie = `${key}=${encodeURIComponent(value)};`
          }
        });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
});

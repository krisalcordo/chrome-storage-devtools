export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getExtensions") {
    console.log('message recieved')
    chrome.management.getAll((extensions) => {
      sendResponse({ extensions });
    });
    return true; // Keep the message channel open for async response
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // read changeInfo data and do something with it
  // like send the new url to content-scripts.js
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: "hello!",
      url: changeInfo.url,
    });
  }
});

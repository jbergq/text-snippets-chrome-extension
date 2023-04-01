chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "saveSnippet",
    title: "Save Snippet",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "saveSnippet") {
    chrome.tabs.sendMessage(tab.id, { action: "saveSnippet" });
  }
});

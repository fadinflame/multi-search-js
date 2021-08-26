chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ google: true, yandex: true, duckduckgo: true, bing: true });
});
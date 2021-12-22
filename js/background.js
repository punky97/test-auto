let status = 'on';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({status});
    console.log('Default status set', `status: ${status}`);
});

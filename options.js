const switches = {
    'google': document.getElementById('google-switch'),
    'yandex': document.getElementById('yandex-switch'),
    'duckduckgo': document.getElementById('duckduckgo-switch'),
    'bing': document.getElementById('bing-switch')
}

// restore options from storage
chrome.storage.sync.get(['google', 'yandex', 'duckduckgo', 'bing'], function (data) {
    switches['google'].checked = data.google;
    switches['yandex'].checked = data.yandex;
    switches['duckduckgo'].checked = data.duckduckgo;
    switches['bing'].checked = data.bing;
});

function saveOptions(){
    // save options to chrome storage
    chrome.storage.sync.set({
        google: switches['google'].checked,
        yandex: switches['yandex'].checked,
        duckduckgo: switches['duckduckgo'].checked,
        bing: switches['bing'].checked,
    }, function () {
        let status = document.getElementById('status');
        status.textContent = 'Settings saved.';
        setTimeout(() => { status.textContent = ''; }, 1500);
    });
}

document.getElementById('save').addEventListener('click', saveOptions);
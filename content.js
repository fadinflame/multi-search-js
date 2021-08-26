let searchEngines = [
    {
        'name': 'Google',
        'query': 'https://www.google.com/search?q=',
        'logo': 'icons/google.svg',
        'enabled': false
    },
    {
        'name': 'Yandex',
        'query': 'https://yandex.ru/search/?text=',
        'logo': 'icons/yandex.svg',
        'enabled': false
    },
    {
        'name': 'DuckDuckGo',
        'query': 'https://duckduckgo.com/?q=',
        'logo': 'icons/duckduckgo.svg',
        'enabled': false
    },
    {
        'name': 'Bing',
        'query': 'https://www.bing.com/search?q=',
        'logo': 'icons/bing.svg',
        'enabled': false
    }
]

// convert from obj to html
function engineToHtml(searchEngine, query) {
    return `<li>
                <a href="${searchEngine.query + query}">
                    <img src="${chrome.runtime.getURL(searchEngine.logo)}" alt="${searchEngine.name}" title="${searchEngine.name}">
                </a>
            </li>`
}

function showSEPanel() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = null;
    
    if (urlParams.has('q')) {
        query = urlParams.get('q')
    } else if (urlParams.has('text')) {
        query = urlParams.get('text');
    }

    let panel = document.createElement("div");
    panel.className = 'multisearch-panel';
    panel.innerHTML += '<ul class="se-list" id="se-list"></ul>';
    document.body.appendChild(panel);

    for (i in searchEngines) {
        if (searchEngines[i].enabled) {
            document.getElementById('se-list').innerHTML += engineToHtml(searchEngines[i], query);
        }
    }
}

// restore options from storage
chrome.storage.sync.get(['google', 'yandex', 'duckduckgo', 'bing'], function (data) {
    searchEngines[0]['enabled'] = data.google;
    searchEngines[1]['enabled'] = data.yandex;
    searchEngines[2]['enabled'] = data.duckduckgo;
    searchEngines[3]['enabled'] = data.bing;

    showSEPanel();
})
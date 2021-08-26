const searchEngines = [
    {
        'name': 'Google',
        'query': 'https://www.google.com/search?q=',
        'logo': 'icons/google.svg'
    },
    {
        'name': 'Yandex',
        'query': 'https://yandex.ru/search/?text=',
        'logo': 'icons/yandex.svg'
    },
    {
        'name': 'DuckDuckGo',
        'query': 'https://duckduckgo.com/?q=',
        'logo': 'icons/duckduckgo.svg'
    },
    {
        'name': 'Bing',
        'query': 'https://www.bing.com/search?q=',
        'logo': 'icons/bing.svg'
    }
]

function engineToHtml(searchEngine, query) {
    return `<li>
                <a href="${searchEngine.query + query}">
                    <img src="${chrome.runtime.getURL(searchEngine.logo)}" alt="${searchEngine.name}" title="${searchEngine.name}">
                </a>
            </li>`
}

function showSEPanel(query) {
    let panel = document.createElement("div");
    panel.className = 'multisearch-panel';
    panel.innerHTML += '<ul class="se-list" id="se-list"></ul>';
    document.body.appendChild(panel);

    for (i in searchEngines) {
        document.getElementById('se-list').innerHTML += engineToHtml(searchEngines[i], query);
    }

}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has('q')) {
    showSEPanel(urlParams.get('q'));
} else if (urlParams.has('text')) {
    showSEPanel(urlParams.get('text'));
}
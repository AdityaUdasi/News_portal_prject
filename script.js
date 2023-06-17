const API_KEY = "521e5fa55904450a9390c7121674bc00";
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load' , () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews (query){
    const response = await fetch(`${url}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('news-card-template');

    cardContainer.innerHTML = '';

    articles.forEach(e => {
        if(e.urlToImage){
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone , e);
            cardContainer.appendChild(cardClone);
        }
    });
}

function fillDataInCard(cardClone , e) {
    const newsimg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-src');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsimg.src = e.urlToImage;
    newsTitle.innerHTML = e.title;
    newsDesc.innerHTML = e.description;

    const date = new Date(e.publishedAt).toLocaleString("en-US",{timeZone : "Asia/Jakarta"});

    newsSource.innerHTML = `${e.source.name} * ${date}`;

    cardClone.firstElementChild.addEventListener("click" , ()=> {
        window.open(e.url, "_blank");
    });
}

let curSlectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSlectedNav?.classList.remove('active');
    curSlectedNav = navItem;
    curSlectedNav.classList.add('active');
}


const SearchButton = document.getElementById('search-button');
const SearchText = document.getElementById('search-text');

SearchButton.addEventListener("click" , () => {
   const query = SearchText.value;
   if(!query) return;
   fetchNews(query);
   curSlectedNav?.classList.remove('active');
   curSlectedNav = null;
});
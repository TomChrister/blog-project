const apiArticle = 'https://v2.api.noroff.dev/blog/posts/Tom_Christer';
const carouselContainer = document.getElementById('carousel');
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
let carouselArticleIds = [];
let articlesData = [];
let currentTag = 'all';
let scrollPosition = 0;
let articleWidth = 0;

fetch(apiArticle)
    .then((response) => response.json())
    .then((data) => {
        articlesData = data.data;
        append(articlesData);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });

// Carousel and grid display
function carouselDisplay(data) {
    const carouselContainer = getCarouselContainer();
    carouselContainer.innerHTML = '';
    carouselArticleIds = [];

    data.slice(0, 3).forEach((post) => {
        const updatedDate = new Date(post.created);
        const options = { day: 'numeric', month: 'long', year: 'numeric'};
        const formattedDate = updatedDate.toLocaleDateString('en-GB', options);
        const authorName = post.author.name.replace(/_/g, ' ');

        const div = document.createElement("div");
        div.classList.add("articles-carousel");
        div.innerHTML = `
            <div class="content-container">
            <h2><a href="article.html?id=${post.id}">${post.title}</a></h2>
            <p class="author">${authorName} • ${formattedDate}</p>
            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ''}
            </div>
        `;
        carouselContainer.appendChild(div);
        carouselArticleIds.push(post.id);
    });
    updateArticleWidth();
}

function articleGrid(data) {
    const articleDisplay = getArticleDisplay();
    articleDisplay.innerHTML = '';

    data.forEach((post) => {
        if (carouselArticleIds.includes(post.id)) {
            return;
        }
        const updatedDate = new Date(post.created);
        const options = { day: 'numeric', month: 'long', year: 'numeric'};
        const formattedDate = updatedDate.toLocaleDateString('en-GB', options);
        const authorName = post.author.name.replace(/_/g, ' ');
        const maxChars = 38;
        const introduction = post.body.length > maxChars ? post.body.substring(0, maxChars) + "...":post.body;

        const div = document.createElement("div");
        div.classList.add("articles");
        div.innerHTML = `
            <div class="content-wrapper">
                <a href="article.html?id=${post.id}" aria-label="Read more about the article">${post.media ? `<img class="grid-img" src="${post.media.url}" alt="${post.media.alt}">` : ''}</a>
                <h2>${post.title}</h2>
                <p class="body-p">${introduction}</p>
                <p>${authorName} • ${formattedDate}</p>
            </div>
        `;
        articleDisplay.appendChild(div);
    });
}

function getArticleDisplay() {
    return document.getElementById('articleDisplay');
}

function getCarouselContainer() {
    return document.getElementById('carousel');
}

function append(data) {
    articlesData = data;
    carouselDisplay(data);
    articleGrid(data);
}


// Sort, filtering and search functions
function sortByNewest() {
    let sortedData = [...articlesData].sort((a, b) => new Date(b.created) - new Date(a.created));
    if (currentTag !== 'all') {
        sortedData = sortedData.filter(article => article.tags && article.tags.includes(currentTag));
    }
    articleGrid(sortedData);
}

function sortByOldest() {
    let sortedData = [...articlesData].sort((a, b) => new Date(a.created) - new Date(b.created));
    if (currentTag !== 'all') {
        sortedData = sortedData.filter(article => article.tags && article.tags.includes(currentTag));
    }
    articleGrid(sortedData);
}
sortByNewest();
sortByOldest();

function sortArticles(order) {
    let sortedData;
    if (order === 'newest') {
        sortedData = [...articlesData].sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (order === 'oldest') {
        sortedData = [...articlesData].sort((a, b) => new Date(a.created) - new Date(b.created));
    }

    if (currentTag !== 'all') {
        sortedData = sortedData.filter(article => article.tags && article.tags.includes(currentTag));
    }
    articleGrid(sortedData);
}

document.getElementById('sortSelect').addEventListener('change', function() {
    const selectedOption = this.value;
    sortArticles(selectedOption);
});

function sortByTag(tag) {
    currentTag = tag;
    if (tag === 'all') {
        articleGrid(articlesData);
    } else {
        const filteredData = articlesData.filter(post => post.tags && post.tags.includes(tag));
        articleGrid(filteredData);
    }
}

document.getElementById('tagSelect').addEventListener('change', (event) => {
    const selectedTag = event.target.value;
    sortByTag(selectedTag);
});

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredArticles = articlesData.filter(article =>
        article.title.toLowerCase().includes(query) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)))
    );
    articleGrid(filteredArticles);
}
document.getElementById('searchInput').addEventListener('input', search);


// Carousel scrolling functions
leftBtn.addEventListener("click", scrollLeft);
rightBtn.addEventListener("click", scrollRight);

function scrollLeft() {
    scrollPosition -= articleWidth;
    if (scrollPosition < 0) {
        scrollPosition = carouselContainer.scrollWidth - articleWidth;
    }
    carouselContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

function scrollRight() {
    scrollPosition += articleWidth;
    if (scrollPosition >= carouselContainer.scrollWidth) {
        scrollPosition = 0;
    }
    carouselContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

function updateArticleWidth() {
    const articleElement = document.querySelector('.articles-carousel');
    articleWidth = articleElement ? articleElement.offsetWidth : 0;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// Login and accessToken functions
function loggedIn() {
    const accessToken = sessionStorage.getItem('Session key');
    return accessToken !== null;
}

function updateHeader() {
    const loginAnchor = document.getElementById('loginAnchor');
    if (loggedIn()) {
        loginAnchor.textContent = 'Log out';
        loginAnchor.href = 'index.html';
    } else {
        loginAnchor.textContent = 'Login';
        loginAnchor.href = 'account/login.html'
    }
}
updateHeader();

function logOut() {
    sessionStorage.removeItem('Session key');
    window.location.href = 'index.html';
}

const logoutBtn = document.getElementById('loginAnchor');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logOut);
}

const newPostBtn = document.getElementById('newPost');
if (newPostBtn) {
    newPostBtn.addEventListener('click', function(event) {
        if (!loggedIn()) {
            event.preventDefault();
            alert('You need to be logged in to create a post. Click OK to go to login page.');
            window.location.href = 'account/login.html';
        }
    });
}

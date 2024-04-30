const apiArticle = 'https://v2.api.noroff.dev/blog/posts/Tom_Christer';
const carouselContainer = document.getElementById('carousel');
let carouselArticleIds = [];
let articlesData = [];
let currentTag = 'all';

fetch(apiArticle)
    .then((response) => response.json())
    .then((data) => {
        console.log('Data from API:', data);
        articlesData = data.data;
        append(articlesData);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });

function carouselDisplay(data) {
    const carouselContainer = getCarouselContainer();
    carouselContainer.innerHTML = '';
    carouselArticleIds = [];

    data.slice(0, 3).forEach((post) => {
        const div = document.createElement("div");
        div.classList.add("articles-carousel");
        div.innerHTML = `
            <div class="content-container">
            <h2><a href="article.html?id=${post.id}">${post.title}</a></h2>
            ${post.tag ? `<p>Tag: ${post.tag}</p>` : ''}
            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ''}
            </div>
        `;

        carouselContainer.appendChild(div);
        carouselArticleIds.push(post.id);
    });
}

function articleGrid(data) {
    const articleDisplay = getArticleDisplay();
    articleDisplay.innerHTML = '';

    data.forEach((post) => {
        if (carouselArticleIds.includes(post.id)) {
            return;
        }
        const updatedDate = new Date(post.updated);
        const formattedDate = `${updatedDate.getDate()}/${updatedDate.getMonth() + 1}/${updatedDate.getFullYear()}`;
        const authorName = post.author.name.replace(/_/g, ' ');

        const div = document.createElement("div");
        div.classList.add("articles");
        div.innerHTML = `
            <h2><a href="article.html?id=${post.id}">${post.title}</a></h2>
            <p>${post.body}</p>
            ${post.tag ? `<p>Tag: ${post.tag}</p>` : ''}
            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ''}
            <p>Author: ${authorName}</p>
            <p>${formattedDate}</p>
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
    carouselDisplay(data);
    articleGrid(data);
}

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

document.getElementById('newestBtn').addEventListener('click', sortByNewest);
document.getElementById('oldestBtn').addEventListener('click', sortByOldest);

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

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
let scrollPosition = 0;
const articleWidth = carouselContainer.offsetWidth;

leftBtn.addEventListener("click", scrollLeft);
rightBtn.addEventListener("click", scrollRight);

function scrollLeft() {
    scrollPosition -= articleWidth;
    if (scrollPosition < 0) {
        scrollPosition = 0;
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

/*
articleDisplay.addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteBtn')) {
        deleteArticle(event);
    }
});

function deleteArticle(event) {
    const articleId = event.target.dataset.id;
    const deleteUrl = `${apiArticle}/${articleId}`;

    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
    })
        .then(response => {
            if (response.ok) {
                articlesData = articlesData.filter(article => article.id !== articleId);
                append(articlesData);
            } else {
                console.error('Failed to delete article');
            }
        })
        .catch(error => {
            console.error('Error deleting article:', error);
        });
}*/

const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');
const apiArticleById = `https://v2.api.noroff.dev/blog/posts/Tom_Christer/${articleId}`;

fetch(apiArticleById)
    .then((response) => response.json())
    .then((data) => {
        console.log('Article Data:', data);
        displayArticle(data);
    })
    .catch((error) => {
        console.error('Error fetching article:', error);
    });

function displayArticle(article) {
    const articleDisplay = document.getElementById('articleDisplay');
    articleDisplay.innerHTML = `
        <h2>${article.data.title}</h2>
        <p>${article.data.body}</p>
        ${article.data.media ? `<img src="${article.data.media.url}" alt="${article.data.media.alt}">` : ''}
    `;
}

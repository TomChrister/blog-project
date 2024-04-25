const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');
const apiArticleById = `https://v2.api.noroff.dev/blog/posts/Tom_Christer/${articleId}`;

fetch(apiArticleById)
    .then((response) => response.json())
    .then((data) => {
        console.log('Article Data:', data);
        console.log('Article Title:', data.title);
        console.log('Article Body:', data.body);
        displayArticle(data);
    })
    .catch((error) => {
        console.error('Error fetching article:', error);
    });

function displayArticle(article) {
    const articleDisplay = document.getElementById('articleDisplay');
    articleDisplay.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.body}</p>
        ${article.tag ? `<p>Tag: ${article.tag}</p>` : ''}
        ${article.media ? `<img src="${article.media.url}" alt="${article.media.alt}">` : ''}
    `;
}

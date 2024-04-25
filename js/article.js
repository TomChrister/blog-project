/*const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9tX0NocmlzdGVyIiwiZW1haWwiOiJ0b21zY2gwMTI2NkBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzM2MDU2M30.Pyo04wxqxm491vDWg9CMi8pug12fM07HWHCkPQjJFak';
const apiArticle = `https://v2.api.noroff.dev/blog/posts/${articleId}`;

fetch(apiArticle, {
    headers: {
        'Authorization': `Bearer ${bearerToken}`
    }
})
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch article');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Article Data:', data);
        displayArticle(data);
    })
    .catch((error) => {
        console.error('Error fetching article:', error);
    });


function displayArticle(article) {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    articleDiv.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.body}</p>
        ${article.tag ? `<p>Tag: ${article.tag}</p>` : ''}
        ${article.media ? `<img src="${article.media.url}" alt="${article.media.alt}">` : ''}
    `;

    articleDetails.appendChild(articleDiv);
}*/

// Extract the article ID from the query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// Fetch the article from the API using the extracted ID
const apiArticleById = `https://v2.api.noroff.dev/blog/posts/Tom_Christer/${articleId}`;

fetch(apiArticleById)
    .then((response) => response.json())
    .then((data) => {
        console.log('Article Data:', data);
        console.log('Article Title:', data.title); // Log the article title
        console.log('Article Body:', data.body);
        displayArticle(data);
    })
    .catch((error) => {
        console.error('Error fetching article:', error);
    });

// Display the fetched article on the article page
function displayArticle(article) {
    const articleDisplay = document.getElementById('articleDisplay');
    articleDisplay.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.body}</p>
        ${article.tag ? `<p>Tag: ${article.tag}</p>` : ''}
        ${article.media ? `<img src="${article.media.url}" alt="${article.media.alt}">` : ''}
    `;
}

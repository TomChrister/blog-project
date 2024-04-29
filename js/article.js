const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');
const apiArticleById = `https://v2.api.noroff.dev/blog/posts/Tom_Christer/${articleId}`;
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9tX0NocmlzdGVyIiwiZW1haWwiOiJ0b21zY2gwMTI2NkBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzM2MDU2M30.Pyo04wxqxm491vDWg9CMi8pug12fM07HWHCkPQjJFak';


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

    const updatedDate = new Date(article.data.updated);
    const formattedDate = `${updatedDate.getDate()}/${updatedDate.getMonth() + 1}/${updatedDate.getFullYear()} ${updatedDate.getHours()}:${updatedDate.getMinutes()}`;
    const authorName = article.data.author.name.replace(/_/g, ' ');

    articleDisplay.innerHTML = `
        <h2>${article.data.title}</h2>
        <p>${article.data.body}</p>
        <p>${formattedDate}</p>
        <p>${authorName}</p>
        ${article.data.media ? `<img src="${article.data.media.url}" alt="${article.data.media.alt}">` : ''}
        <button class="deleteBtn" data-id="${article.data.id}">Delete</button>
    `;
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteBtn')) {
        deleteArticle(event);
    }
});

function deleteArticle() {
    fetch(apiArticleById, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                console.error('Failed to delete article');
            }
        })
        .catch(error => {
            console.error('Error deleting article:', error);
        });
}








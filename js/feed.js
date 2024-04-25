const apiArticle = 'https://v2.api.noroff.dev/blog/posts/Tom_Christer';
const articleDisplay = document.getElementById('articleDisplay');
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9tX0NocmlzdGVyIiwiZW1haWwiOiJ0b21zY2gwMTI2NkBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzM2MDU2M30.Pyo04wxqxm491vDWg9CMi8pug12fM07HWHCkPQjJFak';
let articlesData = [];
let currentTag = 'all';

articleDisplay.addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteBtn')) {
        deleteArticle(event);
    }
});

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

function append(data) {
    articleDisplay.innerHTML = '';
    data.forEach((post) => {
        const div = document.createElement("div");
        div.classList.add("articles")
        div.innerHTML = `
            <h2><a href="article.html?id=${post.id}">${post.title}</a></h2>
            <p>${post.body}</p>
            ${post.tag ? `<p>Tag: ${post.tag}</p>` : ''}
            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ''}
            <p>Author: ${post.author.name}</p>
            <button class="deleteBtn" data-id="${post.id}">Delete</button>
        `;
        articleDisplay.appendChild(div);
    });
}


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
}


function sortByNewest() {
    const sortedData = [...articlesData].sort((a, b) => new Date(b.created) - new Date(a.created));
    applyFilter(sortedData);
}

function sortByOldest() {
    const sortedData = [...articlesData].sort((a, b) => new Date(a.created) - new Date(b.created));
    applyFilter(sortedData);
}

function sortByTag(tag) {
    currentTag = tag;
    if (tag === 'all') {
        append(articlesData);
    } else {
        const filteredData = articlesData.filter(post => post.tags && post.tags.includes(tag));
        append(filteredData);
    }
}

function applyFilter(data) {
    if (currentTag === 'all') {
        append(data);
    } else {
        const filteredData = data.filter(post => post.tags && post.tags.includes(currentTag));
        append(filteredData);
    }
}

document.getElementById('newestBtn').addEventListener('click', sortByNewest);
document.getElementById('oldestBtn').addEventListener('click', sortByOldest);

document.getElementById('tagSelect').addEventListener('change', (event) => {
    const selectedTag = event.target.value;
    sortByTag(selectedTag);
});
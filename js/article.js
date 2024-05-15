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
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'};
    const formattedDate =  updatedDate.toLocaleDateString('en-GB', options);
    const authorName = article.data.author.name.replace(/_/g, ' ');
    const currentUrl = window.location.href;

    articleDisplay.innerHTML = `
        <div class="content-wrapper">
            <h2>${article.data.title}</h2>
            <div class="img-container">
                ${article.data.media ? `<img src="${article.data.media.url}" alt="${article.data.media.alt}">` : ''}
            </div>
        </div>
        <div class="author-edit-delete flex-container">
            <p>${authorName} • ${formattedDate}</p>
            <div>
                <button class="shareBtn" onclick="copyClipboard('${currentUrl}')">Share</button>
                ${loggedIn() ? `<button class="editBtn" data-id="${article.data.id}">Edit</button>` : ''}
                ${loggedIn() ? `<button class="deleteBtn" data-id="${article.data.id}">Delete</button>` : ''}
             </div>
        </div>  
        <div class="tags-and-share flex-container">
            <p>Category • ${article.data.tags}</p> •
        </div>  
        <hr class="hr-line">
        <div class="article-text">${formatArticleBody(article.data.body)}</div>   
    `;

    const editButton = articleDisplay.querySelector('.editBtn');
    editButton.addEventListener('click', () => {
        editForm(article);
    });
}

function formatArticleBody(text) {
    return text.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('');
}

function loggedIn() {
    const accessToken = sessionStorage.getItem('Session key');
    return accessToken !== null;
}

function editForm(article) {
    const articleDisplay = document.getElementById('articleDisplay');
    const editForm = document.createElement('form');
    editForm.classList.add('edit-form')
    editForm.innerHTML = `
        <h1>Edit article</h1>
        <input type="hidden" name="articleId" value="${article.data.id}">
        <label for="editTitle">Title:</label>
        <input type="text" id="editTitle" name="title" value="${article.data.title}" required>
        <label for="editBody">Body:</label>
        <textarea id="editBody" name="body" rows="4" required>${article.data.body}</textarea>
        <label for="editTags">Tag:</label>
        <input type="text" id="editTags" name="tag" value="${article.data.tags.join(', ')}">
        <label for="editMediaUrl">Media URL:</label>
        <input type="text" id="editMediaUrl" name="mediaUrl" value="${article.data.media ? article.data.media.url : ''}">
        <p>Note: When adding an image, please use links to a live and publicly accessible image with <span class="https">https://</span></p>
        <button type="submit">Save Changes</button>
    `;

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);
        const updatedArticleData = {
            title: formData.get('title'),
            body: formData.get('body'),
            tags: formData.get('tag').split(',').map(tag => tag.trim()),
            media: {
                url: formData.get('mediaUrl')
            }
        };
        const articleId = formData.get('articleId');
        putRequest(articleId, updatedArticleData);
    });

    articleDisplay.innerHTML = '';
    articleDisplay.appendChild(editForm);
}

function putRequest(articleId, updatedArticleData) {
    const putOptions = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedArticleData)
    };
    fetch(`https://v2.api.noroff.dev/blog/posts/Tom_Christer/${articleId}`, putOptions)
        .then(response => response.json())
        .then(data => {
            displayArticle(data);
        })
        .catch(error => {
            console.error('Error updating article:', error);
        });
}

function copyClipboard (url) {
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Link copied to clipboard!');
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

function logout() {
    sessionStorage.removeItem('Session key');
    window.location.href = 'index.html';
}

const logoutBtn = document.getElementById('loginAnchor');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}


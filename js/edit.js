const apiArticle = 'https://v2.api.noroff.dev/blog/posts/Tom_Christer';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9tX0NocmlzdGVyIiwiZW1haWwiOiJ0b21zY2gwMTI2NkBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzM2MDU2M30.Pyo04wxqxm491vDWg9CMi8pug12fM07HWHCkPQjJFak';
const newPostForm = document.getElementById('newPostForm');

newPostForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const postData = Object.fromEntries(formData.entries());

    fetch(apiArticle, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('New post created:', data);
            window.location.href = '../index.html'
        })
        .catch(error => {
            console.error('Error creating new post:', error);
        });
});
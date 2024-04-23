const apiArticle = 'https://v2.api.noroff.dev/blog/posts/Tom_Christer';
const articleDisplay = document.getElementById('articleDisplay');

function append(data) {
    data.data.forEach((post) => {
        const div = document.createElement("div");
        div.classList.add("articles")
        div.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            ${post.tag ? `<p>Tag: ${post.tag}</p>` : ''}
            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ''}
            <p>Author: ${post.author.name}</p>
        `;
        articleDisplay.appendChild(div);
    });
}

fetch(apiArticle)
    .then((response) => response.json())
    .then((data) => {
        console.log('Data from API:', data);
        append(data);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
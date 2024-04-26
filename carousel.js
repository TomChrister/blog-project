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
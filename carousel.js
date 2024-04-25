const carouselWrapper = document.querySelector('.carousel-wrapper');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');

let currentIndex = 0;

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = carouselWrapper.children.length - 1; // Set index to last article
    }
    slideCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= carouselWrapper.children.length) {
        currentIndex = 0; // Reset index to 0 when reaching the end
    }
    slideCarousel();
});

function slideCarousel() {
    const offset = -currentIndex * 100; // Adjust for the width of each article
    carouselWrapper.style.transform = `translateX(${offset}%)`;
}


function appendCarousel(data) {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    for (let i = 0; i < 3 && i < data.length; i++) {
        const post = data[i];
        const updatedDate = new Date(post.updated);
        const formattedDate = `${updatedDate.getDate()}/${updatedDate.getMonth() + 1}/${updatedDate.getFullYear()} ${updatedDate.getHours()}:${updatedDate.getMinutes()}`;
        const authorName = post.author.name.replace(/_/g, ' ');

        const div = document.createElement("div");
        div.classList.add("carousel-article");
        div.innerHTML = `
             <h2><a href="article.html?id=${post.id}">${post.title}</a></h2>
             ${post.tag ? `<p>Tag: ${post.tag}</p>` : ''}
             ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ''}
             <p>Author: ${authorName}</p>
             <p>Date: ${formattedDate}</p>
        `;
        carouselWrapper.appendChild(div);
    }
}
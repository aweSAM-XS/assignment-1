const featuredImg = document.querySelector('#gallery figure img');
const featuredCaption = document.querySelector('#gallery figure figcaption');
const thumbnailContainer = document.getElementById('thumbnails');
const heading = document.querySelector('#heading')
const gallery = document.getElementById('gallery')
const caption = document.getElementById('caption')

const imagesPath = '../images';

const imageData = [];
const thumbnailItems = [];

fetch(imagesPath)
    .then((response) => response.text())
    .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const files = Array.from(doc.querySelectorAll('a')).map((a) => a.textContent);
        files.splice(0, 3);
        getImages(files);
    })
    .catch((error) => console.log('Error getting directory information:', error));

const getImages = (files) => {
    const thumbnails = files.filter((file) => file.includes('small'));

    thumbnails.forEach((thumbnail) => {
        const index = thumbnail.lastIndexOf('jpg');
        const name = thumbnail.substring(0, index + 3);
        const image = {
            thumb: name,
            full: name.replace('small', 'large'),
            caption: name.split('-').slice(0, 2).reverse().join(' ').toUpperCase(),
        };
        imageData.push(image);
        const thumbnailItem = `<img src="../images/${image.thumb}" alt="${image.caption}" class="thumbnail-img"/>`;
        thumbnailItems.push(thumbnailItem);
    });

    const thumbnailElements = thumbnailItems.map((thumb, index) => {
        const thumbnailElement = document.createElement('li');
        thumbnailElement.innerHTML = thumb;
        thumbnailElement.addEventListener('click', () => {
            featuredImg.src = `../images/${imageData[index].full}` ;
            featuredImg.alt = imageData[index].caption;
            featuredCaption.textContent = imageData[index].caption;
            gallery.style.background = `url(../images/${imageData[index].full}) no-repeat center / cover`;
            caption.style.backgroundColor = imageData[index].caption.replace(' FLOWERS', '')

            thumbnailElements.forEach((thumb) => {
                thumb.classList.remove('active');
            });
            thumbnailElement.classList.add('active');
        });
        return thumbnailElement;
    });

    thumbnailContainer.append(...thumbnailElements);
};

'use strict';

const WRAPPER_CONTENT = document.getElementsByClassName('wrapper__content')[0];
let tagsList = new Set();
let localTags = localStorage.getItem('tags');

let fetchData = fetch('https://api.myjson.com/bins/152f9j')
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(err);
    });

fetchData.then((posts) => {
    posts.data.sort((x, y) => {
        return new Date(x['createdAt']) - new Date(y['createdAt']);
    }).reverse();
    for(let post of posts.data){
        tagsList.add(...post['tags']);
        createPost(post);
    }
});

function createPost(data) {
    let dataWrapper = document.createElement('div');
    dataWrapper.classList.add('content__data');

    let postImage = document.createElement('img');
    postImage.classList.add('data__image');
    postImage.src = data['image'];
    postImage.alt = 'image_placeholder';

    let postTitle = document.createElement('h3');
    postTitle.classList.add('data__title');
    postTitle.innerHTML = data['title'];

    let postText = document.createElement('p');
    postText.classList.add('data__text');
    postText.innerHTML = data['description'];

    let postTags = document.createElement('ul');
    postTags.classList.add('data__tags');
    for(let tag of data['tags']){
        let liTag = document.createElement('li');
        liTag.classList.add('data__tags_tag');
        liTag.innerHTML = tag;
        postTags.appendChild(liTag);
    }

    let postCreated = document.createElement('p');
    postCreated.classList.add('data__created');
    postCreated.innerHTML = new Date(data['createdAt']).toLocaleString();

    let postDelete = document.createElement('span');
    postDelete.classList.add('data__delete','fa','fa-close');
    postDelete.addEventListener('click', () => {
        WRAPPER_CONTENT.removeChild(dataWrapper);
    });

    dataWrapper.appendChild(postImage);
    dataWrapper.appendChild(postTitle);
    dataWrapper.appendChild(postText);
    dataWrapper.appendChild(postTags);
    dataWrapper.appendChild(postCreated);
    dataWrapper.appendChild(postDelete);

    WRAPPER_CONTENT.appendChild(dataWrapper);
}

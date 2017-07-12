'use strict';

const WRAPPER_CONTENT = document.getElementsByClassName('wrapper__content')[0];
const HEADER_TAGS_SECTION = document.getElementsByClassName('header__tags-section')[0];

let tagsSet = new Set();
let savedTags = checkSavedTags();

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
        post['tags'].forEach(tagsSet.add, tagsSet);
        createPost(post);
    }

    fetchTagsList(tagsSet);
});

function fetchTagsList(tags) {
    let headerTags = document.createElement('ul');
    headerTags.classList.add('tags-section__tags-list');

    let applyTags = document.createElement('li');
    applyTags.classList.add('tags-list__apply');
    applyTags.addEventListener('click', () => {
        let selected = [].map.call(
            document.getElementsByClassName('tags-list__tag_selected'), (liItem)=>liItem.innerHTML);
        localStorage.setItem('tags', selected);
    });

    let applyIcon = document.createElement('span');
    applyIcon.classList.add('fa', 'fa-sort-amount-desc');

    applyTags.appendChild(applyIcon);
    headerTags.appendChild(applyTags);

    for(let headerTag of tags){
        let tag = document.createElement('li');
        tag.classList.add('tags-list__tag');
        tag.innerHTML = headerTag;
        let selectedClass = 'tags-list__tag_selected';
        if(savedTags.includes(headerTag)){
            tag.classList.add(selectedClass);
        }
        tag.addEventListener('click', () => {
            if(tag.classList.contains(selectedClass)){
                tag.classList.remove(selectedClass);
            } else {
                tag.classList.add(selectedClass);

            }
        });

        headerTags.appendChild(tag);
    }
    HEADER_TAGS_SECTION.appendChild(headerTags);
}

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
    for(let postTag of data['tags']){
        let tag = document.createElement('li');
        tag.classList.add('tags__tag');
        tag.innerHTML = postTag;
        postTags.appendChild(tag);
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

function checkSavedTags(){
    let localTags = localStorage.getItem('tags');
    if(localTags){
        return localTags.split(',');
    } else {
        return [];
    }
}
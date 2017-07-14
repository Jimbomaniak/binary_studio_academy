'use strict';

const WRAPPER_CONTENT = document.getElementsByClassName('wrapper__content')[0];
const HEADER_TAGS_SECTION = document.getElementsByClassName('header__tags-section')[0];
const FOOTER = document.getElementsByClassName('b-page__footer')[0];
const SEARCH = document.getElementsByClassName('search__input')[0];
const FORM = document.getElementsByClassName('search__form');
const TAG_SELECTED_CLASS = 'tag_selected';

FORM.onsubmit = (e) => e.preventDefault();

let tagsSet = new Set();
let savedTags = getSavedTags();

let fetchData = fetch('https://api.myjson.com/bins/152f9j')
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(err);
    });

fetchData.then((posts) => {
    for (let post of posts.data) {
        collectPostTags(post);
    }
    posts.data.sort(sortByDate);
    if (savedTags) {
        posts.data = matchedTags(posts.data, savedTags);
    }

    fetchTagsList(tagsSet);
    infiniteScroll(posts.data);

    let searchDelay = 0;
    SEARCH.addEventListener('keydown', () => {
        clearTimeout(searchDelay);
        searchDelay = setTimeout(() => searchPosts(posts.data, SEARCH.value), 200);
    });
});

function rebuildContent(posts) {
    while (WRAPPER_CONTENT.lastChild) {
        WRAPPER_CONTENT.removeChild(WRAPPER_CONTENT.lastChild)
    }
    if (!posts.length) {
        noDataFiller();
    }
    infiniteScroll(posts);
}

function searchPosts(posts, text) {
    window.scrollTo(0, 0);
    let textLower = text.toLowerCase();
    let filtered = posts.filter(post => post['title'].toLowerCase().includes(textLower));
    if (filtered) {
        rebuildContent(filtered);
    } else {
        rebuildContent(posts);
    }
}

function infiniteScroll(posts) {
    let partedPosts = divideArray(posts);
    createPosts(partedPosts.shift());

    document.onscroll = () => appendNext(partedPosts);
}

function noDataFiller() {
    let filler = document.createElement('h2');
    filler.classList.add('content__filler');
    filler.innerHTML = "No match or no data";
    WRAPPER_CONTENT.appendChild(filler);
}

function appendNext(posts) {
    if (posts.length && isAppearOnScreen(FOOTER)) {
        createPosts(posts.shift());
    }
}

function matchedTags(posts, tags) {
    for (let post of posts) {
        let postTags = new Set(post['tags']);
        let match = new Set([...tags].filter(tag => postTags.has(tag)));
        post['matchTags'] = match.size;
    }
    let splitByMatch = posts.reduce((matchCount, post) => {
        if (!matchCount[post['matchTags']]) {
            matchCount[post['matchTags']] = [];
        }
        matchCount[post['matchTags']].push(post);
        return matchCount
    }, {});

    let postsList = [];

    for (let matchCount of Object.keys(splitByMatch)) {
        splitByMatch[matchCount].sort(sortByDate);
        postsList.unshift(...splitByMatch[matchCount])
    }

    return postsList
}

function fetchTagsList(tags) {
    let headerTags = document.createElement('ul');
    headerTags.classList.add('tags-section__tags-list');

    let applyTags = document.createElement('li');
    applyTags.classList.add('tags-list__apply');
    applyTags.addEventListener('click', () => {
        let selectedTags = document.getElementsByClassName(TAG_SELECTED_CLASS);
        let formattedTags = [].map.call(selectedTags, (liItem) => liItem.innerHTML);
        localStorage.setItem('tags', formattedTags);
        location.reload();
    });

    let applyIcon = document.createElement('span');
    applyIcon.classList.add('fa', 'fa-sort-amount-desc');

    applyTags.appendChild(applyIcon);
    headerTags.appendChild(applyTags);

    for (let headerTag of tags) {
        let tag = document.createElement('li');
        tag.classList.add('tags-list__tag');
        tag.innerHTML = headerTag;
        if (savedTags.has(headerTag)) {
            tag.classList.add(TAG_SELECTED_CLASS);
        }
        tag.addEventListener('click', () => {
            if (tag.classList.contains(TAG_SELECTED_CLASS)) {
                tag.classList.remove(TAG_SELECTED_CLASS);
            } else {
                tag.classList.add(TAG_SELECTED_CLASS);
            }
        });

        headerTags.appendChild(tag);
    }
    HEADER_TAGS_SECTION.appendChild(headerTags);
}

function createPost(post) {
    let dataWrapper = document.createElement('div');
    dataWrapper.classList.add('content__data');

    let postImage = document.createElement('img');
    postImage.classList.add('data__image');
    postImage.src = post['image'];
    postImage.alt = 'image_placeholder';

    let postTitle = document.createElement('h3');
    postTitle.classList.add('data__title');
    postTitle.innerHTML = post['title'];

    let postText = document.createElement('p');
    postText.classList.add('data__text');
    postText.innerHTML = post['description'];

    let postTags = document.createElement('ul');
    postTags.classList.add('data__tags');
    for (let postTag of post['tags']) {
        let tag = document.createElement('li');
        tag.classList.add('tags__tag');
        if (savedTags.has(postTag)) {
            tag.classList.add(TAG_SELECTED_CLASS);
        }
        tag.innerHTML = postTag;
        tag.addEventListener('click', () => {
            localStorage.clear();
            localStorage.setItem('tags', postTag);
            location.reload();
        });
        postTags.appendChild(tag);
    }

    let postCreated = document.createElement('p');
    postCreated.classList.add('data__created');
    postCreated.innerHTML = new Date(post['createdAt']).toLocaleString();

    let postDelete = document.createElement('span');
    postDelete.classList.add('data__delete', 'fa', 'fa-close');
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

function createPosts(posts) {
    if (posts) {
        for (let post of posts) {
            createPost(post);
        }
    }
}

function sortByDate(post1, post2) {
    return new Date(post2['createdAt']) - new Date(post1['createdAt']);
}

function collectPostTags(post) {
    post['tags'].forEach(tagsSet.add, tagsSet);
}

function getSavedTags() {
    let localTags = localStorage.getItem('tags');
    if (localTags) {
        return new Set(localTags.split(','));
    } else {
        return new Set();
    }
}

function divideArray(arr, chunk = 10) {
    let parted = [];
    for (let step = 0; step < arr.length; step += chunk) {
        parted.push(arr.slice(step, step + chunk));
    }
    return parted;
}

function isAppearOnScreen(elem) {
    let shape = elem.getBoundingClientRect();
    let html = document.documentElement;
    return (
        shape.top >= 0 &&
        shape.left >= 0 &&
        shape.bottom <= (window.innerHeight || html.clientHeight) &&
        shape.right <= (window.innerWidth || html.clientWidth)
    );
}

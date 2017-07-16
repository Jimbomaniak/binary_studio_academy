'use strict';

const TAG_SELECTED = 'tag_selected';
const TAG_LIST_SELECTED = 'tags-list__tag_selected';

let wrapper_content = document.getElementsByClassName('wrapper__content')[0];
let header_tags_section = document.getElementsByClassName('header__tags-section')[0];
let footer = document.getElementsByClassName('b-page__footer')[0];
let search = document.getElementsByClassName('search__input')[0];
let form = document.getElementsByClassName('search__form');

form.onsubmit = (e) => e.preventDefault();

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
    search.addEventListener('keydown', () => {
        clearTimeout(searchDelay);
        searchDelay = setTimeout(() => searchPosts(posts.data, search.value), 200);
    });
});

function rebuildContent(posts) {
    while (wrapper_content.lastChild) {
        wrapper_content.removeChild(wrapper_content.lastChild)
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
    wrapper_content.appendChild(filler);
}

function appendNext(posts) {
    if (posts.length && isAppearOnScreen(footer)) {
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
        let selectedTags = document.getElementsByClassName(TAG_LIST_SELECTED);
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
            tag.classList.add(TAG_LIST_SELECTED);
        }
        tag.addEventListener('click', () => {
            if (tag.classList.contains(TAG_LIST_SELECTED)) {
                tag.classList.remove(TAG_LIST_SELECTED);
            } else {
                tag.classList.add(TAG_LIST_SELECTED);
            }
        });

        headerTags.appendChild(tag);
    }
    header_tags_section.appendChild(headerTags);
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
            tag.classList.add(TAG_SELECTED);
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
        wrapper_content.removeChild(dataWrapper);
    });

    dataWrapper.appendChild(postImage);
    dataWrapper.appendChild(postTitle);
    dataWrapper.appendChild(postText);
    dataWrapper.appendChild(postTags);
    dataWrapper.appendChild(postCreated);
    dataWrapper.appendChild(postDelete);

    wrapper_content.appendChild(dataWrapper);
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

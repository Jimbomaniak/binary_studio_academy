'use strict';

const VISIBLE = 'visible';
let headerNav = document.getElementsByClassName('section__nav')[0];
let headerSearch = document.getElementsByClassName('section__search')[0];
let headerHider = document.getElementsByClassName('header__hider')[0];
function toggleHeader() {
    if(headerNav.classList.contains(VISIBLE)){
        headerNav.style.display = 'none';
        headerNav.classList.remove('visible');
    } else {
        headerNav.style.display = 'block';
        headerNav.classList.add('visible');
    }
}
'use strict';

let fetchData = fetch('https://api.myjson.com/bins/152f9j')
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(err);
    });

fetchData.then((v)=>{console.log(v)});
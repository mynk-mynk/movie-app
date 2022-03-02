// Constants
const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=dab18b4ee87c8ca105eaa55a0f45fc37';

// HTML elements
const input = document.querySelector('input');
const container = document.querySelector('.main-container');

// Spinner
window.onload = function () {
    container.querySelector('.lds-ellipsis').classList.add('loaded');
}



// Functions
async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
}

function showData(data) {
    data.results.forEach(element => {
        let item = document.createElement('div');
        item.classList.add('movie-item');
        container.append(item);
        
        const img = document.createElement('img');
        img.src = 'https://www.themoviedb.org/t/p/original/' + element.poster_path;
        img.alt = 'poster';
        item.append(img);
        
        const info = document.createElement('div');
        info.classList.add('movie-info');
        item.append(info);
        
        const title = document.createElement('h3');
        info.append(title);
        title.textContent = element.original_title;
        
        const rate = document.createElement('span');
        rate.classList.add('movie-rate');
        info.append(rate);
        rate.textContent = element.vote_average.toFixed(1);
        
        if (element.vote_average < 6) rate.classList.add('red');
        if (element.vote_average >= 7) rate.classList.add('green');
        
        const over = document.createElement('div');
        over.classList.add('movie-overview');
        item.append(over);
        over.textContent = element.overview;
    });
}


function setLocalStorage() {
    let inputValue = input.value;
    localStorage.setItem('input', inputValue);
}

function getLocalStorage() {
    input.value = localStorage.getItem('input');
}


function search() {
    if (input.value !== '') {
        getData(`https://api.themoviedb.org/3/search/movie?query=${input.value}&api_key=dab18b4ee87c8ca105eaa55a0f45fc37`);
    } else {
        getData(url);
    }
}

window.addEventListener('beforeunload', setLocalStorage);
//window.addEventListener('load', getLocalStorage);
getLocalStorage();
search();


// Input button
function clearInput() {
    input.value = '';
}

function addCross() {
    if (input.value !== '') document.getElementById('cross').style.display = 'inline';
}
addCross();

const cross = document.querySelector('.input-img');
cross.addEventListener('click', clearInput);
input.addEventListener('input', addCross);

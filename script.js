// apikey=ac7d252c

const searchBox = document.querySelector('#movie-search-box');
const searchList = document.querySelector('#search-list');

async function moviesApi (searchTerm) {
    const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=ac7d252c`);
    const data = await response.json();
    if (data.Response === 'True') displaySearchMovies(data.Search)
    console.log(data);
}
moviesApi('batman');

function searchMovies() {
    const search = (searchBox.value).trim();
    if (search.length > 0) {
        searchList.classList.remove('hide-search-list');
        moviesApi(search);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displaySearchMovies( movies ) {
    searchList.innerHTML = '';
    for (let index = 0; index < movies.length; index++) {
        let listItem = document.createElement('div');
        listItem.classList.add('search-list-item');
        listItem.dataset.id = movies[index].imbID;

        if (movies[index].Poster !== 'N/A') {
            moviePoster = movies[index].Poster;
        } else {
            moviePoster = `Image_not_found.png`
        }

        listItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${movies[index].Poster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[index].Title}</h3>
            <p>${movies[index].Year}</p>
        </div>`;
        searchList.appendChild(listItem);
    }
}
// apikey=ac7d252c

const searchBox = document.querySelector('#movie-search-box');
const searchList = document.querySelector('#search-list');
const resultGrid = document.querySelector('#result-grid')

async function moviesTermApi(searchTerm) {
    const response = await fetch( `http://www.omdbapi.com/?s=${searchTerm}&apikey=ac7d252c`)
    const data = await response.json();
    if (data.Response === 'True') displayMoviesList(data.Search)
    console.log(data);
}
moviesTermApi('batman');

function searchMovies () {
    const search = (searchBox.value).trim();
    if (search.length > 0) {
        searchList.classList.remove('hide-search-list');
        moviesTermApi(search);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMoviesList (movies) {
    searchList.innerHTML = "";
    for (let index = 0; index < movies.length; index++){
        let searchMovies = document.createElement('div');
        searchMovies.dataset.id = movies[index].imbID;
        searchMovies.classList.add('search-list-item');

        if( movies[index].Poster !== 'N/A') {
            moviePoster = movies[index].Poster;
        } else {
            moviePoster = 'Image_not_found.png';
        }
        searchMovies.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[index].Title}</h3>
            <p>${movies[index].Year}</p>
        </div>
        `
        searchList.appendChild(searchMovies);
    }

} 
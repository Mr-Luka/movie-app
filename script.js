// apikey=ac7d252c
const inputBox = document.querySelector('#movie-search-box');
const searchList = document.querySelector('#search-list');

async function moviesApi (searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=ac7d252c`;
    const response = await fetch(`${URL}`);
    const data = await response.json()
    if(data.Response === 'True') displayMoviesList(data.Search)
    console.log(data.Search)
}
moviesApi('Alien');

function searchMovies () {
    const searchTerm = (inputBox.value).trim();
    if(searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list')
        moviesApi(searchTerm);
    } else {
        searchList.classList.add('hide-search-list')
    }
}

function displayMoviesList(movies) {
    searchList.innerHTML = '';
    for (let index = 0; index < movies.length; index++) {
        let movieListItem = document.createElement('div');
        movieListItem.classList.add('search-list-item');
        if (movies[index].Poster !== 'N/A') {
            moviePoster = movies[index].Poster;
        } else {
            moviePoster = "image_not_found.png";
        }
        movieListItem.innerHTML = `
            <div class="search-item-thumbnail">
                <img src="${moviePoster}">
            </div>
            <div class="search-item-info">
                <h3>${movies[index].Title}</h3>
                <p>${movies[index].Year}</p>
            </div>
        `;
        searchList.appendChild(movieListItem)
    }
}



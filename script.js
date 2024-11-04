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
        searchMovies.dataset.id = movies[index].imdbID;
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
    loadMovieDetails();
} 

function loadMovieDetails () {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async ()=> {
            searchBox.value = '';
            searchList.classList.add('hide-search-list');
            const response = await fetch (`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=ac7d252c`);
            const data = await response.json();
            displayMovieDetails(data)
        })
    })
}

function displayMovieDetails(details) {
        resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${(details.Poster != "N/A}") ? details.Poster : "Image_not_found.png"} alt="movie poster">
        </div>
        <div class="movie-info box">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
                <p class="genre"><b>Genre:</b> ${details.Genre}</p>
                <p class="writer"><b>Writer:</b> ${details.Writer}</p>
                <p class="actors"><b>Actors:</b> ${details.Actors}</p>
                <p class="plot"><b>Plot:</b> ${details.Plot}</p>
                <p class="language"><b>Language:</b> ${details.Language}</p>
                <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
        </div>`;
    
};

async function onLoadMovies() {
    const response = await fetch(`http://www.omdbapi.com/?page=1&apikey=ac7d252c`)
    const data = await response.json();
    console.log(data);
}
onLoadMovies();

// window.addEventListener('onload', onLoadMovies);
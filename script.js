// apikey=ac7d252c

const searchBox = document.querySelector('#movie-search-box');
const searchList = document.querySelector('#search-list');
const resultGrid = document.querySelector('#result-grid');
const moviesContainer = document.querySelector('.movies-container');
const moviesList = document.querySelector('.movies-element');
const popularTitle = document.querySelector('.popular-movies');

// Function to fetch movies by search term from OMDb API
async function moviesTermApi(searchTerm) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=ac7d252c`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.Response === 'True') {
            displayMoviesList(data.Search);
        } else {
            searchList.innerHTML = `<div class="error-message">No movies found for "${searchTerm}"</div>`;
            searchList.classList.remove('hide-search-list');
        }
        console.log(data);
    } catch (error) {
        console.error('Error fetching movies:', error);
        searchList.innerHTML = `<div class="error-message">Error fetching data: ${error.message}</div>`;
        searchList.classList.remove('hide-search-list');
    }
}

// Initial search for 'batman'
moviesTermApi('batman');

// Function to handle movie search
function searchMovies() {
    const searchTerm = (searchBox.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        moviesTermApi(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
        searchList.innerHTML = '';
    }
}

// Function to display the list of movies found by the search
function displayMoviesList(movies) {
    searchList.innerHTML = "";
    movies.forEach(movie => {
        let searchMovies = document.createElement('div');
        searchMovies.dataset.id = movie.imdbID;
        searchMovies.classList.add('search-list-item');
        
        const moviePoster = movie.Poster !== 'N/A' ? movie.Poster : 'Image_not_found.png';
        
        searchMovies.innerHTML = `
            <div class="search-item-thumbnail">
                <img src="${moviePoster}">
            </div>
            <div class="search-item-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        `;
        searchList.appendChild(searchMovies);
    });
    loadMovieDetails();
}

// Function to fetch and display details for a selected movie
async function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(async movie => {
        movie.addEventListener('click', async () => {
            searchBox.value = '';
            searchList.classList.add('hide-search-list');
            moviesContainer.classList.add('hide');
            popularTitle.classList.add('hide');
            try {
                const response = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=ac7d252c`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                displayMovieDetails(data);
            } catch (error) {
                console.error("Error fetching movie details", error);
                resultGrid.innerHTML = `<div class="error-message">Error fetching data: ${error.message}</div>`;
            }
        });
    });
}

// Function to display the details of a selected movie
function displayMovieDetails(details) {
    const moviePoster = details.Poster !== "N/A" ? details.Poster : "Image_not_found.png";
    resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${moviePoster}" alt="movie poster">
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
}

let haveIt = [];

function generateUniqueRandom(maxNr) {
    let random = Math.floor(Math.random() * maxNr);
    
    if (!haveIt.includes(random)) {
        haveIt.push(random);
        return random;
    } else {
        if (haveIt.length < maxNr) {
            return generateUniqueRandom(maxNr);
        } else {
            console.log('No more numbers available.');
            return null;
        }
    }
}

const baseImageUrl = "https://image.tmdb.org/t/p/w500";
async function nowPlaying() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZlMjVhNGM1NzdkZGUxYzcyZTUzYzMwYmI5MmZkMiIsIm5iZiI6MTcyOTYyOTA0Ny4wMzEwMDUsInN1YiI6IjY2YjNjYTE1MWVmMzI1MzU2N2NjYzEzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1DXnE5wXtIHFtoV3qIaMZomfSiN2n_K2EY6yXmpqQk'
        }
    };
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const moviesList20 = data.results;
        moviesList.innerHTML = "";
        
        const numberOfMoviesToDisplay = Math.min(10, moviesList20.length);
        haveIt = [];
        for (let i = 0; i < numberOfMoviesToDisplay; i++) {
            let randomIndex;
            do {
                randomIndex = generateUniqueRandom(moviesList20.length);
            } while (randomIndex === null);
            
            const movie = moviesList20[randomIndex];
            const movieCard = document.createElement('div');
            movieCard.classList.add('movies-list');
            movieCard.innerHTML = `
                <div class="mini-movie-image">
                    <img src="${baseImageUrl}${movie.poster_path}">
                </div>
                <div class="mini-movie-name">
                    <h4>${movie.title}</h4>
                    <p>${movie.release_date}</p>
                </div>
            `;
            moviesList.appendChild(movieCard);
        }
        console.log(moviesList20);
    } catch (error) {
        console.error("Error fetching now playing movies", error);
    }
}

nowPlaying();

searchBox.addEventListener('click', () => {
    searchList.classList.remove('hide-search-list');
});
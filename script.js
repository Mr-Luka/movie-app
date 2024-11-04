// apikey=ac7d252c

const searchBox = document.querySelector('#movie-search-box');
const searchList = document.querySelector('#search-list');
const resultGrid = document.querySelector('#result-grid')
const moviesList = document.querySelector('.movies-element');

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


let haveIt = [];

function generateUniqueRandom(maxNr) {
    let random = (Math.random() * maxNr).toFixed();
    random = Number(random);

    if(!haveIt.includes(random)) {
        haveIt.push(random);
        return random;
    } else {
        if(haveIt.length < maxNr) {
         return  generateUniqueRandom(maxNr);
        } else {
          console.log('No more numbers available.')
          return false;
        }
    }
}




async function nowPlaying () {
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZlMjVhNGM1NzdkZGUxYzcyZTUzYzMwYmI5MmZkMiIsIm5iZiI6MTcyOTYyOTA0Ny4wMzEwMDUsInN1YiI6IjY2YjNjYTE1MWVmMzI1MzU2N2NjYzEzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1DXnE5wXtIHFtoV3qIaMZomfSiN2n_K2EY6yXmpqQk'
  }
};

await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    const nowPlayingMovies = res.results;
    moviesList.innerHTML = "";
    for (let index = 0; index < nowPlayingMovies.length; index++){
        let searchMovies = document.createElement('div');
        searchMovies.dataset.id = nowPlayingMovies[index].imdbID;
        searchMovies.classList.add('search-list-item');

        if( movies[index].Poster !== 'N/A') {
            moviePoster = nowPlayingMovies[index].Poster;
        } else {
            moviePoster = 'Image_not_found.png';
        }
        searchMovies.innerHTML = ``;
    }
    nowPlayingMovies.forEach(movie => {
        const randomIndex = generateUniqueRandom(21);
        const movieElement = document.createElement('div');
        movieElement.classList.add('movies-list');
        movieElement.innerHTML = `
            <div class="mini-movie-image">
                <img src="./img/scan002_44aad709-9cd8-4f62-924c-b7169ed73a19_480x.progressive.webp">
            </div>
            <div class="mini-movie-name">
                <h4>Alien - Romulus</h4>
                <p>2024</p>
            </div>`;
        moviesList.appendChild(movieElement)

    })
    // for (let index = 0; index < movies.length; index++){
    //     const div = document.createElement('div');
    //     div.classList.add('movies-list');
        

    //     // console.log(movie)
    // }
    console.log(nowPlayingMovies)
  })
  .catch(err => console.error(err));
}
nowPlaying()
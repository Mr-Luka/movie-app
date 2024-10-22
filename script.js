// apikey=ac7d252c

const searchBox = document.querySelector('#movie-search-box');
const searchList = document.querySelector('#search-list')

async function moviesApi(searchTerm) {
    const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=ac7d252c`);
    const data = await response.json();
    console.log(data)
    if(data.Response === 'True') displaySearchMovie(data.Search)
}
moviesApi('Batman');

function searchMovie(){
    let searchTerm = (searchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        moviesApi(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displaySearchMovie (movies) {
searchList.innerHTML = "";
    for(let index = 0; index < movies.length; index++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[index].imdbID; // setting movie id in  data-id
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
                </div>`;
                
            searchList.appendChild(movieListItem);
            loadMovieDetails();
        }
}



function loadMovieDetails () {
    const movieListItems = document.querySelectorAll('.search-list-item');
    movieListItems.forEach(movie => {
        movie.addEventListener('click', async ()=> {
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = '';
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=ac7d252c`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        })
    })
}




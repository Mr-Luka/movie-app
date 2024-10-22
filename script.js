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

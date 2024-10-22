// apikey=ac7d252c
const searchBox = document.querySelector('#movie-search-box');
const searchList = document.querySelector('#search-list')
async function getMoviesApi (searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&apikey=ac7d252c`;
    const response = await fetch(`${URL}`);
    const data = await response.json();
    console.log(data)
}
getMoviesApi('Batman');

function searchMovie (){
    const searchTerm = (searchBox).value.trim();
    if( searchTerm !== '') {
        searchList.classList.remove('hide-search-list');
        getMoviesApi(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}


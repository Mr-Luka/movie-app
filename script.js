// apikey=ac7d252c


async function getMoviesApi (searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&apikey=ac7d252c`;
    const response = await fetch(`${URL}`);
    const data = await response.json();
    console.log(data)
}
getMoviesApi('Batman')
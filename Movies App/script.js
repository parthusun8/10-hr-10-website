const API_URL = "https://api.themoviedb.org/3";

const APIKEY = "a11674613875c12d18b44c52985decdc";
const movieEl = document.getElementById("movie-container");

const requests = {
    fetchTrendingNow : `/trending/all/week?api_key=${APIKEY}&language=en-US`,
    fetchNetflixOriginals : `/discover/tv?api_key=${APIKEY}&with_networks=213`,
    fetchTopRated : `/movie/top_rated?api_key=${APIKEY}&language=en-US`,
    fetchActionMovies : `/discover/movie?api_key=${APIKEY}&with_genres=28`,
    fetchComedyMovies : `/discover/movie?api_key=${APIKEY}&with_genres=35`,
    fetchHorrorMovies : `/discover/movie?api_key=${APIKEY}&with_genres=27`,
    fetchRomanceMovies : `/discover/movie?api_key=${APIKEY}&with_genres=10749`,
    fetchDocumentaries : `/discover/movie?api_key=${APIKEY}&with_genres=99`,
}

async function fetchMovieList(query, name){
    const resp = await fetch(API_URL + query);
    const respData = await resp.json();

    const results = await respData.results;
    console.log(results);
    
    const movies = document.createElement('div');
    movies.classList.add("list");

    movieEl.append(`${name}`);

    results.forEach((result) => {

        const movie = document.createElement("img");
        const srcURL = `https://image.tmdb.org/t/p/original${result.poster_path}`;
        // console.log(srcURL);
        movie.src = srcURL;
        movies.append(movie);
    });
    movieEl.appendChild(movies);
}


async function fetchAll(){
    const fetchTrendingNow = await fetchMovieList(requests.fetchTrendingNow,"Fetch Trending Now");
    const fetchNetflixOriginals = await fetchMovieList(requests.fetchNetflixOriginals,"Fetch Netflix Originals");
    const fetchActionMovies = await fetchMovieList(requests.fetchActionMovies,"Fetch Action Movies");
    const fetchComedyMovies = await fetchMovieList(requests.fetchComedyMovies,"Fetch Comedy Movies");
    const fetchHorrorMovies = await fetchMovieList(requests.fetchHorrorMovies,"Fetch Horror Movies");
    const fetchRomanceMovies = await fetchMovieList(requests.fetchRomanceMovies,"Fetch Romance Movies");
    const fetchDocumentaries = await fetchMovieList(requests.fetchDocumentaries,"Fetch Documentaries");
}

fetchAll();
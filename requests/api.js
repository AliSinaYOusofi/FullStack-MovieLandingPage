const key = "6fab499c3bcdf2439b4e10623aeb3996";
 
const endPoints = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&langauge=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&langauge=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&langauge=en-US&page=2`,
    requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&langauge=en-US&query=horror&page=1&include`,
    requestUpcomping: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&langauge=en-US&page=2`,
    requestTVPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&langauge=en-US&page=2`,
    requestAdult: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&langauge=en-US&&page=2`,
}

export default endPoints;
const api_key = "4dd319a818c7afe2f2a2fe87856a2cfc";
const request = {
	fetchTrending: `/trending/all/week?api_key=${api_key}`,
	fetchNetflixOriginals: `/discover/tv?api_key=${api_key}&with_networks=213`,
	fetchTopRated: `movie/top_rated?api_key=${api_key}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${api_key}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${api_key}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${api_key}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${api_key}&with_genres=10749`,
	fetchDocomentries: `/discover/movie?api_key=${api_key}&with_genres=99&page=2`,
};

export { request, api_key };

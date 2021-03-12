import { api_key } from "../request";
const apikey = api_key;

const requests = {
	fetchAiringtoday: `tv/airing_today?api_key=${apikey}&page=1`,
	fetchPopular: `tv/popular?api_key=${apikey}&page=1`,
	fetchToprated: `/tv/top_rated?api_key=${apikey}&page=1`,
	fetchOntheair: `tv/on_the_air?api_key=${apikey}&page=1`,
};

export default requests;

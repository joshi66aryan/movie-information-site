import React from "react";
import Banner from "../Banner/Banner";
import { request } from "../request";
import Row from "../Row/Row";

function Flim() {
	return (
		<div>
			<Banner />
			<Row titles="NETFLIX ORIGINAL" fetchUrl={request.fetchNetflixOriginals}/>
			<Row titles="TRENDING NOW" fetchUrl={request.fetchTrending} />
			<Row titles="ACTION MOVIES" fetchUrl={request.fetchActionMovies} />
			<Row titles="COMEDY MOVIES" fetchUrl={request.fetchComedyMovies} />
			<Row titles="HORROR MOVIES" fetchUrl={request.fetchHorrorMovies} />
			<Row titles="TOP RATED" fetchUrl={request.fetchTopRated} />
			<Row titles="ROMANCE MOVIES" fetchUrl={request.fetchRomanceMovies}/>
			<Row titles="DOCUMENTRIES" fetchUrl={request.fetchDocomentries} />
		</div>
	);
}

export default Flim;

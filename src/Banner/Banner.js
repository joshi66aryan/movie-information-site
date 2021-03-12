import React, { useState, useEffect } from "react";
import axios from "../axios";
import { request } from "../request";
import "./Banner.css";
import YouTube from "react-youtube";
import { api_key } from "../request";
import { Link } from "react-router-dom";
const ap = api_key;

function Banner() {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");
	useEffect(() => {
		async function fetchData() {
			const requests = await axios.get(request.fetchNetflixOriginals);
			setMovies(
				requests.data.results[
					Math.floor(Math.random() * requests.data.results.length - 1)
				]
			);
			return requests;
		}
		fetchData();
	}, []);

	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}
	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	async function handelOnclick(movie) {
		/*const tvKey;*/

		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			const resMovie = await fetch(
				`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${ap}&language=en-US`
			);
			const dataMovie = await resMovie.json();
			if (dataMovie.success !== false) {
				setTimeout(function () {
					alert("click play button again to exit video ");
				}, 5000);

				const movieKey =
					dataMovie.results.length >= 1
						? dataMovie.results[0].key
						: "";
				setTrailerUrl(movieKey);
			}
		}
	}

	return (
		<div>
			<nav
				className="banner"
				style={{
					backgroundSize: "cover",
					backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
					backgroundPosition: "center center",
				}}
			>	
				
				<div className="banner__contents">
					<h1 className="banner__title">
						{movies?.title || movies?.name || movies?.original_name}
					</h1>
					<div className="banner__buttons">
						<button
							className="banner__button"
							onClick={() => handelOnclick(movies)}
						>
							Play
						</button>
						<Link
							style={{ textDecoration:"none"}}
							to={`/flim/${movies.id}`}
						>		
							<button className="banner__button">	
								Detail
							</button>
						</Link>
					</div>
					<h1 className="banner__description">
						{truncate(movies?.overview, 150)}
					</h1>
				</div>
				<div className="fade_bottom"></div>
			</nav>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Banner;

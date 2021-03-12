import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import { api_key } from "../request";
import { Link } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";
const ap = api_key;

function Row({ titles, fetchUrl }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	//about youtube opt  at line 90
	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	// onclick on any posture trigger handelOnclick function
	async function onrightclick(movie) {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			const resTV = await fetch(
				`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${ap}&language=en-US`
			);
			const data = await resTV.json();

			if (data.success !== false) {
				const tvKey =
					data.results.length >= 1 ? data.results[0].key : "";
				setTrailerUrl(tvKey);
			} else {
				const resMovie = await fetch(
					`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${ap}&language=en-US`
				);
				const dataMovie = await resMovie.json();
				if (dataMovie.success !== false) {
					const movieKey =
						dataMovie.results.length >= 1
							? dataMovie.results[0].key
							: "";
					setTrailerUrl(movieKey);
				}
			}
		}
	}

	return !movies.length ? (
		<h1 style={{ color: "#5AAB61", display: "block" }}>.</h1>
	) : (
		<div className="Row">
			<div className="title">{titles}</div>
			<div className="Row_Pics">
				{movies.map(function (movie) {
					return (
						<Link
							style={{ margin: "15px 2px 50px 10px" }}
							to={`/flim/${movie.id}`}
							key={movie.id}
						>
							<img
								
								onContextMenu={() => onrightclick(movie)}
								className="Row_pic"
								src={`${base_url}${movie.poster_path}`}
								alt={movie.name}
							/>
						</Link>
					);
				})}
			</div>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;

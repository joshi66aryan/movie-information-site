import React, { useState, useEffect } from "react";
import "./Tvshow.css";
import axios from "../axios";
import YouTube from "react-youtube";
import { api_key } from "../request";
import { Link } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";
const apikey = api_key;
function Tvshow({ titles, fetch_Url }) {
	const [show, setShow] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");
	useEffect(() => {
		async function fetchData() {
			const fetch = await axios.get(fetch_Url);
			setShow(fetch.data.results);
			return fetch;
		}
		fetchData();
	}, [fetch_Url]);

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
			const resTV = await fetch(
				`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${apikey}&language=en-US`
			);
			const data = await resTV.json();
			/*console.log(data);*/
			if (data.success !== false) {
				const tvKey =
					data.results.length >= 1 ? data.results[0].key : "";

				/*console.log(typeof tvKey);*/
				setTrailerUrl(tvKey);
			}
		}
	}
	return !show.length ? (
		<h1 style={{ color: "#5AAB61", display: "block" }}>.</h1>
	) : (
			<div className="horizontal">
				<div className="headers"> {titles} </div>
				<div className="postures">
					{show.map(function (item) {
						return (
							<Link
								style={{ margin: "15px 2px 50px 10px" }}
								to={`/flim/${item.id}`}
								key={item.id}
							>
								<img
									onContextMenu={() => handelOnclick(item)}
									className="posture"
									src={`${base_url}${item.poster_path}`}
									alt={item.name}
								/>
							</Link>	
						);
					})}
				</div>
				{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
			</div>
	
	);
}

export default Tvshow;

import React, { useState, useEffect } from "react";
import "./Search.css";
import YouTube from "react-youtube";
import { api_key } from "../request";
import { Link } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";
const ap = api_key;

function Search({inputValue}) {
	const [result, setResult] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");

	useEffect(() => {
		try{
			async function fetchData() {
				if(inputValue.length>0)
				{
					const searchData = await fetch(
						`https://api.themoviedb.org/3/search/multi?query=${inputValue}&api_key=${ap}&language=en-US`
					);
					const searchResult = await searchData.json();
					if(searchResult.success!==false){
						setResult(searchResult.results);
					}
				}
			}
			fetchData();
		} catch(err){
			console.log(err);
		}
			
	}, [inputValue])

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

	return (
		(inputValue.length)?
			(result.length)?
				<div className="hoz">
					<div className="header">Search Results</div>
					<div className="hoz_Pics">
						{result.map(function (movie) {
							return (
								<Link
									style={{ margin: "15px 2px 50px 10px" }}
									to={`/flim/${movie.id}`}
									key={movie.id}
								>
									<img
										onContextMenu={() => onrightclick(movie)}
										className="hoz_pic"
										src={`${base_url}${movie.poster_path||movie.backdrop_path}`}
										alt={movie.title}
									/>
								</Link>
							);
						})}
					</div>

					{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
				</div>
			:<div style={{fontSize:"80px",color:"#bbb", position:"absolute",top:"50%",left:"36%",transform:"translateY(-50%)"}}>NOT FOUND</div>		
		:<div>
			<span 
				style={{fontSize:"100px",color:"#bbb", position:"absolute",top:"50%",left:"50%",transform:"translateY(-50%)"}} 
				className="fas fa-search">
			</span>
		</div>		
	);

}

export default Search;

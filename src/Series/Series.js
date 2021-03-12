import React from "react";
import requests from "./request2";
import Tvshow from "../Tvshow/Tvshow";

function Series() {
	return (
		<div>
			<Tvshow
				titles="AIRING TODAY"
				fetch_Url={requests.fetchAiringtoday}
			/>
			<Tvshow titles="POPULAR" fetch_Url={requests.fetchPopular} />
			<Tvshow titles="TOP RATED" fetch_Url={requests.fetchToprated} />
			<Tvshow titles="ON THE AIR" fetch_Url={requests.fetchOntheair} />
		</div>
	);
}

export default Series;

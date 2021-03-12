import React , {useState,useEffect} from "react";
import { api_key } from "../request";
import "./Detailrow.css";

const ap = api_key;
const base_url = "https://image.tmdb.org/t/p/original/";
function Detailrow({match}) {

	var director=[];
	var writer=[];
	var sound=[];
	var editor=[];
	var producer=[];
	const [details,setDetails]=useState([]);
	const [genres,setGenres]=useState([]);
	const [actor,setActor]=useState([]);
	const [moviecrew,setMoviecrew]=useState([]);
	const [language,setLanguage]=useState([]);
	const [productioncompanies,setProductioncompanies]=useState([]);
	const [productioncountry,setProductioncountry]=useState([]);
	const [rdata,setRdata]=useState([]);
	const [hide,setHide]=useState(false);
	const [reviewhide, setReviewhide]=useState(false);



	//fetching apis from tmdb api 
	useEffect(() => {
		async function fetchdata(){
			console.log = console.warn = console.error = () => {};
			const tvDetail= await fetch(
				`https://api.themoviedb.org/3/tv/${match.params.id}?api_key=${ap}&language=en-US`
			);
			const tvData = await tvDetail.json();
			const tvcreditDatas = await fetch(
				`https://api.themoviedb.org/3/tv/${match.params.id}/credits?api_key=${ap}&language=en-US`
			);
			const tvcreditData = await tvcreditDatas.json();
			const review=await fetch(
				`https://api.themoviedb.org/3/tv/${match.params.id}/reviews?api_key=${ap}&language=en-US`
			);
			const reviewData=await review.json();
	

			if(tvData.success!==false && tvcreditData.success!==false && reviewData.success!==false){
				setDetails(tvData);
				setLanguage(tvData.spoken_languages);
				setGenres(tvData.genres);
				setProductioncompanies(tvData.production_companies);
				setProductioncountry(tvData.production_countries);
				setActor(tvcreditData.cast);
				setMoviecrew(tvcreditData.crew);
				setRdata(reviewData.results);
			} else {
				const movieDetail = await fetch(
					`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${ap}&language=en-US`
				);
				const movieData = await movieDetail.json();	
				const creditDatas = await fetch(
					`https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=${ap}&language=en-US`
				);
				const creditData = await creditDatas.json();
				const movieReview=await fetch(
					`https://api.themoviedb.org/3/movie/${match.params.id}/reviews?api_key=${ap}&language=en-US`
				);
				const movieReviewdata=await movieReview.json();

				if(movieData.success!==false && creditData.success!==false && movieReviewdata.success!==false){
					setDetails(movieData);
					setLanguage(movieData.spoken_languages);
					setGenres(movieData.genres);
					setProductioncompanies(movieData.production_companies);
					setProductioncountry(movieData.production_countries);
					setActor(creditData.cast);
					setMoviecrew(creditData.crew);
					setRdata(movieReviewdata.results);
				}
			}
		}
		fetchdata();

	}, [match.params.id])

	//function to push director and writer etc item to above mention array 
	function pushData(moviecrew){

		moviecrew.forEach(function functionData(item){
			if(item.known_for_department==="Directing") {
				director.push(item.name);
			}
			if (item.known_for_department==="Writing") {
				writer.push(item.name);
			}
			if (item.known_for_department==="Production") {
				producer.push(item.name);
			}
			if (item.known_for_department==="Editing") {
				editor.push(item.name);
			}
			if (item.known_for_department==="Sound") {
				sound.push(item.name);
			}


		});	
	}

	pushData(moviecrew);

	//reduce large element of an array to determinictics size
	var  directorItem=director.slice(0,3);
	var  writerItem=writer.slice(0,3);	

	// hide and show fumctionality
	function onMoreinfo(){
		setHide(!hide);
		setReviewhide(false);
	}
	function review(){
		setReviewhide(!reviewhide);
	}


	return(
		<div className="details">
			<div className="box">
				<div className="gap">

					<img
						className="pic"
						src={`${base_url}${details.poster_path||details.backdrop_path}`}
						alt={details.name}
					/>
					<div className="firstdetail">
						<div className="title"><strong>{details.title||details.original_title||details.original_name}</strong></div>
						<div className="overviewcontent"><span className="overview">{details.overview}</span></div>
						<div className="content"> <strong className="contenttitle">Genres:</strong>
							{
								genres.map(function (item,index) {
									return (
										<span className="contentitem" key={ index } > { (index? ',' : "" ) + item.name }</span>
									);
								})
							}
						</div>
						<div className="content"> <strong className="contenttitle">Director:</strong>
							{
								directorItem.length?(directorItem.map((elem,i)=>{
									return (
										<span className="contentitem" key={i}>
											{ (i? ',' : "" ) + elem }
										</span>
									);
								})):<div style={{color:"#5AAB61",fontSize:"12px"}}>N/A</div>
							}

						</div>	

						<div className="content" ><strong className="contenttitle">Writer:</strong>
							{	
								
								writerItem.length?(writerItem.map(function (elem,i){
									return (
										<span className="contentitem" key={i}>
											{ (i? ',' : "" ) + elem }
										</span>
									);
								})):<div style={{color:"#5AAB61",fontSize:"12px"}}>N/A</div>
							}
						</div>
						
						<div className="content">
							<strong className="contenttitle">Duration: </strong>
								<span 
								className="contentitem"
								>
									{ details.runtime || details.episode_run_time } min
								</span>
						</div>

						<div className="content">
							<strong className="contenttitle">Release: </strong>
							<span 
							className="contentitem"
							>
								{ details.release_date || details.first_air_date } 
							</span>
						</div>

						<div className="content">
							<strong className="contenttitle">Language: </strong>
							
							{
								language.map(function (elem,i) {
									return (
										<span className="contentitem" key={i}>
											{ (i? ',' : "" ) + elem.name }
										</span>
									);
								})
							}		
						</div>

					</div>
				</div>
			</div>	
			<div  className="moreButton "><strong  onClick={()=>onMoreinfo()} className="moreInnerbutton">more</strong></div>
			{	
				// ADDITIONAL INFORMATION IS LOADED WHEN MORE BUTTON IS CLICKED
				(hide===true)?

					<div className="seconddetails">
						<div className="gapabove">
							<div className="seccontent"> 
								<strong className="seccontenttitle">Actor:</strong>
									{
										actor.length?(actor.map(function (item,index) {
											return (
												<span className="seccontentitem" key={index}>
													{ ( index? ',' : "" ) + item.name }
												</span>
											);
										})):<div style={{color:"#5AAB61",fontSize:"12px"}}>N/A</div>
									}
							</div>
							
							<div className="seccontent"><strong className="seccontenttitle">Producer:</strong>
								{	
									producer.length?(producer.map(function (elem,i){
										return (
											<span className="seccontentitem" key={i}>
												{ ( i? ',' : "" ) + elem }
											</span>
										);
									})):<div style={{color:"#5AAB61",fontSize:"12px"}}>N/A</div>
								}
							</div>

							<div className="seccontent"> 
								<strong className="seccontenttitle">Production companies:</strong>
								{
									productioncompanies.length?(productioncompanies.map(function (item,index) {
										return (
											<span className="seccontentitem" key={index}>
												{ ( index? ',' : "" ) + item.name }
											</span>
										);
									})):<div style={{color:"#5AAB61",fontSize:"12px"}}>N/A</div>
								}
							</div>

							<div className="seccontent"> 
								<strong className="seccontenttitle">Production contries:</strong>
								{
									productioncountry.length?(productioncountry.map(function (item,index) {
										return (
											<span className="seccontentitem" key={index}>
												{ ( index? ',': "") + item.name }
											</span>
										);
									})):<div style={{color:"#5AAB61",fontSize:"12px"}}>N/A</div>
								}
							</div>

							<div className="seccontent"> <strong className="seccontenttitle">Editor:</strong>
								{	
									editor.length?(editor.map(function (elem,i){
										return (
											<span className="seccontentitem" key={i}>
												{ ( i? ',' : "" ) + elem }
											</span>
										);
									})):<div style={{color:"#5AAB61",fontSize:"12px"}}>N/A</div>
								}
							</div>

							<div className="seccontent"> <strong className="seccontenttitle">Music:</strong>
									{	
										
										sound.length?(sound.map(function (elem,i){
											return (	
												<span className="seccontentitem" key={i}>
													{ ( i? ',' : "" ) + elem }
												</span>
											);
										})):<div style={{color:"#5AAB61",fontSize:"12px"}}>N/A</div>
									}
							</div>

							<div className="seccontent"> <strong onClick={()=>review()} style={{cursor:"context-menu"}} className="seccontenttitle">Reviews<span style={{marginLeft:"10px"}} className="fas fa-caret-down"></span></strong>
									{	
										
										(reviewhide)?	
											rdata.length?(rdata.map(function (elem,i){
												return (
													<div  style={{paddingTop:"16px",paddingLeft:"15px"}} key={i}>	
														<strong style={{color:"#aaa",fontSize:"14px",paddingTop:"20px",}}>{elem.author}:</strong>	
														<span className="seccontentitem">
															{ elem.content }
														</span>
													</div>		
												);
											})):<div style={{color:"#5AAB61",fontSize:"12px"}}>N/A</div>
										:null	
									}
							</div>
						</div>	
					</div>
				:null	
			}	
		
		</div>
	);
}

export default Detailrow;

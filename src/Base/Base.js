import React from "react";
import "./Base.css";
import { Link } from "react-router-dom";
import Particles from 'react-particles-js';

const Base = ({onInputChangeBase}) => {
	console.log = console.warn = console.error = () => {};

	const particlesOptions = {
	  particles: {
	    number: {
	      value: 30,
	      density: {
	        enable: true,
	        value_area: 800
	      }
	    }
	  }
	}

	return (
		<div className="container">
			 <Particles className='particles'
			  params={particlesOptions}
			/>
			<div className="logo">
				<li> IMPORTV </li>
			</div>
			<form className="form">

				<input
					className="searchdata"
					placeholder="Search for movies"
					required
					onChange={onInputChangeBase}
				/>
				<Link
					style={{ textDecoration:"none"}}
					to={"/Search"}
				>
					<button type="submit" className="fas fa-search searchButton"></button>
				</Link>	

			</form>
				<div className="gotomain">
					<Link style={{ textDecoration: "none",margin:"auto",color:"#fff"}} to="/flim">
						Go to main page
					</Link>	
				</div>
			<div className="pg">
				<span className="texts">
					<div className="txt">
						<b className="at">IMPORTV</b>
						<b>-Search Movies Information</b>
					</div>
					<div id="first">
						Importv is the best site to inquire movies
						information.
						<br />
					</div>
					<div className="sentxt">
						User can search and watch movies trailer. User can get
						latest information about
						<br /> movies,overview of movies, cast and also rate
						movies.
					</div>
				</span>
			</div>
		</div>
	);
}

export default Base;

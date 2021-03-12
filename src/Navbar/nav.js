import React, { Component } from "react";
import {Link } from "react-router-dom";
import {withRouter} from 'react-router';
import "./nav.css";

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			presentState: false
		};
	}
	handleclick = () => {
		const searchBtn = document.querySelector(".search-icon");
		const cancelBtn = document.querySelector(".cancel-icon");
		const items = document.querySelector(".nav-items");
		items.classList.add("active");
		searchBtn.classList.add("hide");
		cancelBtn.classList.add("show");
	};

	cancelRemove = () => {
		const searchBtn = document.querySelector(".search-icon");
		const cancelBtn = document.querySelector(".cancel-icon");
		const items = document.querySelector(".nav-items");
		const form = document.querySelector("form");
		items.classList.remove("active");
		searchBtn.classList.remove("hide");
		cancelBtn.classList.remove("show");
		form.classList.remove("active");
	};

	formAdd = () => {
		const searchBtn = document.querySelector(".search-icon");
		const cancelBtn = document.querySelector(".cancel-icon");
		const form = document.querySelector("form");
		form.classList.add("active");
		searchBtn.classList.add("hide");
		cancelBtn.classList.add("show");
	};

	 profileShow = () =>{
	 	this.setState({presentState: (!this.state.presentState)});
	};
	
	logoutHandler =(e) => {
			this.props.onRouteChange('signout')
			this.setState({presentState:false})
	        this.props.history.push('/');
	        localStorage.clear();
	    }

	listStyle = () => {
		return { textDecoration: "none" };
	};

	render() {
		const {isSignedIn , Id } = this.props;
		if(isSignedIn){
			return (
				<header className="navstyle">
				
					<div className="menu-icon">
						<span
							onClick={this.handleclick}
							className="fas fa-bars"
						></span>
					</div>
					<div className="logo">
						<Link style={this.listStyle()} to="/home"> <li> IMPORTV</li> </Link>
					</div>		
					<div className="nav-items">
						<Link style={this.listStyle()} to="/home"> <li>Home</li> </Link>
						<Link style={this.listStyle()} to="/flim"> <li>Movies</li> </Link>
						<Link style={this.listStyle()} to="/tvshow"> <li>TV-Series</li> </Link>
					</div>
					<div className="search-icon">
						<span
							onClick={this.formAdd}
							className="fas fa-search"
						></span>
					</div>

					<div className="cancel-icon">
						<span
							onClick={this.cancelRemove}
							className="fas fa-times"
						></span>
					</div>

					<form onSubmit={(event) => this.removedefault(event)}>
						<input
							id="clear"
							autoComplete="off"
							className="search-data"
							placeholder="Enter keyword.. "
							onChange={this.props.onInputChange}
						/>
						<Link
							style={{ textDecoration:"none"}}
							to={"/Search"}
						>	
							<button type="submit" className="fas fa-search"></button>
						</Link>
					</form>
					<div  onClick={this.profileShow} className="dropdown_arrow">
						<span
							className="fas fa-caret-down"
						></span>
					</div>
					{
						(this.state.presentState)?				
							<div  className="account-items">

								<div style={{cursor:"pointer"}}>
									<Link
										style={{ color:"inherit",textDecoration:"none" }}
										to={`/Profile/${Id}`}
									>
										<i style={{paddingRight:"5px"}} className="fas fa-user-circle"></i>
										Profile
										<hr style={{marginTop:"5px",marginBottom:"5px"}}/>

									</Link>
								</div>
								<div 
									style={{cursor:"pointer"}} 
									onClick={e=>this.logoutHandler(e)}
								>
									<i 
										style={{paddingRight:"5px"}} 
										className="fas fa-sign-out-alt"
									>
									</i>

									Sing Out

								</div>
							</div>
						:null	
					}				
				</header>
			);	
		} else {
			return(
				<header className="navstyle">
					<div className="logo">
						<Link style={this.listStyle()} to="/">
							<li> IMPORTV</li>
						</Link>
					</div>	
				</header>
			);	
		}
	}
	removedefault = (event) => {
		event.preventDefault();
		document.getElementById("clear").value = "";
	};
}

export default withRouter(Nav);

import React, { Component } from "react";
import "./App.css";
import Nav from "./Navbar/nav";
import Flim from "./Flim/Flim";
import Base from "./Base/Base";
import Series from "./Series/Series";
import Detailrow from "./Row/Detailrow";
import Search from "./Search/Search";
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';
import Profile from './Profile/Profile';
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
			route:'signin',
			isSignedIn:false,
			user: {
				id: '',
				userName: '',
				email:  '',		
				joined:''
			}
		}	
	}


	loadUser = (data) => {

		this.setState({user:{
			id: data.id,
			userName: data.name,
			email:  data.email,		
			joined:data.joined

		}})
	}

	componentDidMount(){
		const authState = localStorage.getItem('auth');
		if(authState) {
		  this.setState({route: JSON.parse(authState) });
		}
		const isSign = localStorage.getItem('signin_state');
		if(isSign) {
		  this.setState({isSignedIn: JSON.parse(isSign) });
		}
		const users = localStorage.getItem('saveuser');
		if(users) {
		  this.loadUser(JSON.parse(users));
		}

	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onRouteChange = (route)=>{
		if (route === 'signout') {
		  this.setState({isSignedIn: false})
		} else if (route === 'home') {
		  this.setState({isSignedIn: true})
		}
		this.setState({route: route});
		localStorage.setItem('auth',JSON.stringify(route))
		localStorage.setItem('saveuser',JSON.stringify(this.state.user));
		localStorage.setItem('signin_state',JSON.stringify(this.state.isSignedIn))
	}

	render() {
		return (
			<Router>
				<Switch>
					<React.Fragment>
						<Nav  
							Id={this.state.user.id} 
							isSignedIn={this.state.isSignedIn} 
							onRouteChange={this.onRouteChange} 
							onInputChange={this.onInputChange}
						/>
						{ this.state.route === 'home'?
								<div>
									<Redirect to="/home"/>
									<Route path="/home" exact>
										<Base onInputChangeBase={this.onInputChange}/>
									</Route>
									<Route path="/flim" exact component={Flim} />
									<Route path="/tvshow" component={Series} />
									<Route path="/flim/:id" component={Detailrow} />
									<Route path="/Search"> 
										<Search inputValue={this.state.input}/>
									</Route>
									<Route path="/Profile/:Id"> 
										<Profile 
											name={this.state.user.userName}
											email={this.state.user.email}
											joinedDate={this.state.user.joined}
										/>
									</Route>
								</div>
									
							:   
							<div>
								<Route path="/" exact>
									<Signin
										loadUser={this.loadUser}  
										onRouteChange={this.onRouteChange}
									/>
								</Route>
								<Route path="/register" exact>
									<Signup 
										loadUser={this.loadUser} 
										onRouteChange={this.onRouteChange} 
									/>
								</Route>
							</div>
						}	
					</React.Fragment>
				</Switch>
			</Router>
		);
	}
}

export default App;

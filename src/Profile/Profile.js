import React from "react";
import './Profile.css';

class Profile extends React.Component {

  constructor(props) {
	    super(props);
	    this.state = {
	      originalPassword:"",
	       newPassword:""
	    }
 	}
 	onOriginalPassword = (event) => {
 	  this.setState({originalPassword: event.target.value})
 	}

 	onNewPassword = (event) => {
 	  this.setState({newPassword: event.target.value})
 	}

 	onSubmitPassword = ()=>{
    fetch('http://localhost:3000/changepassword', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
       	email : this.props.email,
     	originalpassword : this.state.originalPassword,
     	newpassword : this.state.newPassword
      })
    })
    .then(response => response.json())
    .then((data)=>{
    	if(data.message === "updated")
	    	document.querySelector(".orgpasswordfield").value = "";
	    	document.querySelector(".changepasswordfield").value = "";
	    	setTimeout(function () {
	    		alert("password updated successfully");
	    	}, 900);
     
    })
  }


 	render() {
 		const { name, email } = this.props;
		return (
			<div className="main">
				<div className="profile"><i style={{paddingRight:"5px"}} className="fas fa-user-circle"></i>Profile</div>
				<div className="info">
					<div className="username">
						<div className="usernametitle">Username</div> 
						<span className="usernameitem"> { name } </span>
					</div>
					<div className="emailname">
						<div className="email">Email </div>
						<span className="emailitem"> { email } </span>
					</div>
					<div className="changetitle">Change Password</div>
					<div className="flex">
						<div  className="orgpassword" >Password</div>   
						<input
		                    className="orgpasswordfield"
		                    type="password"
		                    onChange={this.onOriginalPassword}
		                    placeholder="Original Password"
		                />
		            </div>
					<div className="flex">
						<div className="chngpassword">New Password </div>  
						<input
		                    className="changepasswordfield"
		                    type="password"
		                    onChange={this.onNewPassword}  
		                    placeholder="New Password"
		                />
		            </div>
		            <div onClick={ this.onSubmitPassword } className="save">Change</div>
		        </div>    
			</div>
		)
	}	
}

export default Profile;

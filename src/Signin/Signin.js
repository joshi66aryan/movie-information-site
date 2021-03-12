import React from 'react';
import './Signin.css';
import { Link } from "react-router-dom";



class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn=()=>{
    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        email:this.state.signInEmail,
        password:this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(data =>{
        if(data.id){
          this.props.loadUser(data)
          this.props.onRouteChange('home');
        }
    })
  }

  render() {
    return (
          <div  className="image">
            <div className="container">
              <fieldset className="box">
                <div className="signin_contain">
                  <div className="signin_tit"><strong>Sign In</strong></div>

                  <div className="inputfield_box">
                    <input
                      className="inputfield"
                      type="email"
                      onChange={this.onEmailChange}
                      required
                    />
                    <label className="label">Email</label>
                  </div>

                  <div className="inputfield_box">
                    <input
                      className="inputfield"
                      type="password"
                      onChange={this.onPasswordChange}  
                      required
                    />
                    <label className="label">Password</label>
                  </div>

                  <input onClick={this.onSubmitSignIn}  className="submit" type="submit"/>

                  <div className="base">
                    <label className="remember"><input style={{color:"#8e95a5"}}type="checkbox"/> Remember me</label>  
                    <label className="help">Need help?</label>    
                  </div>
                </div> 

                <div className="Registerbox">
                  <label className="signup">Not member? 
                    <Link style={{ textDecoration: "none" }} to="/register">
                      <span style={{color:"#fff"}}>Sign up</span>
                    </Link>  
                  </label>  
                  
                </div>
              </fieldset>
            </div>
          </div>  
    );
  }  
}
export default Signin;
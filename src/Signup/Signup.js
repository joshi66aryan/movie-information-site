import React from 'react';
import '../Signin/Signin.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
    }
  }
  onNameChange = (event) => {
    this.setState({userName: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
 

  onSubmitSignUp=()=>{
     
    fetch(' https://quiet-cove-71350.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        userName:this.state.userName,
        email:this.state.email,
        password:this.state.password
      })
    })
    .then(response => response.json())
    .then(user =>{
      if(user.id){
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
   
  }

  render() {
    return (
          <div className="image">
            <div className="container">
              <fieldset className="box">
                <div className="signin_contain">
                  <div className="signin_tit"><strong>Sign up</strong></div>
                  <div className="inputfield_box">
                   
                    <input
                      className="inputfield"
                      onChange={this.onNameChange}
                      type="text"
                      required
                    />
                    <label className="label">Username</label>

                  </div>
                  <div className="inputfield_box">
                   
                    <input
                      className="inputfield"
                      onChange={this.onEmailChange}
                      type="email"
                      required
                    />
                    <label className="label">Email</label>
                  </div>

                  <div className="inputfield_box">
                    <input
                      className="inputfield"
                      onChange={this.onPasswordChange}
                      type="password"
                      required
                    />
                    <label className="label">Password</label>
                  </div>

                  <input onClick={this.onSubmitSignUp} className="submit" type="submit"/>
                </div>  
              </fieldset>
            </div>
          </div>  
    );
  }  
}
export default Signin;
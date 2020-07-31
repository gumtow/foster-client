import React, { Component } from 'react';
import axios from 'axios';
import Registration from './auth/Registration'
import Login from './auth/Login';
import Default from '../Default';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }


    handleLogoutClick() {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response =>{
            this.props.handleLogout();
        }).catch(error => {
            console.log("logout error", error);
        });       
    }


  

  render() {
    return (
      <div className='home'>
        <Default bg="#495867">
          <h1>Home</h1>
          <h2>Status: {this.props.loggedInStatus}</h2>
          {this.props.loggedInStatus === "NOT_LOGGED_IN" ? <Link to="/login"><button>Log In</button></Link> : <button onClick={()=>this.handleLogoutClick()} >Logout</button> }
          
          
        </Default>

        <Default bg="#fff">

        </Default>

      </div>
    );
  }
}

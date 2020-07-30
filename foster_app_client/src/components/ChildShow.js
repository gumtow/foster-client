import React, { Component } from 'react';
import axios from 'axios';

export default class ChildShow extends Component {


    constructor(props) {
        super(props);
        this.state = {

        };

    }


    getChildData(){
        axios.get(`http://localhost:3001/children/${this.props.match.params.id}`, {withCredentials: true}).then(response => {
            console.log(response.data.name);
            this.setState({
                name: response.data.name,
                status: response.data.status,
                child: response.data
            })
        }).catch(error => {
            console.log("children db", error);
        })
    }

    componentDidMount(){
        this.getChildData();
    }

    handleLogoutClick=()=> {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response =>{
            this.props.handleLogout();
            this.props.history.push("/");
        }).catch(error => {
            console.log("logout error", error);
        }); 
    }

    render(){
            console.log(this.state);
            return(
                <div>
                    <button onClick={()=>this.handleLogoutClick()}>Logout</button>
                    <h1>Hello {this.state.name}</h1>
                    {this.state.child ? <p>{this.state.child.status}</p> : ''}
                </div>
            )
    }
}


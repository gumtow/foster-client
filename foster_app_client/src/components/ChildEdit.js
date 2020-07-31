import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class ChildEdit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    getChildData(){
        axios.get(`http://localhost:3001/children/${this.props.match.params.id}`, {withCredentials: true}).then(response => {
            this.setState({
                child: response.data
            })
        }).catch(error => {
            console.log("children db", error);
        })
    }

    componentDidMount(){
        this.getChildData();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        axios.put(`http://localhost:3001/children/${this.props.match.params.id}`, {
                name: this.state.name,
                status: this.state.status,
                pictures: this.state.pictures,
                documents: this.state.documents
        }, 
        { withCredentials: true }
        ).then(response =>{
            this.props.history.push("/dashboard");
            }
        );
        // getChildData();
        event.preventDefault();
    };

    handleLogoutClick=()=> {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response =>{
            this.props.handleLogout();
            this.props.history.push("/");
        }).catch(error => {
            console.log("logout error", error);
        }); 
    }

    render(){
        if (this.state.child){
            return(
                <div>
                    <button onClick={()=>this.handleLogoutClick()}>Logout</button>
                    <h1>Hello {this.state.child.name}</h1>
                    <form onSubmit={this.handleSubmit} >
                        <input type="string" name="name" placeholder={this.state.child.name} value={this.state.name} onChange={this.handleChange} required />
                        <input type="string" name="status" placeholder={this.state.child.status} value={this.state.status} onChange={this.handleChange} required />
                        <input type="string" name="pictures" value={this.state.pictures} onChange={this.handleChange} required />
                        <input type="string" name="documents" value={this.state.documents} onChange={this.handleChange} required />
                        <button type="submit">Update Child</button>
                    </form>
                </div>
            )
        } else {
            return "...loading"
        }
    }
}


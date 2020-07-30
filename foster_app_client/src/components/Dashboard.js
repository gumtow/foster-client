import React, { Component } from 'react';
import axios from 'axios';



export default class Dashboard extends Component {  

    constructor(props) {
        super(props);
    
        this.state = {
            name:"",
            status:"Active",
            pictures: [],
            documents:[]

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        axios.post("http://localhost:3001/children", {
                name: this.state.name,
                status: this.state.status,
                pictures: this.state.pictures,
                documents: this.state.documents,
                user_id: this.props.user.id
        }, 
        { withCredentials: true }
        ).then(response =>{
            console.log(response);
            this.setState({
                name:"",
                status:"Active",
                pictures: [],
                documents:[]
            })
            }
        );
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
        console.log(this.props.user.id)
        return (
            <div>
                <div>
                    <h1>Dashboard</h1>
                    <button onClick={()=>this.handleLogoutClick()}>Logout</button>
                    <h2>Status: {this.props.loggedInStatus}</h2>
                    <form onSubmit={this.handleSubmit} >
                        <input type="string" name="name" placeholder="Child's name" value={this.state.name} onChange={this.handleChange} required />
                        <input type="string" name="status" placeholder={this.state.status} value={this.state.status} onChange={this.handleChange} required />
                        <input type="string" name="pictures" placeholder="picture url" value={this.state.pictures} onChange={this.handleChange} required />
                        <input type="string" name="documents" placeholder="document url" value={this.state.documents} onChange={this.handleChange} required />
                        <button type="submit">Add Child</button>
                    </form>
                </div>
            </div>
        );

    }
}
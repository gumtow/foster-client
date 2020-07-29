import React from 'react';
import axios from 'axios';



const Dashboard = props => {  
    
    const handleLogoutClick=(props)=> {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response =>{
            props.handleLogout();
            props.history.push("/");
        }).catch(error => {
            console.log("logout error", error);
        }); 
    }
    

    return (
        <div>
            <div>
                <h1>Dashboard</h1>
                <button onClick={()=>handleLogoutClick(props)} >Logout</button>
                <h2>Status: {props.loggedInStatus}</h2>
            </div>
        </div>
    );
}

export default Dashboard;
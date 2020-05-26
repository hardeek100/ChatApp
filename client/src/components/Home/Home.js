import React ,{useState}from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const Home = () =>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return(
        <div className="Outer">
        <div className= 'First'>
        <h1>Welcome to Chatapp</h1>        
        <div><input className="nameField" type="text" placeholder="Type your name here" onChange={(e) => setName(e.target.value)}/></div>
        <div><input className="roomField" type="text" placeholder="and room here" onChange={(e)=> setRoom(e.target.value)}/></div>
        <Link onClick = {(e) => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`} >
        <button className="loginButton">Log in</button>
        </Link>    
    </div>
    </div>
    )
}

export default Home;

import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import queryString from 'query-string'
import './Chat.css';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';



let socket;


const Chat = ({location}) =>{

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const DOOR = 'localhost:5000';

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        socket = io(DOOR);
        socket.emit('loggedin', {name, room}, (error) =>{
            if(error){
                alert(error);                        
            }
        })   
    }, [DOOR, location.search]);

    useEffect(()=>{
        socket.on('message', message =>{
            setMessages(messages => [...messages, message]);
        })

    }, [])

   const sendMessage = (e) =>{
       e.preventDefault();
       if(message){
        socket.emit('sendMessage', (message), () => setMessage(''));
       }    
      
   }  
 



    return(
        <div className ="chatbox">
       <div className = "chat">
           <div className = "roombox"><h1>{room}</h1> <a href="/"><button>Leave chat</button></a></div>
           <Messages messages={messages} name={name} />
           
            <form className="form">
                <input className = "input" type ="text" placeholder="Type your message here.. " value={message}
                onChange = {({target: {value}}) => setMessage(value)}
                onKeyPress ={e => e.key === 'Enter' ? sendMessage(e) : null}
                />
                <button className="sendButton" onClick={(e) => sendMessage(e)}>Send</button>
            </form>
           </div>
        </div>    
    )
}

export default Chat;

import React from 'react';

const Message = ({message: {text, user} , name}) =>{
    
    const userName = name.trim().toLowerCase();
    let isSender = false;
    if(user === userName){
        isSender = true;
    } 
   
    return(
       isSender
       ? (
           <div><p>{userName}: {text}</p></div>
       )
       : (
        <div>
            <div><p>{text} : {user}</p></div>           
        </div>
       )
    )
}

export default Message;
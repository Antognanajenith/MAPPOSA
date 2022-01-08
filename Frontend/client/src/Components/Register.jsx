import React from 'react';
import { useRef, useState } from "react";
import  "./Register.scss";
import ICONT from "./Assets/map.png";
import X from "./Assets/close.png";
import {Button,TextField} from "@material-ui/core";
import axios from "axios";



const Register = ({setregmodal,mystorage,setCrname}) => { 

    const [logsuccess,setlogsuccess] = useState(false);
    const [logerror,setlogerror] = useState(false);
    const usernameRef = useRef();
    const emailRef= useRef();
    const passwordRef = useRef();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const newUser = {
            username:usernameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        };
        try{
           const res = await axios.post ("/users/register",newUser);
            mystorage.setItem( "user" ,res.data.username);
            setCrname(res.data.username);
            setlogsuccess(true);
            setlogerror(false);
        }catch(err){
            setlogerror(true);
            console.log(err);
        }
        setTimeout(() => {
            setregmodal(false);
        }, 1000);
        
    }

    return (
        <div className='Loginmodal'>
            <div className='glassformbg'>
                <form className='formcol' onSubmit={handleSubmit}>
                    <img className = "iconmap" src={ICONT} alt="mapicon" />
                    <img className = "xsymbol" src={X} alt="mapicon" onClick={()=>setregmodal(false)}/>
                    <h2 className = "mapposa">MAPPOSA</h2>
                    <div className='glassformalign'>
                        <TextField  placeholder="Username" variant="outlined" inputRef={usernameRef}
                            style ={{width: '250px', minHeight:40,margin:"2px 0"}}></TextField >

                           
                        <TextField  placeholder="Email" variant="outlined"  type="email" inputRef={emailRef}
                            style ={{width: '250px', minHeight:40,margin:"12px 0"}}></TextField >
                        <TextField  placeholder="Password" variant="outlined"  type="password"  inputRef={passwordRef}
                            style ={{width: '250px', minHeight:40,margin:"12px 0"}}></TextField >
                        
                        
                        <Button variant="contained" 
                            style ={{width: '250px',minHeight:40,margin:"5px 0",backgroundColor:"#140D96",color:"rgb(231,227,234)"}} type="submit" >REGISTER</Button>
                            {logsuccess && (<h4>You are logged in!</h4>)}
                            {logerror && (<h4>Incorrect credentials</h4>)}
                    </div>
                    
                </form>
            </div>
            
        </div>
    )
}

export default Register

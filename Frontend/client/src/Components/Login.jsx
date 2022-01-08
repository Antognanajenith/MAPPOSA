import React,{useState,useRef} from 'react';
import  "./Login.scss";
import ICONT from "./Assets/map.png";
import X from "./Assets/close.png";
import {Button,TextField} from "@material-ui/core";
import axios from "axios";



const Login = ({setovmodal,mystorage,setCrname}) => {

    const [logsuccess,setlogsuccess] = useState(false);
    const [logerror,setlogerror] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();


const handleSubmit = async(e) =>{
        e.preventDefault();

        const newUser = {
            username:usernameRef.current.value,
            password:passwordRef.current.value
        };
        try{
            const res = await axios.post ("/users/login",newUser);
            mystorage.setItem( "user" ,res.data.username);
            setCrname(res.data.username);
            setlogsuccess(true);
            setlogerror(false);
        }catch(err){
            setlogerror(true);
            console.log(err);
        }
        setTimeout(() => {
            setovmodal(false);
        }, 1000);
        
    } 


    return (
        <div className='Loginmodal'>
            <div className='glassformbg'>
                <form className='formcol' onSubmit={handleSubmit}>
                    <img className = "iconmap" src={ICONT} alt="mapicon" />
                    <img className = "xsymbol" src={X} alt="mapicon" onClick={()=>setovmodal(false)}/>
                    <h2 className = "mapposa">MAPPOSA</h2>
                    <div className='glassformalign'>
                        <TextField  placeholder="Username" variant="outlined" inputRef={usernameRef}
                            style ={{width: '250px', minHeight:40,margin:"2px 0"}}></TextField >
                        <TextField  placeholder="Password" variant="outlined"  type="password" inputRef={passwordRef}
                            style ={{width: '250px', minHeight:40,margin:"12px 0"}}></TextField >
                        
                        
                        <Button variant="contained" type="submit"
                            style ={{width: '250px',minHeight:40,margin:"5px 0",backgroundColor:"#140D96",color:"rgb(231,227,234)"}}  >LOGIN</Button>
                            {logsuccess && (<h4>You are logged in!</h4>)}
                            {logerror && (<h4>Incorrect credentials</h4>)}
                    </div>
                    
                </form>
            </div>
            
        </div>
    )
}

export default Login

//140D96

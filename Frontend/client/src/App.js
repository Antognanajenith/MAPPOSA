import {useState,useEffect} from "react";
import axios from "axios";
import './App.scss';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import {Button,Input,TextField} from "@material-ui/core";

import {Room,Star} from "@material-ui/icons"
import { format} from 'timeago.js';
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import plus from "./Components/Assets/plus.png";
import minus from "./Components/Assets/minus.png";
import user from "./Components/Assets/user.png";


function App() {

  //states
  const mystorage = window.localStorage;
const [currentplace,setCurrentplace] = useState(null);
const [newplace,setNewplace]= useState(null);
const [crname,setCrname]= useState(mystorage.getItem("user"));

const [lgin,setlgin]= useState(false);
const [ovmodal,setovmodal]= useState(false);
const [regmodal,setregmodal]= useState(false);
const [pins,setPins] = useState([]);
const [ptitle,newptitle ] = useState(null);
const [pdesc,newpdesc ] = useState(null);
const [prating ,newprating ] = useState(0);
const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 13.117461,
    longitude: 80.289773,
    zoom: 13
  });
const [zoomvalue,setZoomvalue] = useState(13);

//useffect  
useEffect( ()=>{
  const getpins = async()=>{
    try{
      const allPins = await axios.get("http://localhost:3003/api/pins");
      setPins(allPins.data);
      
    }catch(e){
      console.log(e);
    }
  };
  getpins();
},[]);
 

 //functions 
const handlemarkerclick =(id,lat,long)=>{
  setCurrentplace(id);
  setViewport({...viewport,latitude:lat,longitude:long})
};

const zoomfunc = ( zoomvalue) =>{
  setZoomvalue(zoomvalue);
  setViewport({...viewport,zoom:zoomvalue})
};

const logout = () =>{
  mystorage.removeItem("user");
  setCrname(null);
}

const addpins =(e)=>{
  const [long,lat] = e.lngLat;
  setNewplace({
    long,lat
  });
}

const postpins = async(e)=>{
  e.preventDefault();
  const newpin={
    username:crname ,
    title:ptitle ,
    desc:pdesc ,
    rating:prating ,
    lat: newplace.lat,
    long: newplace.long
  }
  try{
    const res = await axios.post("http://localhost:3003/api/pins",newpin);
    setPins([...pins,res.data]);
    setNewplace(null);
  }catch(e){

  }
}

  return ( 
    <div  >
         
      <ReactMapGL className="Mapboxclassgl"
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiYW50b2plbiIsImEiOiJja3g0cG4zdXExd21lMnRwenRkbWptY29rIn0.10CkYb3kSGeSnz4_weFr0w"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/antojen/ckx7mrv9t968b14o4745xnizg"
      transitionDuration="200"
      onDblClick={addpins} 
      >
        {pins.map((p)=>(
          <div>
            <Marker latitude={p.lat} longitude={p.long} offsetLeft={0} offsetTop={0}>
              <Room style={{fontsize:viewport.zoom * 7,color: p.username === crname ? "#140D96":"#FF753A",cursor:"pointer"}}
                onClick={()=>handlemarkerclick(p._id,p.lat,p.long)}/>
            </Marker>
            {p._id === currentplace &&
             <Popup 
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                anchor="top-left"
                onClose={()=>setCurrentplace(null)} >
                <div className="Card">
                  <label>Name</label>
                    <h4 >{p.title}</h4>
                  <label>Review</label>
                    <h4>{p.desc}</h4>
                  <label>Rating</label>
                  <div className="Rating">
                    
                    {Array(p.rating).fill(<Star style={{color:"#FF753A"}}/>)}
                  </div>
                  <label>Information</label>
                    <h4>By {p.username}</h4>
                    <h5>{format(p.createdAt)}</h5>
                </div>
            </Popup>}</div>
        ))}
              {newplace && <Popup 
                latitude={newplace.lat}
                longitude={newplace.long}
                closeButton={true}
                closeOnClick={false}
                anchor="top-left"
                onClose={()=>setNewplace(null)} >
                  <>
                  <form className="Formadd" onSubmit={postpins}>
                    <Input placeholder="Place" onChange={(e)=>newptitle(e.target.value)} />
                    <TextField id="standard-basic" label="Review" variant="standard" 
                    onChange={(e)=>newpdesc(e.target.value)} />
                    <select onChange={(e)=>newprating(e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    
                    <Button color="#FF753A" variant="contained" type="submit">SUBMIT</Button>
                    {!crname && (<h4>Please login to review places..</h4>)}
                  </form></>
                  
              </Popup>}
              <div>
             { ovmodal && <>
                <Login setovmodal={setovmodal} mystorage={mystorage} setCrname={setCrname}/>
              </>}   
              { regmodal && <>
                <Register setregmodal={setregmodal} mystorage={mystorage} setCrname={setCrname}/>
              </>}   
       </div>  
      </ReactMapGL>
      <div className="blurbk">
        <div className="lbtn">
                
                {crname ? ( <><img className = "usericon" src={user} alt="userpic" />
                  <h4>{crname}</h4>
                  <button onClick={logout}><h4>LOGOUT</h4></button>
                  </>
                  ):
                (<><button onClick={()=>setovmodal(true)}><h4>LOGIN</h4></button>
                  <button onClick={()=>setregmodal(true)}><h4>REGISTER</h4></button></>
                  
                )}
           </div>
          <div className="zoomes" >
          <button className="zoomed" onClick={()=>zoomfunc((zoomvalue) + .5)}>
          <img className = "plusminus" src={plus} alt="plus" />
          </button>
          <button className="zoomed" onClick={()=>zoomfunc((zoomvalue) - .5)}>
          <img className = "plusminus" src={minus} alt="minus" />
          </button>
          <h4>{zoomvalue}</h4>
        </div>      
      </div>
                
    </div>
  );
}

export default App;

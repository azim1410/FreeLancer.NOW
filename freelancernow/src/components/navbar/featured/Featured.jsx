import React, { useState } from 'react'
import './Featured.scss'
import { useNavigate } from 'react-router-dom'

const Featured = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const[inp, setInp] = useState("")
    const navigate = useNavigate()
    const handelSubmit = () => {
        navigate(`/gigs?search=${inp}`)
    }
  return (
    <div className="featured">
        <div className="container">
            <div className="left">
                <h1>{currentUser === null ? "Join Us and Make your Life easy NOW!!!" : currentUser.isSeller === true ? "Find Your Client and Earn QUICK With FreeLance.NOW" :"Get Your Task Done Quick With FreeLancer.NOW"}</h1>
                <hr />
                <div className="search">
                   <input type="text" placeholder='Search' onChange={e => setInp(e.target.value)}/>
                    <button onClick={handelSubmit}>Search</button>
                </div>
                <div className="popular">
                    <span>Popular:</span>
                    <button onClick={() => navigate("/gigs?cat=web designer")}>Web Designer</button>
                    <button onClick={() => navigate("/gigs?cat=data analyst")}>Data Analyst</button>
                    <button onClick={() => navigate("/gigs?cat=cloud dev")}>Cloud Dev</button>
                    <button onClick={() => navigate("/gigs?cat=android developer")}>Android Developer</button>
                </div>
            </div>
            
    
            
        </div>
    </div>
  )
}

export default Featured
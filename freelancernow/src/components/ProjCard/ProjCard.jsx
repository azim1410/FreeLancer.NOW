import React from 'react'
import { Link } from 'react-router-dom'
import './ProjCard.scss'
const ProjCard = ({item}) => {
  return (
    
    <Link to ="/">
    <div className="ProjCard">
        <img className='bgimg' src={item.img} alt="" />
        <div className="info">
            <img className='ppimg' src={item.pp} alt="" />
            <div className="texts">
                <h2>{item.cat}</h2>
                <h1>{item.username}</h1>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default ProjCard;



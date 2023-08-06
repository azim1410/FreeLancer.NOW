import React from 'react'
import { Link } from 'react-router-dom'
const CatCard = ({card}) => {
  const t = card.title;
  return (
    <Link to={`/gigs?cat=${t}`}>
    <div className="catCard">
      <img src={card.img} alt="" className='catcardimg'/>
      <span className="desc">{card.desc}</span>
      <span className="title">{card.title.toUpperCase()}</span>
    </div>
    </Link>
    
  )
}

export default CatCard
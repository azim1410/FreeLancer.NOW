import React from "react";
import "./gigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="outerbox">
      <Link to={`/gig/${item._id}`} className="link">
        <div
          className="gigCard"
          style={{ backgroundImage: `url(${item.images[0]})` }}
        >
          <img src={item.images[0]} alt="" className="background" />
          <div className="info">
            {isLoading ? (
              "loading"
            ) : error ? (
              "something went wrong"
            ) : (
              <div className="user">
                <img src={data.img} alt="" className="pp" />
                <span>{data.username}</span>
              </div>
            )}
          </div>
          <div className="details">
            <p className="textinfo">{item.desc}</p>
            <div className="star">
              <span>
                Rating - {Math.round(item.totalStars / item.starNumber)}
              </span>
            </div>
            <div className="details">
              <span>Starting at - </span>
              <span>Rs. {item.price}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GigCard;

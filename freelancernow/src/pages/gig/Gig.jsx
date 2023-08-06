import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data; 
      }),
  });

  
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${data.userId}`).then((res) => {
        return res.data;
      }),
  });

  const { search } = useLocation();

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              FreeLancer{" >"} {data.cat} {">"} {data.title}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "sonething went wrong"
            ) : (
              <div className="user">
                <img className="pp" src={dataUser.img} alt="" />
                <span>{dataUser.username}</span>
                <div className="stars">
                  {!isNaN(data.totalstars / data.starnumber) && (
                    <span>{Math.round(data.totalstars / data.starnumber)}</span>
                  )}
                </div>
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              {isLoadingUser ? (
                "Loading"
              ) : errorUser ? (
                "Something went wrong"
              ) : (
                <div className="user">
                  <img src={dataUser.img} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    <div className="stars">
                      {!isNaN(data.totalstars / data.starnumber) && (
                        <span>
                          {Math.round(data.totalstars / data.starnumber)}
                        </span>
                      )}
                    </div>
                    <button>Contact Me</button>
                  </div>
                  <div className="box">
                    <div className="items">
                      <div className="item">
                        <span className="title">From</span>
                        <span className="desc">{dataUser.country}</span>
                      </div>
                      <div className="item">
                        <span className="title">Member since</span>
                        <span className="desc">{dataUser.createdAt}</span>
                      </div>
                      <div className="item">
                        <span className="title">Avg. response time</span>
                        <span className="desc">
                          {dataUser.responseTime}hours
                        </span>
                      </div>
                      <div className="item">
                        <span className="title">Last delivery</span>
                        <span className="desc">1 day</span>
                      </div>
                      <div className="item">
                        <span className="title">Languages</span>
                        <span className="desc">English</span>
                      </div>
                    </div>
                    <hr />
                    <p>{dataUser.desc}</p>
                  </div>
                </div>
              )}
            </div>

            {/* <Reviews gigId={id}/> */}
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>Rs. {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;

import React, { useEffect, useRef } from "react";
import { useState } from "react";
// import { gigs } from '../../data';
import GigCard from "../../components/gigCard/GigCard";
import "./Gigs.scss";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();
  const navigate = useNavigate()
  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs" onClick={() => navigate("/")}>Freelancer.NOW {`->`}{search.slice(5)}</span>
        <h1>{search.slice(5).toUpperCase()}</h1>
        <p>
          
        </p>
      </div>
      <div className="menu">
        <div className="left">
          <span>Budget</span>
          <input type="number" ref={minRef} placeholder="Min" className="Binp" />
          <input type="number" ref={maxRef} placeholder="Max" className="Binp" />
          <button  className="Budgetbtn"onClick={apply}>Apply</button>
        </div>
        <div className="right">
          <span className="sortBy">Sort By - </span>
          <span className="sortType">
            {sort === "sales" ? "Best Selling" : "Newest"}
          </span>
          <h1 className="plusicon" onClick={() => setOpen(!open)}>+</h1>
          {open && (
            <div className="rightMenu">
              {sort === "sales" ? (
                <span className="item" onClick={() => reSort("createdAt")}>
                  Newest
                </span>
              ) : (
                <span className="item" onClick={() => reSort("sales")}>
                  Best Selling
                </span>
              )}
              <span className="item" onClick={() => reSort("sales")}>
                Popular
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="cards">
        {isLoading
          ? "loading"
          : error
          ? "Something went wrrong"
          : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
      </div>
    </div>
  );
};

export default Gigs;

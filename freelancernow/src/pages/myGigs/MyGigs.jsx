import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./MyGigs.scss";
import newRequest from "../../utils/newRequest";
const MyGigs = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  4;
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.post(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) =>{
    mutation.mutate(id);
  }

  

  return (
    <div className="myGigs">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "error occured"
      ) : (
        <div className="container">
          <div className="title">
            <h1>GIGS</h1>
            <Link to="/add">Add new Gig</Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
           {data.map((gig) =>(

             <tr>
              <td>
                <img
                  className="image"
                  src={gig.cover}
                  alt=""
                />
              </td>
              <td>{gig.title}</td>
              <td>
                <sup>{gig.price}</sup>
              </td>
              <td>{gig.sales}</td>
              <td>
                <img
                  className="delete"
                  src="./public/img/delete-button.png"
                  alt=""
                  onClick={()=>handleDelete(gig._id)}
                />
              </td>
            </tr>
              ))
            }
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGigs;

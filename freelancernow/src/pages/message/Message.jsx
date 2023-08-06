import React from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./Message.scss";
import newRequest from "../../utils/newRequest";
import messageModel from "../../../../api/models/message.model";
const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) =>{ 
      return newRequest.post(`/messages`,message)

    },
    onSuccess: () =>{
      queryClient.invalidateQueries(["messages"])
    }
  })


  const handelSubmit = (e) =>{
      e.preventDefault()
      mutation.mutate({
        conversationId : id,
        desc : e.target[0].value,
      });
      e.target[0].value = ""
  }

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumds">
          <Link to="/messages">Messages {`>`} Chat</Link>
        </span>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "something went wrong"
        ) : (
          <div className="messages">
            {data.map((m) =>(
              <div className={m.userId === currentUser._id ? "item owner" : "item"} key={m._id}>
              <img src="../../../public/img/man.png" className="msgpp" alt="" />
              <p>
                {m.desc}
              </p>
            </div>))}
            
          </div>
        )}

        <form className="write" onSubmit={handelSubmit}>
          <textarea
            name=""
            placeholder="write a message.. "
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button type="sumbit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;

"use client";
import { useEffect, useState } from "react";
import "../css/post.css";
export default function Postnews() {
  const [query, setQuery] = useState("");
  const [showerror, setshowerror] = useState("");
  const [successmessage, setsuccessmessage] = useState("");
  const handleSubmit = async (event) => {
    setshowerror("");
    event.preventDefault();
    if (query == "") {
      setshowerror("Please enter your query.");
    } else {
      try {
        const response = await fetch("api/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });
        setshowerror("");
        if (response.ok) {
          setsuccessmessage("News posted successfully");
        } else {
          setshowerror(
            "Unable to post news due to no data found. Please change the query."
          );
        }
      } catch (error) {
        setshowerror(
          "Unable to post news due to no data found. Please change the query."
        );
      }
    }
  };
  return (
    <div id="subscription_area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="subscribe_now">
              <h4>Post News data to Database</h4>
              <p>Insert Query</p>
              <form className="subscribe_form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Enter your query"
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="submit">
                      Submit
                    </button>
                  </span>
                </div>
              </form>

              {showerror && (
                <p className="text-success p-2 text-center font-weight-bold">
                  {showerror}
                </p>
              )}
              {successmessage && (
                <p className="text-success p-2 text-center font-weight-bold">
                  {successmessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

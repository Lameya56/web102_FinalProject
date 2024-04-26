import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import "./Details.css";
import { Link } from "react-router-dom";

const Details = ({ data }) => {
  const { id } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem(`comments_${id}`) || "[]")
  );

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("FinalProject")
          .select("*")
          .eq("id", id)
          .single(); // Retrieve a single record based on the ID

        if (error) {
          throw error;
        }

        setCardDetails(data);
      } catch (error) {
        console.error("Error fetching card details:", error.message);
      }
    };

    fetchCardDetails();
  }, [id]);

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    try {
      // Add the new comment to the comments array
      const updatedComments = [...comments, comment];
      setComments(updatedComments);

      // Store comments in localStorage with unique key for each post
      localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));

      // Update the comments field in the database
      await supabase
        .from("FinalProject")
        .update({ comments: JSON.stringify(updatedComments) })
        .eq("id", id);

      // Clear the comment input
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error.message);
    }
  };

  return (
    <div className="details">
        <h2 style={{textAlign: "center"}}>Details</h2>
      {cardDetails && (
        <div>
          <h2>{cardDetails.title}</h2>
          <p> {cardDetails.content}</p>
          <p>Created At: {cardDetails.created_at}</p>
          <p>Upvotes: {cardDetails.upvotes}</p>
          
          
        </div>
      )}
      {/* Display Existing Comments */}
      <div className="comments">
        <h3>Comments</h3>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => <p key={index}>{comment}</p>)
        ) : (
          <h2>{"No Comments Yet 😞"}</h2>
        )}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment}>
        <textarea
          rows="4"
          cols="50"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
        ></textarea>
        <br />
        <button type="submit">Submit</button>
        <br></br>
        <br></br>
      </form>
      <Link to="./edit">
        {" "}
        <button className="updateButton">Update</button>{" "}
      </Link>
      <Link to="./delete">
        {" "}
        <button className="deleteButton">Delete</button>
      </Link>
    </div>
  );
};

export default Details;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import "./DeletePost.css";
const DeletePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ id: null, title: "", content: "", secret_key: "" });
    const [enteredSecretKey, setEnteredSecretKey] = useState("");
    const [isSecretKeyValid, setIsSecretKeyValid] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from("FinalProject")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) {
                    throw error;
                }

                setPost(data);
            } catch (error) {
                console.error("Error fetching post:", error.message);
            }
        };

        fetchPost();
    }, [id]);
    
    // Delete post
    const deletePost = async (event) => {
        event.preventDefault();
        if (enteredSecretKey === post.secret_key) {
        await supabase
          .from('FinalProject')
          .delete()
          .eq('id', id); 
      
        window.location = "/" ;
        }else{
            setIsSecretKeyValid(false);
        }

      }
      return (
        <div className="form">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {/* <p>Secret Key: {post.secret_key}</p> */}
            <form>
            <label htmlFor="secret_key" className="text-inputs">
                    Secret Key
                </label>
                <br />
                <input
                    type="text"
                    id="secret_key"
                    name="secret_key"
                    onChange={(e) => setEnteredSecretKey(e.target.value)}
                    value={enteredSecretKey}
                />
                {!isSecretKeyValid && <p className="error-message">Invalid secret key!</p>}
                <br /> <br />
                <input type="submit" value="Delete" onClick={deletePost} />
            </form>
        </div>
      )

    

}
export default DeletePost;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import "./EditPost.css";

const EditPost = () => {
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // UPDATE post
    const updatePost = async (event) => {
        event.preventDefault();
        // Check if the entered secret key matches the post's secret key
        if (enteredSecretKey === post.secret_key) {
            await supabase
                .from("FinalProject")
                .update({ title: post.title, content: post.content, secret_key: post.secret_key })
                .eq("id", id);
            window.location = "/";
        } else {
            setIsSecretKeyValid(false);
        }
    };

    return (
        <div className="form">
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} />
                <br />
                <br />
                <label htmlFor="content" className="text-inputs">
                    Content
                </label>
                <br />
                <textarea
                    type="text"
                    id="content"
                    name="content"
                    onChange={handleChange}
                    value={post.content}
                    rows="4" // Adjust the number of visible rows as needed
                    cols="50" // Adjust the number of visible columns as needed
                />
                <br /> <br />
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
                <input type="submit" value="Update" onClick={updatePost} />
            </form>
        </div>
    );
};

export default EditPost;
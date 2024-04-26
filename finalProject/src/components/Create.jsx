import React from "react";
import {supabase } from "../client";
import {useState} from "react";
import './Create.css';

const Create =()=>{
    const [post, setPost]= useState({title: "", content: "", secret_key:""})

    const handleChange = (event) =>{
        const{name, value}= event.target;
        setPost((prev) => ({
            ...prev,
            [name]:value,
        }));
    };
    // const createPost = async(event) =>{
    //     event.preventDefault();
    //     await supabase
    //     .from("FinalProject")
    //     .insert([post]);
    //     window.location = "/";
    // };
    const createPost = async (event) => {
        event.preventDefault();
        console.log("Creating post:", post); // Check the post data being sent to Supabase
        try {
            const { data, error } = await supabase
                .from("FinalProject")
                .insert([post]);
    
            if (error) {
                throw error;
            }
    
            console.log("Post created successfully:", data); // Check the response from Supabase
            window.location = "/";
        } catch (error) {
            console.error("Error creating post:", error.message);
        }
    };

    return(
        <div className="form">
            <h2 style={{textAlign:"center"}}>Create A Post</h2>
            <form onSubmit={createPost}>
                <label htmlFor="title" className="text-inputs">Title</label><br/>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    value={post.title}
                />
                <br/> <br/>
                <label htmlFor="content" className="text-inputs">Content</label><br />
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
                <label htmlFor="secret_key" className="text-inputs">Secret_key</label><br/>
                <input
                    type="text"
                    id="secret_key"
                    name="secret_key"
                    onChange={handleChange}
                    value={post.secret_key}
                />
                <br/> <br/>            
             <input type="submit" value= "post" />
            </form>
        </div>
    );
};
export default Create;
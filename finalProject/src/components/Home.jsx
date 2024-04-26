import React, { useEffect, useState } from "react";
import Card from "./Card";
import { supabase } from "../client";
import "./Home.css";

const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [activeButton, setActiveButton] = useState('');

    useEffect(() => {
        setPosts(props.data);
        //READ all post from table
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('FinalProject')
                .select();
            //set state of posts
            setPosts(data)
        }
        fetchPosts();
    }, [props]);

    // Function to handle search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter posts based on search query
    let filteredPosts = [];
    if (posts) {
        filteredPosts = posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Function to handle sorting by created time
    const sortByCreatedTime = () => {
        const sortedPosts = [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setPosts(sortedPosts);
        setSortOption("created_time");
        setActiveButton('created_time'); // Set the active button
    };

    // Function to handle sorting by upvotes count
    const sortByUpvotes = () => {
        const sortedPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes);
        setPosts(sortedPosts);
        setSortOption("upvotes");
        setActiveButton('upvotes'); // Set the active button
    };

    return (
        <div className="home">
            {/* Search bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <button>Search</button>
            </div>
            {/* Sort buttons */}
            <div className="sort-buttons">
                <h2>Sort By: </h2>
                <button className={activeButton === 'created_time' ? 'active' : ''} onClick={sortByCreatedTime}>Created Time</button>
                <button className={activeButton === 'upvotes' ? 'active' : ''} onClick={sortByUpvotes}>Upvotes</button>
            </div>

            <div className="ReadPosts">
                {/* Display filtered posts */}
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Card key={post.id} id={post.id} title={post.title} created_at={post.created_at} />
                    ))
                ) : (
                    <h2>No Posts Found 😞</h2>
                )}
            </div>
        </div>
    )
}
export default Home;
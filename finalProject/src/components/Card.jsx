import React, { useEffect } from 'react'
import { useState } from 'react'
import './Card.css'
import {Link} from 'react-router-dom'
import { supabase } from '../client'
import more from '../assets/more.png'

const Card =(props) => {
    const [count, setCount] = useState(0);
        useEffect(() => {
            const storedUpvotes = sessionStorage.getItem(`upvotes_${props.id}`);
            if (storedUpvotes) {
                setCount(parseInt(storedUpvotes, 10));
            }
        }, [props.id]);
    
        const updateCount = async (event) => {
            event.preventDefault();
    
            await supabase
                .from('FinalProject')
                .update({ upvotes: count + 1 })
                .eq('id', props.id);
    
            setCount((prevCount) => {
                const newCount = prevCount + 1;
                sessionStorage.setItem(`upvotes_${props.id}`, newCount);
                return newCount;
            });
        };
    
    return(
        <div className='Card'>
             <Link to={'details/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
             <h2 className="title">{props.title}</h2>  
            <p className="created-at">Created_at: {props.created_at}</p>
            <button className="upvotesButton" onClick={updateCount} >👍 upvotes: {count}</button>
           
        </div>
    );
}
export default Card;

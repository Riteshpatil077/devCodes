'use client';
import { useState } from 'react';
export default function LikeButton( ) { 
    const [likes, setLikes] = useState(0);

    function handleLikes(){
        setLikes(likes + 1);
    }
    return <button onClick={handleLikes}>Like ({likes})</button>
}
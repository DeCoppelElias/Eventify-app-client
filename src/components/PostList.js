import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import PostBox from './PostBox';

export default function PostList({ eventId }) {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let payload = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: {eventId: eventId}
        }

        axios.get('/api/getPosts', payload)
        .then(function (response) {
            setPosts(response.data.posts);
        })
        .catch(function (error) {
            if (error.response) {
              if (error.response.status === 400 || error.response.status === 401){
                navigate('/login');
              }
            }})
    }, [navigate])

    return (
        <div className='h-full w-full pb-20 '>
            {
                posts.map((post, i) => (
                    <PostBox key={i} post={post} />
            ))}
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import PostBox from './PostBox';
import PostCreateBox from './PostCreateBox';

export default function PostList({ eventId }) {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [createPostVisibility, setCreatePostVisibility] = useState(false)

    function HandleCreatePost(postTitle, postText){
        setCreatePostVisibility(false);

        const header = {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }

        let payload = {
            userId: localStorage.getItem('userId'),
            eventId: eventId,
            postTitle: postTitle,
            postText: postText
        }

        axios.post('/api/createPost',payload, header)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
            }
        })

        payload = {
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
    }

    function HandleDeletePost(postId, creatorId){
        const header = {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }

        let payload = {
            userId: localStorage.getItem('userId'),
            eventId: eventId,
            postId: postId,
            creatorId: creatorId
        }

        axios.post('/api/removePost',payload, header)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
            }
        })

        payload = {
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
    }

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
    }, [navigate, eventId])

    function HandleClickCreatePost(){
        setCreatePostVisibility(!createPostVisibility);
        if(!createPostVisibility){
            document.getElementById('postcreatebox').scrollIntoView({ behavior: 'smooth', block: 'start' });    
        }
    }

    return (
        <div className='h-full w-full pb-20 border-t-2 border-gray-500'>
            <div className='w-1/2 text-2xl mt-10 mb-10 ml-auto mr-auto border-2 border-gray-400 bg-gray-700 rounded-b-lg hover:bg-gray-600'>
                <button onClick={HandleClickCreatePost} className='h-full w-full p-3'>Create Post</button>
            </div>
            <div id='postcreatebox' className='m-auto sm:w-6/7 md:w-3/4 lg:w-1/2 xl:w-1/2'>
                {createPostVisibility && (
                    <PostCreateBox HandleCreatePost={HandleCreatePost}/>
                )}
            </div>
            <div className='m-auto sm:w-6/7 md:w-3/4 lg:w-1/2 xl:w-1/2'>
                {
                    posts.map((post, i) => (
                        <PostBox key={i} post={post} HandleDeletePost={HandleDeletePost}/>
                ))}
            </div>
            
        </div>
    )
}
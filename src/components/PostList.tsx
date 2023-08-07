import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import axios from 'axios'
import PostBox from './PostBox';
import PostCreateBox from './PostCreateBox';

interface Props{
    objectId: string,
    type: string
}

export interface CreatePostI{
    createPost(): void;
}

const PostList = forwardRef<CreatePostI, Props>(({ objectId, type }, ref) => {
    const [posts, setPosts] = useState([]);
    const [createPostVisibility, setCreatePostVisibility] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            createPost(){
                setCreatePostVisibility(true);
                setTimeout(() => {
                    document.getElementById('postcreatebox')?.scrollIntoView({ behavior: 'smooth', block: 'start' });   
                }, 100); 
            }
          };
        });

    function HandleCreatePost(postTitle: string, postText: string){
        setCreatePostVisibility(false);
        let payload = {
            id: objectId,
            type: type,
            postTitle: postTitle,
            postText: postText
        }

        axios.post('/api/createPost',payload)

        let getPostPayload = {
            params: {
                id: objectId,
                type: type
            }
        }

        axios.get('/api/getPosts', getPostPayload)
        .then(function (response) {
            setPosts(response?.data.posts);
        })
    }

    function HandleDeletePost(postId: string, creatorId: string){
        let payload = {
            id: objectId,
            type: type,
            postId: postId,
            creatorId: creatorId
        }

        axios.post('/api/removePost',payload)

        let getPostsPayload = {
            params: {
                id: objectId,
                type: type
            }
        }

        axios.get('/api/getPosts', getPostsPayload)
        .then(function (response) {
            setPosts(response?.data.posts);
        })
    }

    useEffect(() => {
        let payload = {
            params: {
                id: objectId,
                type: type
            }
        }

        axios.get('/api/getPosts', payload)
        .then(function (response) {
            if(response?.data?.posts !== undefined){
                setPosts(response?.data.posts);
            }
        })
    }, [objectId, type])

    function HandleClickCreatePost(){
        setCreatePostVisibility(!createPostVisibility);
        if(!createPostVisibility){
            setTimeout(() => {
                document.getElementById('postcreatebox')?.scrollIntoView({ behavior: 'smooth', block: 'start' });   
            }, 100); 
        }
    }

    return (
        <div className='h-full w-full pb-20'>
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
})

export default PostList;
import React, { useEffect, useState} from 'react'
import axios from 'axios'
import {getUserId} from "../config/firebase"

export default function PostBox({ post, HandleDeletePost }) {
    const [like, setLikeValue] = useState(false);
    const [amountLike, setAmountLike] = useState(post.likes.length);
    const [dislike, setDislikeValue] = useState(false);
    const [amountDislike, setAmountDislike] = useState(post.dislikes.length);
    const [dislikeColor, setDislikeColor] = useState("#ffffff");
    const [likeColor, setLikeColor] = useState("#ffffff");
    const [userId, setUserId] = useState();

    useEffect(() => {
        getUserId()
        .then(function(userId){
            setUserId(userId)
            if (post.likes.includes(userId)){
                setLike(true);
            }
            if (post.dislikes.includes(userId)){
                setDislike(true);
            }
        })
        .catch(function(err){console.log(err)})
    }, [post.likes, post.dislikes]);

    function setLike(bool){
        if (bool){
            setLikeColor("#ff0066");
        }
        else {
            setLikeColor("#ffffff");
        }
        setLikeValue(bool);
    }

    function setDislike(bool){
        if (bool){
            setDislikeColor("#99ccff");
        }
        else{
            setDislikeColor("#ffffff");
        }
        setDislikeValue(bool);
    }

    function HandleLike(){
        const payload = {
            postId: post.id,
            like: !like
        }
        
        axios.post('/api/likeEvent',payload)

        setLike(!like);

        if (!like){
            setAmountLike(amountLike+1);
        }
        else{
            setAmountLike(amountLike-1);
        }
        
        if (dislike){
            setDislike(false);
            setAmountDislike(amountDislike-1);
        }
    }

    function HandleDislike(){
        const payload = {
            postId: post.id,
            dislike: !dislike
        }
        
        axios.post('/api/dislikeEvent',payload)

        setDislike(!dislike);

        if (!dislike){
            setAmountDislike(amountDislike+1);
        }
        else{
            setAmountDislike(amountDislike-1);
        }
        
        if (like){
            setLike(false);
            setAmountLike(amountLike-1);
        }
    }

    return (
        <div className='relative h-full w-full bg-gray-700 mb-10 rounded-lg ml-auto mr-auto'>
            <div className='absolute -top-3 -left-4 pl-2 pr-2 bg-gray-700 rounded-lg'>
                <p>{post.creator}</p>
            </div>
            {post.creator === userId && (
                <button onClick={()=>HandleDeletePost(post.id, post.creator)} className='absolute -top-4 -right-4 p-2 bg-gray-700 rounded-full'>
                    <svg className='w-7 hover:stroke-white stroke-gray-300' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="" d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            )}
            <div className='bg-gray-800 border-2 border-gray-700 p-4'>
                <p className='text-3xl'>{post.title}</p>
            </div>
            <div className={!like && !dislike ? ('border-2 border-gray-500 border-t-0 rounded-lg rounded-t-none') : (like ? ("border-2 border-red-500 border-t-0 rounded-lg rounded-t-none") : ("border-2 border-blue-500 border-t-0 rounded-lg rounded-t-none"))}>
                <div className='p-4'>
                    <p>{post.text}</p>
                </div>
                <div className='flex p-2'>
                    <div className='flex mr-3'>
                        <button className='h-full mr-1 items-center' onClick={HandleLike}>
                            <svg className='h-full w-5' viewBox="0 0 24 24" id="Line_Color" data-name="Line Color" xmlns="http://www.w3.org/2000/svg"><path id="primary" d="M12,21c3.9,0,7-2,7-7S14,9,14,3c-3,2-4.37,4.1-5,8A5,5,0,0,1,7,8c-1,1-2,4-2,6C5,17.14,6.28,21,12,21Z" fill="none" stroke={likeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"></path></svg>
                        </button>
                        <p>{amountLike}</p>
                    </div>
                    <div className='flex mr-3'>
                        <button className='h-full mr-1 items-center' onClick={HandleDislike}>
                            <svg className='h-full w-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 17L9 20M12 17L15 20M12 17V12M12 17V21M12 7L9 4M12 7L15 4M12 7V12M12 7V3M12 12L7.66988 9.49995M12 12L16.3301 14.4999M12 12L7.66988 14.4999M12 12L16.3301 9.49995M16.3301 14.4999L17.4282 18.598M16.3301 14.4999L20.4282 13.4019M16.3301 14.4999L19.7942 16.5M7.66988 9.49995L3.57181 10.598M7.66988 9.49995L6.57181 5.40187M7.66988 9.49995L4.20578 7.5M16.3301 9.49995L20.4282 10.598M16.3301 9.49995L17.4282 5.40187M16.3301 9.49995L19.7943 7.5M7.66988 14.4999L6.57181 18.598M7.66988 14.4999L3.57181 13.4019M7.66988 14.4999L4.20584 16.5" stroke={dislikeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <p>{amountDislike}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
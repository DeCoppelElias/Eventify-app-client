import React, { useEffect, useState } from "react";
import { getUserId } from "../config/firebase";

export default function PostCreateBox({HandleCreatePost}){
    const [userId, setUserId] = useState();

    useEffect(() => {
        getUserId()
        .then(function(userId){setUserId(userId)})
    }, [])

    function HandlePost(){
        HandleCreatePost(document.getElementById("post_title").value, document.getElementById("post_text").value);
    }

    return (
        <div className='relative h-full w-full bg-gray-700 mb-10 rounded-lg ml-auto mr-auto'>
            <div className='absolute -top-3 -left-4 pl-2 pr-2 bg-gray-700 rounded-lg'>
                {userId !== undefined && 
                    <p>{userId}</p>
                }
            </div>
            <div className='bg-gray-800 border-2 border-gray-200 p-4'>
                <form className=''>
                    <div className=''>
                        <textarea placeholder="Post Title" type="text" rows={1} maxLength={20} id="post_title" className="text-white border-2 border-gray-700 mt-2 overflow-hidden resize-none text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800" required/>
                    </div>
                </form>
            </div>
            <div className='border-2 border-gray-200 border-t-0 rounded-lg rounded-t-none'>
                <div className='p-4'>
                    <form className=''>
                        <div className=''>
                            <textarea placeholder="Post Text" type="text" rows={5} maxLength={500} id="post_text" className="text-white border-2 border-gray-500 resize-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700" required/>
                        </div>
                    </form>
                </div>
            </div>
            <button onClick={HandlePost} className="pl-4 pr-4 pt-1 pb-1 absolute bottom-3 right-3 bg-gray-800 hover:bg-gray-700 border-2 border-gray-500 rounded-lg">
                Post!
            </button>
        </div>
    )
}
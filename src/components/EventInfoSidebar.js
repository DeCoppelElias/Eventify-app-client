import React from 'react';
import CreatePostButton from './CreatePostButton';
import InvitePeopleButton from './InvitePeopleButton';

export default function EventInfoSidebar({HandleInvitePeople, HandleClickCreatePost, administrator, restricted}){

    return (
        <div className='relative w-full top-14'>
            <div className='absolute flex w-full lg:text-base md:text-xs sm:text-xs text-white'>
                <div className='flex w-full flex-row-reverse'>
                    <CreatePostButton HandleClickCreatePost={HandleClickCreatePost}/>
                    {administrator && 
                        <>{restricted && 
                            <InvitePeopleButton HandleInvitePeople={HandleInvitePeople}/>
                        }</>
                    }
                </div>
            </div>
        </div>
    );
};
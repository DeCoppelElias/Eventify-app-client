import React from 'react';
import CreateEventButton from './CreateEventButton';
import CreatePostButton from './CreatePostButton';
import InvitePeopleButton from './InvitePeopleButton';

export default function GroupInfoSidebar({createEventPopupRef, HandleInvitePeople, HandleClickCreatePost, administrator, restricted}){
    return (
        <div className='relative w-full top-14'>
            <div className='absolute flex w-full lg:text-base md:text-xs sm:text-xs text-white'>
                <div className='flex w-full flex-row-reverse'>
                    {administrator && 
                        <>
                            <CreateEventButton HandleEventCreation={() => createEventPopupRef.current.HandleEventCreation()}/>
                            {restricted && 
                                <InvitePeopleButton HandleInvitePeople={HandleInvitePeople}/>
                            }
                        </>
                    }
                    <CreatePostButton HandleClickCreatePost={HandleClickCreatePost}/>
                </div>
            </div>
        </div>
    );
};
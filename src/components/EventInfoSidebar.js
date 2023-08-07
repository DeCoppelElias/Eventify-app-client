import React from 'react';
import PrettyButton from './PrettyButton';
import PostIcon from '../icons/postIcon.svg';

export default function EventInfoSidebar({HandleInvitePeople, HandleClickCreatePost, administrator, restricted}){
    return (
        <div className='relative w-full top-14'>
            <div className='absolute flex w-full lg:text-base md:text-xs sm:text-xs text-white'>
                <div className='flex w-full flex-row-reverse'>
                    <PrettyButton ButtonClickFunction={HandleClickCreatePost} Icon={PostIcon} Text="Create Post"/>
                    {administrator && 
                        <>{restricted && 
                            <PrettyButton ButtonClickFunction={HandleInvitePeople} Icon={PostIcon} Text="Invite People"/>
                        }</>
                    }
                </div>
            </div>
        </div>
    );
};
import React, { useEffect, useState } from 'react';
import PrettyButton from './PrettyButton';
import PostIcon from '../icons/postIcon.svg';
import PlusIcon from '../icons/plusIcon.svg';
import NoImgIcon from '../icons/noImgIcon.svg';

export default function GroupInfoSidebar({HandleSubscribe, HandleEventCreation, HandleInvitePeople, HandleClickCreatePost, administrator, restricted, subscribed}){
    const [subscribeButtonBorderColor, setSubscribeButtonBorderColor] = useState("gray-500");
    useEffect(() =>{
        if(subscribed){
            setSubscribeButtonBorderColor("red-500");
        }
        else{
            setSubscribeButtonBorderColor("gray-500");
        }
    }, [subscribed])
    const subscribedColor = {
        true: "#ff6666",
        false: "#99ccff",
    }

    function SVG(){
        return (
            <svg className='h-full w-full' fill="#ffffff" viewBox="0 0 24 24" id="date-check" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                    <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z" fill="none" stroke={subscribedColor[subscribed]} strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                    <path id="secondary" d="M16,3V6M8,3V6" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                    <polyline id="secondary-2" data-name="secondary" points="9 15 11 17 15 13" fill="none" stroke="#ffffff" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"/>
                </g>
            </svg>
        )
    }
    
    return (
        <div className='relative w-full top-14'>
            <div className='absolute flex w-full lg:text-base md:text-xs sm:text-xs text-white'>
                <div className='flex w-full flex-row-reverse'>
                    {administrator && 
                        <>
                            <PrettyButton ButtonClickFunction={HandleEventCreation} Icon={PlusIcon} Text="Create Event"/>
                            {restricted && 
                                <PrettyButton ButtonClickFunction={HandleInvitePeople} Icon={NoImgIcon} Text="Invite People"/>
                            }
                        </>
                    }
                    <PrettyButton ButtonClickFunction={HandleClickCreatePost} Icon={PostIcon} Text="Create Post"/>
                    <PrettyButton 
                        ButtonClickFunction={HandleSubscribe} 
                        Text="Subscribe" 
                        BorderColor={subscribeButtonBorderColor}
                        SVG={SVG}/>
                </div>
            </div>
        </div>
    );
};
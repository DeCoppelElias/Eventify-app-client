import React from 'react';

export default function TagBox(tag, handleDelete){
    return (
        <div className='bg-blue-400 text-white text-center pl-2 pr-2 pt-1 pb-1 rounded-lg flex w-full h-full justify-center items-center'>
            <p className=''>{String(tag)}</p>
            <button className='w-4 h-ful ml-1' onClick={() => handleDelete(tag)}>
                <svg className='w-full hover:stroke-white stroke-gray-500' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="" d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    )
}
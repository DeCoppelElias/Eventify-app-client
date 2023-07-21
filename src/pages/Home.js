import React from 'react';

export default function Home() {

  return (
    <div className='bg-gray-800 h-full'>
        <div className='h-full pt-20 pb-10 overflow-auto'>
            <p className='text h-20 w-60 m-auto font-semibold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500'>Eventify</p>
            <p className='text-white mb-3 text-center text-lg font-normal'>Create Memorable Events with Ease</p>
            <p className='text-white text-lg mt-20 mb-20 ml-36 mr-auto w-1/4 font-thin text-center'>
                Our app allows you to effortlessly create both public and private events, catering to your unique needs. 
                Whether you're organizing a grand celebration or an intimate gathering, we've got you covered.
            </p>
            <p className='text-white text-lg mt-20 mb-20 ml-auto mr-36 w-1/4 font-thin text-center'>
                Build your own public or private groups, bringing people together around shared interests and passions. 
                Collaborate, plan, and connect with like-minded individuals to make your events truly special.
            </p>
            <p className='text-white text-lg mt-20 mb-20 ml-36 mr-auto w-1/4 font-thin text-center'>
                We believe in simplicity and user-friendliness. 
                Our intuitive interface makes event creation a breeze, saving you time and effort. 
                Focus on what matters most - crafting unforgettable experiences for your attendees.
            </p>
            <p className='text-white text-lg mt-20 mb-20 ml-auto mr-36 w-1/4 font-thin text-center'>
                Best of all, our app is free to use. 
                No hidden costs or subscriptions required. 
                Enjoy the freedom to create, share, and engage without breaking the bank.
            </p> 
            <p className='text-white text-lg mt-20 mb-20 ml-36 mr-auto w-1/4 font-thin text-center'>
                Start creating exceptional events and fostering vibrant communities today with Eventify. 
                Let's make your vision a reality!
            </p>
        </div>
    </div>
  );
}
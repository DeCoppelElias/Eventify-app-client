import React from "react";

export default function PrettyButton({ButtonClickFunction, Icon, SVG, Text, BorderColor}){
    return (
        <button className={BorderColor !== undefined ? 
            `ml-5 lg:text-base md:text-xs sm:text-xs text-white h-full p-3 border-b-2 border-${BorderColor} bg-gray-800 hover:bg-gray-700 rounded-md`: 
            `ml-5 lg:text-base md:text-xs sm:text-xs text-white h-full p-3 border-b-2 border-gray-500 bg-gray-800 hover:bg-gray-700 rounded-md`} 
            onClick={() => ButtonClickFunction()}>
            <div className='flex'>
                <div className='lg:w-6 md:w-4 sm:w-4'>
                    {Icon !== undefined && 
                        <img src={Icon} alt=''></img>
                    }
                    {SVG !== undefined && 
                        <SVG></SVG>
                    }
                </div>
                <div className='ml-2'>
                    {Text}
                </div>
            </div>
        </button>
    )
}
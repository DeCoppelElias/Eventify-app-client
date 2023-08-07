import React from "react";

export default function PrettyButton({ButtonClickFunction, Icon, SVG, Text, BorderColor}){
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <button className={classNames(
            BorderColor !== undefined && `border-${BorderColor}`,
            BorderColor === undefined && "border-gray-500",
            "ml-5 lg:text-base md:text-xs sm:text-xs text-white h-full p-3 border-b-2 bg-gray-800 transition duration-150 rounded-md hover:border-red-500"
        )} 
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
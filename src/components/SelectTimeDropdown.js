import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

const SelectTimeDropdown = forwardRef((props, ref) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const innerListRef = useRef(null);
    const innerButtonRef = useRef();
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const hours = Array.from(Array(24).keys());
    const minutes = Array.from(Array(60).keys());

    useImperativeHandle(ref, () => {
        return {
            getHour(){
                return hour;
            },
            getMinute(){
                return minute;
            }
            };
        });

    const handleClickOutside = (event) => {
        if (innerListRef.current && !innerListRef.current.contains(event.target) && innerButtonRef.current && !innerButtonRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    function HandleSetDropdownVisible(){
        setDropdownVisible(true);
    }

    function NumberFormat(number){
        return ('0'+number).slice(-2)
    }
    
    return(
        <div className="relative w-full">
            <button ref={innerButtonRef} onClick={HandleSetDropdownVisible} className="flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600 h-full">
                <p className='my-auto'>
                    {NumberFormat(hour)} : {NumberFormat(minute)}
                </p>
            </button>
            {dropdownVisible && (
                <div ref={innerListRef} className='absolute overflow-auto max-h-[200px] w-48 top-0 right-0 z-10 bg-gray-900 p-2 rounded-md'>
                    <div className='flex h-40'>
                        <div className='pr-5 overflow-auto flex flex-col w-1/2 h-full'>
                            <p>Hours</p>
                            {hours.map((hour, i) => (
                                <button onClick={() => setHour(hour)} key={i} className="bg-gray-800 hover:bg-gray-700 my-1 p-1 text-sm w-10 rounded-md">
                                    <p className='text-center h-fulm w-full'>{hour}</p>
                                </button>
                            ))}
                        </div>
                        <div className='pr-5 overflow-auto flex flex-col w-1/2 h-full'>
                            <p>Minutes</p>
                            {minutes.map((minute, i) => (
                                <button onClick={() => setMinute(minute)} key={i} className="bg-gray-800 hover:bg-gray-700 my-1 p-1 text-sm w-10 rounded-md">
                                    <p className='text-center h-fulm w-full'>{minute}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
});

export default SelectTimeDropdown;
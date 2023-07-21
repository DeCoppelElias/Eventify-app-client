import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

let idNumber = 0;
const SelectGroupList = forwardRef((props, ref) => {
    idNumber++;
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [administratorGroups, setAdministratorGroups] = useState([]);
    const [addButtonVisible, setAddButtonVisible] = useState(true);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchGroups, setSearchGroups] = useState([]);
    const [locked, setLocked] = useState(false);
    const innerListRef = useRef(null);
    const innerButtonRef = useRef(null);
    const id = "selectgrouplist" + String(idNumber);

    function handleDelete(group){
        let newSelectedGroups = [...selectedGroups];
        let index = selectedGroups.indexOf(group);
        if (index > -1) {
            newSelectedGroups.splice(index, 1); 
        }
        setSelectedGroups(newSelectedGroups);

        if(newSelectedGroups.length < 6){
            setAddButtonVisible(true);
        }
    }

    useImperativeHandle(ref, () => {
        return {
            GetGroupsIds(){
                const groupIds = [];
                for (const group of selectedGroups){
                    groupIds.push(group.id);
                }
                return groupIds;
            },
            SetGroup(group){
                setSelectedGroups([group]);
                setAddButtonVisible(false);
                setLocked(true)
            }
            };
        });

    const handleClickOutside = (event) => {
        if (innerListRef.current && !innerListRef.current.contains(event.target) && innerButtonRef.current && !innerButtonRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        axios.get('/api/getAdministratorGroups')
        .then(function (response) {
            setAdministratorGroups(response?.data.groups);
            setSearchGroups(response?.data.groups);
        })
      }, [])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    function HandleSetAvailableGroupsVisible(){
        setDropdownVisible(!dropdownVisible);

        if(!dropdownVisible){
            document.getElementById('subscribedgroupsdropdown').scrollIntoView({ behavior: 'smooth', block: 'center' });    
        }
        const selectedGroupIds = selectedGroups.map((group) => group.id)
        const legalGroups = [...administratorGroups].filter(subscribedGroup => {
            return !selectedGroupIds.includes(subscribedGroup.id)
        })

        setSearchGroups(legalGroups);
    }

    function HandleAddGroup(group){
        let newSelectedGroups = [...selectedGroups];
        newSelectedGroups.push(group);
        setSelectedGroups(newSelectedGroups);

        if (newSelectedGroups.length === 6) {
            setAddButtonVisible(false);
            setDropdownVisible(false);
        }
        
        const newSearchGroups = [...searchGroups];
        const index = newSearchGroups.indexOf(group);
        if (index > -1) {
            newSearchGroups.splice(index,1);
        }
        setSearchGroups(newSearchGroups);
    }

    function HandleSearch(){
        const query = document.getElementById(id).value.split("");

        const legalGroups = JSON.parse(JSON.stringify(administratorGroups));
        for (const selectedGroup of selectedGroups){
            const index = legalGroups.indexOf(selectedGroup);
            if (index > -1) {
                legalGroups.splice(index,1);
            }
        }

        const newSearchGroups = legalGroups.filter(group => {
            let count = 0;
            let title = group.title;
            title.split('').forEach(letter => {
                if(count < query.length && (query[count] === letter || query[count] === letter.toUpperCase() || query[count].toUpperCase() === letter)) { 
                    count++;
                }
            });
            return count === query.length;
        });

        setSearchGroups(newSearchGroups);
    }

    return (
        <div className='text-white w-4/6 items-center'>
            <div className="flex">
                <p className='mb-1'>Create For Groups: </p>
                {addButtonVisible && (
                    <div className='ml-2 w-5'>
                        <button ref={innerButtonRef} className='justify-center items-center w-full h-full' onClick={HandleSetAvailableGroupsVisible}>
                            <svg className='w-full fill-white hover:fill-blue-300' viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="Page-1" strokeWidth="1" className=''>
                                    <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -600.000000)">
                                        <g id="icons" transform="translate(56.000000, 160.000000)">
                                            <path d="M137.7,450 C137.7,450.552 137.2296,451 136.65,451 L134.55,451 L134.55,453 C134.55,453.552 134.0796,454 133.5,454 C132.9204,454 132.45,453.552 132.45,453 L132.45,451 L130.35,451 C129.7704,451 129.3,450.552 129.3,450 C129.3,449.448 129.7704,449 130.35,449 L132.45,449 L132.45,447 C132.45,446.448 132.9204,446 133.5,446 C134.0796,446 134.55,446.448 134.55,447 L134.55,449 L136.65,449 C137.2296,449 137.7,449.448 137.7,450 M133.5,458 C128.86845,458 125.1,454.411 125.1,450 C125.1,445.589 128.86845,442 133.5,442 C138.13155,442 141.9,445.589 141.9,450 C141.9,454.411 138.13155,458 133.5,458 M133.5,440 C127.70085,440 123,444.477 123,450 C123,455.523 127.70085,460 133.5,460 C139.29915,460 144,455.523 144,450 C144,444.477 139.29915,440 133.5,440" id="plus_circle-[#1427]"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            {addButtonVisible && (
                <div className="absolute w-full" id='subscribedgroupsdropdown'>
                    {dropdownVisible && (
                        <div ref={innerListRef} className='absolute overflow-auto max-h-[200px] w-40 -top-10 right-0 bg-gray-900 p-2 rounded-md'>
                            {administratorGroups.length === 0 ? 
                                <p className="text-xs">You can only create events for groups of which you are a administrator. You have no groups of which you are an administrator.</p>
                            : 
                            <div>
                                <div className='pb-2'>
                                    <form>   
                                        <label htmlFor={id} className="mb-2 text-sm font-sm text-gray-900 sr-only dark:text-white">Search</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" className="w-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                            </div>
                                            <input onChange={HandleSearch} type="search" id={id} className="block w-full p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
                                        </div>
                                    </form>
                                </div>
                                {searchGroups.length === 0 ? 
                                    <p className="text-xs">We could not find any more groups.</p>
                                :
                                    <div className='w-full'>
                                        {searchGroups.map((group, i) => (
                                            <button key={i} className='w-full p-1 mb-1 bg-gray-800 hover:bg-gray-700 rounded-md' onClick={() => HandleAddGroup(group)}>
                                                {group.title}
                                            </button>
                                        ))}
                                    </div>
                                }
                            </div>
                            }
                        </div>
                    )}
                </div>
            )}
            {selectedGroups !== undefined && (
                <div className='flex flex-wrap text-xs'>
                    {selectedGroups.map((group, i) => (
                        <div key={i} className='ml-2 mb-1 flex bg-blue-400 text-white text-center pl-3 pr-3 pt-2 pb-2 rounded-lg h-full'>
                            <p className=''>{group.title}</p>
                            {!locked && 
                                <button className='w-4 h-ful ml-1' onClick={() => handleDelete(group)}>
                                    <svg className='w-full hover:stroke-white stroke-gray-500' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="" d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            }
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
})

export default SelectGroupList;
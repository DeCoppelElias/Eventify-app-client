import React, {useState} from 'react'
import TagListDropdown from './TagListDropdown';

export default function SearchWithTagsBar({RefreshSearch}){
    const [tags, setTags] = useState([]);
    const [query, setQuery] = useState([]);

    function HandleSearch(){
        const newQuery = document.getElementById('your-groups-search').value.split("")
        setQuery(newQuery);
        RefreshSearch(newQuery, tags)
    }

    function HandleTagChange(newTags){
        setTags(newTags);
        RefreshSearch(query, newTags)
    }

    return (
        <div className='flex'>
            <input onChange={HandleSearch} type="search" id='your-groups-search' className="block w-40 h-8 p-1 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
            <div className='ml-5 flex w-full'>
                <p className='text-white m-auto mt-0 p-1'>Filter: </p>
                <div className='ml-2 w-full'>
                    <TagListDropdown HandleTagChange={HandleTagChange}/>
                </div>
            </div>
        </div>
    )
}
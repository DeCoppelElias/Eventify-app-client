import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import TagBox from './TagBox';

let idNumber = 0;

const TagListDropdown = ({HandleTagChange}) => {
    idNumber++;
    const id = "taglistdropdown" + String(idNumber);
    const [tags, SetTags] = useState([]);
    const [availableTags, SetAvailableTags] = useState();
    const [searchTags, SetSearchTags] = useState();
    const [DropdownVisible, SetDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        HandleTagChange(tags);
    }, [tags, HandleTagChange]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                SetDropdownVisible(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        let payload = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }

        axios.get('/api/getTags', payload)
        .then(function (response) {
            SetAvailableTags(response.data.tags);
            SetSearchTags(response.data.tags);
        })
        .catch(function (error) {
            if (error.response) {
              if (error.response.status === 400 || error.response.status === 401){
                navigate('/login');
              }
            }})
    }, [navigate])

    function HandleDelete(tag){
        let index = tags.indexOf(tag);
        let newTags = JSON.parse(JSON.stringify(tags));
        if (index > -1) {
            newTags.splice(index, 1); 
        }
        SetTags(newTags);
    }

    function HandleAddTag(tag){
        let newTags = JSON.parse(JSON.stringify(tags));
        newTags.push(tag);
        SetTags(newTags);
        
        const newSearchTags = JSON.parse(JSON.stringify(searchTags));
        const index = searchTags.indexOf(tag);
        if (index > -1) {
            newSearchTags.splice(index,1);
        }
        SetSearchTags(newSearchTags);
    }

    function HandleDropdown(){
        const legalTags = JSON.parse(JSON.stringify(availableTags));
        for (const tag of tags){
            const index = legalTags.indexOf(tag);
            if (index > -1) {
                legalTags.splice(index,1);
            }
        }

        SetSearchTags(JSON.parse(JSON.stringify(legalTags)));

        SetDropdownVisible(!DropdownVisible);
    }

    function HandleSearch(){
        const query = document.getElementById(id).value.split("");

        const legalTags = JSON.parse(JSON.stringify(availableTags));
        for (const tag of tags){
            const index = legalTags.indexOf(tag);
            if (index > -1) {
                legalTags.splice(index,1);
            }
        }

        const newSearchTags = legalTags.filter(el => {
            let count = 0;
            el.split('').forEach(letter => {
            if(query[count] === letter) { count++; }
            });
            return count === query.length;
        });

        SetSearchTags(newSearchTags);
    }

    return (
        <div className='w-full'>
            {tags !== undefined && (
                <div className='w-full relative flex'>
                    <div className='w-full'>
                        <button ref={buttonRef} onClick={HandleDropdown} className='pl-2 pr-2 flex h-8 bg-gray-700 text-white text-center items-center rounded-lg'>
                            <p className=''>Tags</p>
                            <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {DropdownVisible && (
                            <div ref={dropdownRef} className='absolute z-10 h-52 w-40 overflow-auto bg-gray-900 p-2 rounded-md'>
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
                                <div className='w-full'>
                                    {searchTags.map((tag, i) => (
                                        <button key={i} className='text-white w-full h-full p-1 mb-1 bg-gray-800 hover:bg-gray-700 rounded-md' onClick={() => HandleAddTag(tag)}>
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                     <div className='absolute sm:w-[100px] md:w-[200px] lg:w-[400px] xl:w-[500px] top-0 left-20 flex flex-wrap'>
                        {tags.map((tag, i) => (
                            <div key={i} className='pl-2'>
                                {TagBox(tag,HandleDelete)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TagListDropdown;
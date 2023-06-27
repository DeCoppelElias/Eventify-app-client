import React, { forwardRef, useImperativeHandle, useState, useEffect,useRef } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import TagBox from './TagBox';

let idNumber = 0;

function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const innerListRef = useRef(null);
    const innerButtonRef = useRef(null);

    const handleClickOutside = (event) => {
        if (innerListRef.current && !innerListRef.current.contains(event.target) && innerButtonRef.current && !innerButtonRef.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { innerListRef, innerButtonRef, isComponentVisible, setIsComponentVisible };
}

const TagList = forwardRef((props, ref) => {
    idNumber++;
    const [tags, SetTags] = useState([]);
    const [availableTags, SetAvailableTags] = useState();
    const [searchTags, SetSearchTags] = useState();
    const { innerListRef, innerButtonRef, isComponentVisible , setIsComponentVisible} = useComponentVisible(false);
    const [addButtonVisible, setAddButtonVisible] = useState(true);
    const navigate = useNavigate();
    const id = "taglist" + String(idNumber)

    useImperativeHandle(ref, () => {
        return {
            GetTags(){
                return JSON.parse(JSON.stringify(tags));
            }
          };
        });

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

        if(newTags.length < 6){
            setAddButtonVisible(true);
        }
    }

    function HandleSetAvailableTagsVisible(){
        setIsComponentVisible(!isComponentVisible);

        if(!isComponentVisible){
            document.getElementById('tagdropdown').scrollIntoView({ behavior: 'smooth', block: 'center' });    
        }

        const legalTags = JSON.parse(JSON.stringify(availableTags));
        for (const tag of tags){
            const index = legalTags.indexOf(tag);
            if (index > -1) {
                legalTags.splice(index,1);
            }
        }

        SetSearchTags(JSON.parse(JSON.stringify(legalTags)));
    }

    function HandleAddTag(tag){
        let newTags = JSON.parse(JSON.stringify(tags));
        newTags.push(tag);
        SetTags(newTags);

        if (newTags.length === 6) {
            setAddButtonVisible(false);
            setIsComponentVisible(false);
        }
        
        const newSearchTags = JSON.parse(JSON.stringify(searchTags));
        const index = searchTags.indexOf(tag);
        if (index > -1) {
            newSearchTags.splice(index,1);
        }
        SetSearchTags(newSearchTags);
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
        <div>
            {tags !== undefined && (
                <div className='flex flex-wrap'>
                    {tags.map((tag, i) => (
                        <div key={i} className='pl-2'>
                            {TagBox(tag,HandleDelete)}
                        </div>
                     ))}
                     {addButtonVisible && (
                        <div className='ml-2 w-5'>
                            <button ref={innerButtonRef} className='justify-center items-center w-full h-full' onClick={HandleSetAvailableTagsVisible}>
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
                            <div id='tagdropdown'>
                                {isComponentVisible && (
                                    <div ref={innerListRef} className='absolute overflow-auto h-52 w-40 top-5 -right-6 bg-gray-900 p-2 rounded-md'>
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
                                                <button key={i} className='w-full p-1 mb-1 bg-gray-800 hover:bg-gray-700 rounded-md' onClick={() => HandleAddTag(tag)}>
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                     )}
                </div>
            )}
        </div>
    )
})

export default TagList;
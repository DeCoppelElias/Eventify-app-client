import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import noImgIcon from '../icons/noImgIcon.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import TagList from './TagList.js'

function useComponentVisible(initialIsVisible, ResetState) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const innerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (innerRef.current && !innerRef.current.contains(event.target)) {
                setIsComponentVisible(false);
                ResetState();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ResetState]);

    return { innerRef, isComponentVisible, setIsComponentVisible };
}


const GroupPopup = forwardRef((props, ref) => {
    const [imageFile, SetImageFile] = useState();
    const [imagePreview, SetImagePreview] = useState();
    const [titleFilled, setTitleFilled] = useState(true);
    const [descriptionFilled, setDescriptionFilled] = useState(true);
    const [imageFilled, setImageFilled] = useState(true);
    const { innerRef, isComponentVisible , setIsComponentVisible} = useComponentVisible(false, ResetState);
    const tagListRef = useRef();
    const navigate = useNavigate();

    function ResetState(){
        setTitleFilled(true);
        setDescriptionFilled(true);
        setImageFilled(true);
    }

    useImperativeHandle(ref, () => {
        return {
            HandleGroupCreation(){
                setIsComponentVisible(true);
            }
          };
        });

    function HandleUploadImage(e){
        if (!e.target.files || e.target.files.length === 0) {
            SetImageFile(undefined)
            return
        }

        SetImageFile(e.target.files[0])
    }

    function HandleCreateGroup(){
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const restricted = !document.getElementById('public_checkbox').value;
        const tags = tagListRef.current.GetTags();

        if (title === ""){
            setTitleFilled(false);
            document.getElementById('title').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if(imageFile === undefined){
            setImageFilled(false);
            document.getElementById('image').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (description === ""){
            setDescriptionFilled(false);
            document.getElementById('description').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setIsComponentVisible(false)

        const imageType = imageFile.type.split("/")[1];
        const header = {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }

        const payload = {
            userId: localStorage.getItem('userId'),
            title: title,
            description: description,
            restricted: restricted,
            tags: tags,
            imageType: imageType
        }
        
        axios.post('/api/createGroup',payload, header)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 401){
                    navigate('/login');
                }
        }})
        .then(res => {
            const imagePayload = new FormData()
            imagePayload.append('file', imageFile);
            imagePayload.append('groupId', res.data.groupId);
            const imageHeader = {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data"
                },
            }

            axios.post('/api/uploadGroupImage',imagePayload, imageHeader)
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 400 || error.response.status === 401){
                        navigate('/login');
                    }
            }})
        })
    }

    useEffect(() => {
        if (!imageFile) {
            SetImagePreview(undefined)
            return
        }

        // create the preview
        const objectUrl = URL.createObjectURL(imageFile)
        SetImagePreview(objectUrl)
     
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
     }, [imageFile]);

    return (
        <div className=''>
            {isComponentVisible && 
                <div className='absolute h-screen w-screen top-0 left-0 z-10'>
                    <div ref={innerRef}>
                        <div className='bg-gray-800 border-2 border-gray-600 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-2/5 h-4/5 rounded-md'>
                            <div className='overflow-auto h-full w-full pb-20'>
                                <div className='w-5/6 m-auto mt-5'>
                                    <form className={titleFilled ? '' : '-m-[2px] animate-jump border-[2px] border-red-500 rounded-lg'}>
                                        <div className=''>
                                            <textarea onClick={() => setTitleFilled(true)} placeholder="Group Title" type="text" rows={1} maxLength={25} id="title" className="overflow-hidden resize-none text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                        </div>
                                    </form>
                                </div>
                                <div id='image' className={imageFilled ? 'relative w-5/6 h-1/2 m-auto mt-6 border-gray-900 border-2 rounded-3xl' : 'relative w-5/6 h-1/2 m-auto mt-6 border-red-500 border-2 rounded-3xl animate-jump'}>
                                    <label onClick={()=>setImageFilled(true)} className='p-2 absolute bottom-3 right-3 bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer rounded-lg border-2 border-gray-500'>
                                        <p>Change Image</p>
                                        <input type='file' accept="image/*" onChange={HandleUploadImage}></input> 
                                    </label>
                                    {imagePreview === undefined ? (
                                        <img className="w-1/4 h-full m-auto" alt="" src={noImgIcon} />
                                    ) : (
                                        <img className="object-fill h-full w-full rounded-3xl" alt="" src={imagePreview} />
                                    )}
                                </div>
                                <div className='relative w-5/6 m-auto'>
                                    <div className='flex text-white w-5/6 items-center pt-5'>
                                        <p>Tags: </p>
                                        <TagList ref={tagListRef}></TagList>
                                    </div>
                                    <form className='pt-5'>
                                        <div className='pb-4'>
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description *</label>
                                            <div className={descriptionFilled ? '' : '-m-[2px] animate-jump border-[2px] border-red-500 rounded-lg'}>
                                                <textarea onClick={()=>setDescriptionFilled(true)} id="description" maxLength={1000} rows={7} className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                            </div>
                                        </div>
                                        <div className="pb-4">
                                            <input id="public_checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="public_checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Public Group</label>
                                        </div>
                                    </form>
                                </div>
                                <button className='absolute mr-4 mb-4 right-0 bottom-0 p-2 bg-gray-700 text-white hover:bg-gray-600 rounded-md border-gray-500 border-2' onClick={HandleCreateGroup}>
                                    Create Group
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
});

export default GroupPopup;
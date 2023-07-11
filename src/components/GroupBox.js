import React from 'react';
import { useNavigate} from 'react-router-dom';
import noImgIcon from '../icons/noImgIcon.svg';
import tagIcon from '../icons/tagIcon.svg'

export default function GroupBox({ group }) {
    const id = group.id;
    const title = group.title;
    const navigate = useNavigate();

    const HandleEvent = () => {
        navigate('/groups/' + String(id))
    }

    let tags = ""
    if (group.tags.length > 0){
        tags = String(group.tags[0]);
    }
    for (let i=1;i<group.tags.length;i++){
        tags += " " + String(group.tags[i]);
    }

    const imageType = group.imageType;
    const imgPath = `http://localhost:5000/Images/groups/image-${String(id)}.${String(imageType)}`;
    function addDefaultSrc(ev){
        ev.target.src = noImgIcon;
    };

    return (
        <div className='bg-gray-800 hover:bg-gray-700 w-60 h-60 rounded-3xl border-1 border-gray-500 mr-auto ml-auto cursor-pointer mb-6' onClick={HandleEvent}>
            <div className='h-1/2 w-full'>
                <img className=" object-fill w-full h-full rounded-3xl" alt="" src={imgPath} onError={addDefaultSrc}/>
            </div>
            <div className='ml-3 mr-3 truncate'>
                <p className='text-center text-2xl text-white'>{title}</p>
                <div className='flex w-4'>
                    <img alt="" src={tagIcon} className='mr-1'></img>
                    <p className=' text-sm text-gray-400'>{tags}</p>
                </div>
            </div>
        </div>
    );
}
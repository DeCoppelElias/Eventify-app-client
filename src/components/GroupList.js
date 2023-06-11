import React from 'react';
import { useNavigate} from 'react-router-dom';

function GroupBox({ group }) {
    const id = group.id;
    const title = group.title;
    const description = group.description;
    const tags = group.tags;
    const navigate = useNavigate();

    const HandleEvent = () => {
        navigate('/groups/' + String(id))
    }

    return (
        <div className=' bg-gray-700 w-64 h-48 rounded-3xl m-3 shadow-lg shadow-black'>
            <div className='m-3'>
                <div className='text-center text-xl text-white mb-5'>
                    <button onClick={HandleEvent}>
                        {title}
                    </button>
                </div>
                <p className='text-white'>{description}</p>
                <p className='text-white'>{tags} </p>
            </div>
        </div>
    );
}

export default function GroupList({ groups }) {
    const amountOfGroups = 10

    let displayGroups = []
    if (typeof groups !== 'undefined'){
        displayGroups = groups.slice(0,amountOfGroups);
    }

    return (
        <div className='overflow-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8 pb-8'>
            {typeof groups === 'undefined' ? (
                <p>Loading...</p>
            ) : (
                displayGroups.map((group, i) => (
                <GroupBox key={i} group={group} />
                ))
            )}
        </div>
    );
}
import React from 'react';
import GroupBox from './GroupBox';

export default function GroupList({ groups }) {
    const amountOfGroups = 10

    let displayGroups = []
    if (typeof groups !== 'undefined'){
        displayGroups = groups.slice(0,amountOfGroups);
    }

    return (
        <div className='flex flex-wrap pt-2 pb-4'>
            {typeof groups === 'undefined' ? (
                <p>Loading...</p>
            ) : (
                displayGroups.map((group, i) => (
                    <div key={i} className='p-2'>
                        <GroupBox group={group} />
                    </div>
                ))
            )}
        </div>
    );
}
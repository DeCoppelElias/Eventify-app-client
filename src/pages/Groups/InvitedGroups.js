import React, { useEffect, useState, useRef} from 'react'
import GroupList from '../../components/GroupList'
import axios from 'axios'
import GroupsSidebar from '../../components/GroupsSidebar'
import SearchWithTagsBar from '../../components/SearchWithTagsBar';
import CreateGroupPopup from '../../components/CreateGroupPopup';

export default function InvitedGroups() {
    const [groups, SetGroups] = useState([]);
    const [searchGroups, SetSearchGroups] = useState([]);

    const createGroupPopupRef = useRef();

    useEffect(() => {
        axios.get('/api/getNotRepliedInvitedGroups')
        .then(function (response) {
            SetGroups(response?.data.groups);
            SetSearchGroups(response?.data.groups);
        })
    }, [])

    function RefreshSearchGroups(query, tags){
        if (query.length === 0 && tags.length === 0){
            SetSearchGroups(groups);
            return;
        }

        const newSearchGroups = groups.filter(group => {
            const title = group.title;
            let count = 0;
            title.split('').forEach(letter => {
                if(count < query.length && (query[count] === letter || query[count] === letter.toUpperCase() || query[count].toUpperCase() === letter)) { 
                    count++;
                }
            });

            let tagsValid = true;
            for (const tag of tags){
                const index = group.tags.indexOf(tag);
                if (index === -1){
                    tagsValid = false;
                    break;
                }
            }

            return count === query.length && tagsValid;
        });

        SetSearchGroups(newSearchGroups);
    }

    return (
        <div className='flex h-full w-full'>
            <CreateGroupPopup ref={createGroupPopupRef}/>
            <div className='h-full w-full bg-gray-900 pr-20 pl-20'>
                <GroupsSidebar createGroupPopupRef={createGroupPopupRef}/>
                <div className='w-full h-full pt-28'>
                    <div className='overflow-auto h-full'>
                        <div className='bg-gray-800 rounded-md mb-10 w-full'>
                            <div className='pt-3 pl-4 pr-4 w-full'>
                                <div className='flex pb-3'>
                                    <p className='sm:w-1/8 md:w-1/7 lg:w-1/6 xl:w-1/4 text-2xl text-white'>Group Invitations</p>
                                    <SearchWithTagsBar RefreshSearch={RefreshSearchGroups}/>
                                </div>
                                {searchGroups.length !== 0 ? (
                                    <GroupList groups={searchGroups}/>
                                ) : (
                                    <p className='text-white pb-5 pt-5'>We did not find any groups, sorry!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
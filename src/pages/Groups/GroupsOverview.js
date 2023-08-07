import React, { useEffect, useState, useRef} from 'react'
import GroupList from '../../components/GroupList'
import axios from 'axios'
import CreateGroupPopup from '../../components/CreateGroupPopup';
import GroupsSidebar from '../../components/GroupsSidebar';

export default function GroupsOverview() {
    const [publicGroupData, setPublicGroupData] = useState({'groups': undefined});
    const [invitedGroupData, setInvitedGroupData] = useState({'groups': undefined});
    const [yourGroupData, setYourGroupData] = useState({'groups': undefined});

    const createGroupPopupRef = useRef();

    useEffect(() => {
        axios.get('/api/groups/getPublicGroups')
        .then(function (response) {
            if (response?.data.groups.length > 0){
                setPublicGroupData(response?.data);
            }
        })
        
        axios.get('/api/groups/getNotRepliedInvitedGroups')
        .then(function (response) {
            if (response?.data.groups.length > 0){
                setInvitedGroupData(response?.data);
            }
        })
        
        axios.get('/api/groups/getYourGroups')
        .then(function (response) {
            if (response?.data.groups.length > 0){
                setYourGroupData(response?.data);
            }
        })
    }, [])

    return (
        <div className='flex h-full w-full'>
            <CreateGroupPopup ref={createGroupPopupRef}/>
            <div className='h-full w-full bg-gray-900 pr-20 pl-20'>
                <GroupsSidebar state={"GroupsOverview"} createGroupPopupRef={createGroupPopupRef}/>
                <div className='w-full h-full pt-28'>
                    <div className='overflow-auto h-full'>
                        {yourGroupData.groups !== undefined && 
                            <div className='bg-gray-800 rounded-md mb-10 w-full'>
                                <div className='pt-3 pl-4 pr-4 w-full'>
                                    <div className='relative h-full w-full'>
                                        <a href="/groups/yourgroups" className='absolute top-0 right-0 bg-gray-800 hover:bg-gray-700 text-lg text-white text-center rounded-lg pl-2 pr-2 pt-1 pb-1'>More...</a>
                                    </div>
                                    <div className='pb-3'>
                                        <a href="/groups/yourgroups" className='text-2xl text-white'>Your Groups</a>
                                    </div>
                                    <GroupList groups={yourGroupData.groups}/>
                                </div>
                            </div>
                        }
                        {invitedGroupData.groups !== undefined && 
                            <div className='bg-gray-800 rounded-md mb-10 w-full'>
                                <div className='pt-3 pl-4 pr-4 w-full'>
                                    <div className='relative h-full w-full'>
                                        <a href="/groups/invitedgroups" className='absolute top-0 right-0 bg-gray-800 hover:bg-gray-700 text-lg text-white text-center rounded-lg pl-2 pr-2 pt-1 pb-1'>More...</a>
                                    </div>
                                    <div className='pb-3'>
                                        <a href="/groups/invitedgroups" className='text-2xl text-white'>Group Invitations</a>
                                    </div>
                                    <GroupList groups={invitedGroupData.groups}/>
                                </div>
                            </div>
                        }
                        {publicGroupData.groups !== undefined && 
                            <div className='bg-gray-800 rounded-md mb-10 w-full'>
                                <div className='pt-3 pl-4 pr-4 w-full'>
                                    <div className='relative h-full w-full'>
                                        <a href="/groups/publicgroups" className='absolute top-0 right-0 bg-gray-800 hover:bg-gray-700 text-lg text-white text-center rounded-lg pl-2 pr-2 pt-1 pb-1'>More...</a>
                                    </div>
                                    <div className='pb-3'>
                                        <a href="/groups/publicgroups" className='text-2xl text-white'>Public Groups</a>
                                    </div>
                                    <GroupList groups={publicGroupData.groups}/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
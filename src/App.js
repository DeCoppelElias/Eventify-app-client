import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import GroupsOverview from './pages/Groups/GroupsOverview';
import GlobalSidebar from './components/GlobalSidebar';
import Login from './pages/Login';
import User from './pages/User';
import EventsOverview from './pages/Events/EventsOverview';
import Event from './pages/Events/Event';
import PublicEvents from './pages/Events/PublicEvents'
import InvitedEvents from './pages/Events/InvitedEvents'
import YourEvents from './pages/Events/YourEvents'
import GroupsSidebar from './components/GroupsSidebar';
import Group from './pages/Group';
import InvitedGroups from './pages/Groups/InvitedGroups'
import PublicGroups from './pages/Groups/PublicGroups'
import YourGroups from './pages/Groups/YourGroups';

function App() {
    return (
    <div className='h-full w-full'>
        <BrowserRouter>
            <Routes>
                <Route index element={<><GlobalSidebar /><Home /></>} />
                <Route path="/home" element={<><GlobalSidebar /><Home /></>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/user" element={<><GlobalSidebar /><User /></>}/>
                <Route path="/events">
                    <Route index element={<><GlobalSidebar /><EventsOverview/></>} />
                    <Route path=":eventId" element={<><GlobalSidebar /><Event /></>}/>
                    <Route path="overview" element={<><GlobalSidebar /><EventsOverview/></>}/>
                    <Route path="yourevents" element={<><GlobalSidebar /><YourEvents/></>}/>
                    <Route path="invitedevents" element={<><GlobalSidebar /><InvitedEvents/></>}/>
                    <Route path="publicevents" element={<><GlobalSidebar /><PublicEvents/></>}/>
                </Route>
                <Route path="/groups">
                    <Route index element={<><GlobalSidebar /><div className='flex h-full w-full'><GroupsSidebar /><GroupsOverview /></div></>} />
                    <Route path=":groupId" element={<><GlobalSidebar /><Group /></>}/>
                    <Route path="overview" element={<><GlobalSidebar /><div className='flex h-full w-full'><GroupsSidebar /><GroupsOverview /></div></>}/>
                    <Route path="yourgroups" element={<><GlobalSidebar /><div className='flex h-full w-full'><GroupsSidebar /><YourGroups /></div></>}/>
                    <Route path="invitedgroups" element={<><GlobalSidebar /><div className='flex h-full w-full'><GroupsSidebar /><InvitedGroups /></div></>}/>
                    <Route path="publicgroups" element={<><GlobalSidebar /><div className='flex h-full w-full'><GroupsSidebar /><PublicGroups /></div></>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
    );
};

export default App
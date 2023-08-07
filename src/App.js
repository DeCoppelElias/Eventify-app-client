import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import GroupsOverview from './pages/Groups/GroupsOverview';
import GlobalSidebar from './components/GlobalSidebar';
import Login from './pages/Login';
import EventsOverview from './pages/Events/EventsOverview';
import Event from './pages/Events/Event';
import PublicEvents from './pages/Events/PublicEvents'
import InvitedEvents from './pages/Events/InvitedEvents'
import YourEvents from './pages/Events/YourEvents'
import Group from './pages/Groups/Group';
import InvitedGroups from './pages/Groups/InvitedGroups'
import PublicGroups from './pages/Groups/PublicGroups'
import YourGroups from './pages/Groups/YourGroups';
import GoingEvents from './pages/Events/GoingEvents';
import MaybeEvents from './pages/Events/MaybeEvents';
import NotGoingEvents from './pages/Events/NotGoingEvents';
import AnsweredEvents from './pages/Events/AnsweredEvents';
import SubscribedGroups from './pages/Groups/SubscribedGroups';
import EventCalendar from './pages/Calendar/EventCalendar';
import Register from './pages/Register';
import AxiosNavigation from './AxiosNavigation';

function App() {
    return (
    <div className='h-full w-full'>
        <BrowserRouter>
            <AxiosNavigation />
            <Routes>
                <Route index element={<><GlobalSidebar state={"Home"} /><Home /></>} />
                <Route path="/home" element={<><GlobalSidebar state={"Home"} /><Home /></>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/calendar" element={<><GlobalSidebar state={"Calendar"} /><EventCalendar /></>}/>
                <Route path="/events">
                    <Route index element={<><GlobalSidebar state={"Events"} /><EventsOverview/></>} />
                    <Route path=":eventId" element={<><GlobalSidebar state={"Events"} /><Event /></>}/>
                    <Route path="overview" element={<><GlobalSidebar state={"Events"} /><EventsOverview/></>}/>
                    <Route path="yourevents" element={<><GlobalSidebar state={"Events"} /><YourEvents/></>}/>
                    <Route path="invitedevents" element={<><GlobalSidebar state={"Events"} /><InvitedEvents/></>}/>
                    <Route path="publicevents" element={<><GlobalSidebar state={"Events"} /><PublicEvents/></>}/>
                    <Route path="goingevents" element={<><GlobalSidebar state={"Events"} /><GoingEvents/></>}/>
                    <Route path="maybeevents" element={<><GlobalSidebar state={"Events"} /><MaybeEvents/></>}/>
                    <Route path="notgoingevents" element={<><GlobalSidebar state={"Events"} /><NotGoingEvents/></>}/>
                    <Route path="answeredevents" element={<><GlobalSidebar state={"Events"} /><AnsweredEvents/></>}/>
                </Route>
                <Route path="/groups">
                    <Route index element={<><GlobalSidebar state={"Groups"} /><GroupsOverview /></>} />
                    <Route path=":groupId" element={<><GlobalSidebar state={"Groups"} /><Group /></>}/>
                    <Route path="overview" element={<><GlobalSidebar state={"Groups"} /><GroupsOverview /></>}/>
                    <Route path="yourgroups" element={<><GlobalSidebar state={"Groups"} /><YourGroups /></>}/>
                    <Route path="invitedgroups" element={<><GlobalSidebar state={"Groups"} /><InvitedGroups /></>}/>
                    <Route path="publicgroups" element={<><GlobalSidebar state={"Groups"} /><PublicGroups /></>}/>
                    <Route path="subscribedgroups" element={<><GlobalSidebar state={"Groups"} /><SubscribedGroups /></>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
    );
};

export default App
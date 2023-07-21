import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSameDay,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns';
import { auth, getUserId } from "../../config/firebase";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function EventCalendar() {
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    const [calendarGoingEvents, setCalendarGoingEvents] = useState([]);
    const [calendarMaybeEvents, setCalendarMaybeEvents] = useState([]);
    const [calendarYourEvents, setCalendarYourEvents] = useState([]);
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    useState(async () => {
        getUserId()
        .then(function (userId){
            let payload = {
                params: {
                    startDate: firstDayCurrentMonth
                }
            }
    
            axios.get('/api/getCalendarEvents', payload)
            .then(function (response) {
                setCalendarGoingEvents(response?.data.calendarGoingEvents);
                setCalendarMaybeEvents(response?.data.calendarMaybeEvents);
                setCalendarYourEvents(response?.data.calendarYourEvents);
            })
        })
    }, [])

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
        setSelectedDay(undefined)
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
        setSelectedDay(undefined)
    }

    let selectedDayGoingEvents = calendarGoingEvents.filter((event) =>
        isSameDay(parseISO(event.startTime), selectedDay)
    )
    let selectedDayMaybeEvents = calendarMaybeEvents.filter((event) =>
        isSameDay(parseISO(event.startTime), selectedDay)
    )
    let selectedDayYourEvents = calendarYourEvents.filter((event) =>
        isSameDay(parseISO(event.startTime), selectedDay)
    )


    return (
        <div className="flex pt-10 w-full h-full overflow-auto bg-gray-900">
            <div className="w-full h-full mx-auto px-7">
                <div className="w-full h-full">
                    <div className="">
                        <div className='sticky top-0 bg-gray-900 pt-5 pb-2 z-10'>
                            <div className="flex items-center ">
                                <h2 className="flex-auto font-semibold text-white">
                                    {format(firstDayCurrentMonth, 'MMMM yyyy')}
                                </h2>
                                <button
                                    type="button"
                                    onClick={previousMonth}
                                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-white hover:text-gray-300"
                                >
                                    <span className="sr-only">Previous month</span>
                                    <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                                <button
                                    onClick={nextMonth}
                                    type="button"
                                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-white hover:text-gray-300"
                                >
                                    <span className="sr-only">Next month</span>
                                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="grid grid-cols-7 mt-5 text-xs leading-6 text-white text-center">
                                <div>S</div>
                                <div>M</div>
                                <div>T</div>
                                <div>W</div>
                                <div>T</div>
                                <div>F</div>
                                <div>S</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 mt-2 text-sm">
                            {days.map((day, dayIdx) => (
                                <div
                                    key={day.toString()}
                                    className={classNames(
                                        dayIdx === 0 && colStartClasses[getDay(day)],
                                        'py-1.5 pr-1'
                                    )}
                                    >
                                    <div
                                        className={classNames(
                                        isToday(day) && 'border-red-500',
                                        !isToday(day) && !isSameDay(selectedDay, day) && 'border-gray-500',
                                        isSameDay(selectedDay, day) && 'border-green-500',
                                        'border-2 bg-gray-700 text-white hover:bg-gray-600 h-full w-full'
                                        )}
                                    >
                                        <button onClick={() => setSelectedDay(day)} className='relative w-full h-32'>
                                            <time className='absolute top-1s left-1' dateTime={format(day, 'yyyy-MM-dd')}>
                                                {format(day, 'd')}
                                            </time>
                                            <div className={classNames(
                                                !isToday(day) && !isSameDay(selectedDay, day) && 'text-gray-400',
                                                'w-full h-full py-6 px-3 text-left')}>
                                                {calendarGoingEvents.length > 0 && 
                                                    calendarGoingEvents.map((event,i) => {
                                                        if(isSameDay(day, parseISO(event.startTime))){
                                                            return <p key={i} className=''>{event.title}</p>
                                                        }
                                                        return <div key={i}></div>
                                                    })
                                                }
                                                {calendarMaybeEvents.length > 0 && 
                                                    calendarMaybeEvents.map((event,i) => {
                                                        if(isSameDay(day, parseISO(event.startTime))){
                                                            return <p key={i} className=''>{event.title}</p>
                                                        }
                                                        return <div key={i}></div>
                                                    })
                                                }
                                                {calendarYourEvents.length > 0 && 
                                                    calendarYourEvents.map((event,i) => {
                                                        if(isSameDay(day, parseISO(event.startTime))){
                                                            return <p key={i} className=''>{event.title}</p>
                                                        }
                                                        return <div key={i}></div>
                                                    })
                                                }
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {selectedDay !== undefined && 
                        <div className="mt-12 pb-20">
                            <h2 className="font-semibold text-white">
                                Schedule for{' '}
                                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                    {format(selectedDay, 'MMM dd, yyy')}
                                </time>
                            </h2>
                            <div className="mt-4 space-y-1 text-sm leading-6 text-white">
                                {selectedDayGoingEvents.length > 0 && (
                                    selectedDayGoingEvents.map((event,i) => (
                                        <EventBox event={event} source={"Going Events"} key={i} />
                                    ))
                                )}
                                {selectedDayMaybeEvents.length > 0 && (
                                    selectedDayMaybeEvents.map((event,i) => (
                                        <EventBox event={event} source={"Maybe Events"} key={i} />
                                    ))
                                )}
                                {selectedDayYourEvents.length > 0 && (
                                    selectedDayYourEvents.map((event,i) => (
                                        <EventBox event={event} source={"Your Events"} key={i} />
                                    ))
                                )}
                                {selectedDayYourEvents.length === 0 && selectedDayMaybeEvents.length === 0 && selectedDayYourEvents.length === 0 && 
                                    <p>No events for today.</p>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

function EventBox({ event, source }) {
  let startTime = parseISO(event.startTime)
  let endTime = parseISO(event.endTime)

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-700 hover:bg-gray-700">
      {/* <img
        src={meeting.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      /> */}
      <div className="flex-auto">
        <div className='flex'>
            <p className="text-white">{event.title}</p>
            <p className="ml-2 m-auto text-xs text-gray-500">({source})</p>
        </div>
        <p className="mt-0.5">
          <time dateTime={event.startTime}>
            {format(startTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={event.endTime}>
            {format(endTime, 'h:mm a')}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-gray-700 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/home"
                    className={classNames(
                      active && 'bg-gray-600',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/home"
                    className={classNames(
                        active && 'bg-gray-600',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import './index.css'

import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'

export const Scheduler = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda()
    ],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-02-15 20:15',
        end: '2025-02-15 21:15'
      }
    ],
    plugins: [eventsService],
    theme: 'shadcn'
  })

  useEffect(() => {
    eventsService.getAll()
    calendar.setTheme('dark')
  }, [])

  return (
    <div className='flex-1'>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

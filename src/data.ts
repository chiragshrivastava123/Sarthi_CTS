import { BusRoute, Announcement } from "./types";

export const DUMMY_BUSES: BusRoute[] = [
  {
    id: '1',
    busNumber: 'MP07-1234',
    route: 'City Center to ITM Campus',
    shift: 'Morning',
    status: 'On Time',
    stops: [
      { name: 'City Center Mall', time: '08:00 AM' },
      { name: 'Thatipur Circle', time: '08:15 AM' },
      { name: 'University Chaurha', time: '08:30 AM' },
      { name: 'ITM Gate 1', time: '08:45 AM' },
    ]
  },
  {
    id: '2',
    busNumber: 'MP07-5678',
    route: 'Hazira to ITM Turf',
    shift: 'Morning',
    status: 'Delayed',
    stops: [
      { name: 'Hazira Square', time: '07:45 AM' },
      { name: 'Gwalior Fort Gate', time: '08:05 AM' },
      { name: 'Phoolbagh', time: '08:25 AM' },
      { name: 'ITM Turf Campus', time: '09:00 AM' },
    ]
  },
  {
    id: '3',
    busNumber: 'MP07-9012',
    route: 'Morar to ITM Campus',
    shift: 'Afternoon',
    status: 'On Time',
    stops: [
      { name: 'Morar Cantonment', time: '12:30 PM' },
      { name: '7 Number Chauraha', time: '12:45 PM' },
      { name: 'ITM Gate 1', time: '01:30 PM' },
    ]
  },
  {
    id: '4',
    busNumber: 'MP07-3456',
    route: 'ITM Campus to City Center',
    shift: 'Evening',
    status: 'On Time',
    stops: [
      { name: 'ITM Gate 1', time: '04:30 PM' },
      { name: 'University Chaurha', time: '04:45 PM' },
      { name: 'City Center Mall', time: '05:20 PM' },
    ]
  }
];

export const DUMMY_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Urgent: Route Update',
    content: 'Bus #24 (Evening Shift) will depart 15 mins late today due to rain.',
    date: new Date().toISOString().split('T')[0],
    isUrgent: true
  },
  {
    id: '2',
    title: 'New Route Scheduled',
    content: 'A new morning bus route starts from next week originating from Deen Dayal Nagar.',
    date: '2026-05-26',
    isUrgent: false
  }
];

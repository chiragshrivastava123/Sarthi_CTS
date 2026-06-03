export interface BusStop {
  name: string;
  time: string;
}

export interface BusRoute {
  id: string;
  busNumber: string;
  route: string;
  shift: 'Morning' | 'Afternoon' | 'Evening';
  status: 'On Time' | 'Delayed' | 'Cancelled';
  stops: BusStop[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isUrgent: boolean;
}

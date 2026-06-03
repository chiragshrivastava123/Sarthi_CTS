import { useState, useEffect } from 'react';
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { AdminLoginView } from './views/AdminLoginView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { DUMMY_BUSES, DUMMY_ANNOUNCEMENTS } from './data';
import { BusRoute, Announcement } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'admin-login' | 'admin-dashboard'>('landing');
  
  const [buses, setBuses] = useState<BusRoute[]>(() => {
    const saved = localStorage.getItem('buses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DUMMY_BUSES;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('announcements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DUMMY_ANNOUNCEMENTS;
  });

  useEffect(() => {
    localStorage.setItem('buses', JSON.stringify(buses));
  }, [buses]);

  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  if (currentView === 'landing') {
    return <LandingView onLoginClick={() => setCurrentView('admin-login')} />;
  }

  if (currentView === 'admin-login') {
    return (
      <AdminLoginView 
        onAdminLogin={() => setCurrentView('admin-dashboard')} 
        onStudentLogin={() => setCurrentView('dashboard')}
        onBack={() => setCurrentView('landing')} 
      />
    );
  }

  if (currentView === 'admin-dashboard') {
    return <AdminDashboardView onLogout={() => setCurrentView('landing')} onSwitchToUser={() => setCurrentView('dashboard')} buses={buses} setBuses={setBuses} announcements={announcements} setAnnouncements={setAnnouncements} />;
  }

  return <DashboardView onLogout={() => setCurrentView('landing')} buses={buses} announcements={announcements} />;
}

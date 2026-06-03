import { useState } from 'react';
import { Bus, Bell, User, LogOut, Menu, X, ShieldAlert, Edit, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SidebarItem } from '../components/SidebarItem';
import { BusRoute, Announcement } from '../types';

interface AdminDashboardViewProps {
  onLogout: () => void;
  onSwitchToUser: () => void;
  buses: BusRoute[];
  setBuses: React.Dispatch<React.SetStateAction<BusRoute[]>>;
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
}

export function AdminDashboardView({ onLogout, onSwitchToUser, buses, setBuses, announcements, setAnnouncements }: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState('manage-buses');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Announcements State
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  
  // New Bus State
  const [isAddingBus, setIsAddingBus] = useState(false);
  const [newBus, setNewBus] = useState<Partial<BusRoute>>({
    busNumber: '',
    route: '',
    shift: 'Morning',
    status: 'On Time',
    stops: []
  });

  const [newStopName, setNewStopName] = useState('');
  const [newStopTime, setNewStopTime] = useState('');

  const handleAddStop = () => {
    if (newStopName && newStopTime) {
      setNewBus({
        ...newBus,
        stops: [...(newBus.stops || []), { name: newStopName, time: newStopTime }]
      });
      setNewStopName('');
      setNewStopTime('');
    }
  };

  const handleRemoveStop = (index: number) => {
    const stops = [...(newBus.stops || [])];
    stops.splice(index, 1);
    setNewBus({ ...newBus, stops });
  };

  const handleDeleteBus = (id: string) => {
    setBuses(buses.filter(b => b.id !== id));
  };

  const handleAddBus = () => {
    if (newBus.busNumber && newBus.route && newBus.stops && newBus.stops.length > 0) {
      setBuses([{
        id: Math.random().toString(),
        busNumber: newBus.busNumber,
        route: newBus.route,
        shift: newBus.shift as any,
        status: newBus.status as any,
        stops: newBus.stops
      }, ...buses]);
      setIsAddingBus(false);
      setNewBus({ busNumber: '', route: '', shift: 'Morning', status: 'On Time', stops: [] });
    } else {
      alert('Please fill out bus details and add at least one stop.');
    }
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncementTitle && newAnnouncementContent) {
      setAnnouncements([{
        id: Math.random().toString(),
        title: newAnnouncementTitle,
        content: newAnnouncementContent,
        date: new Date().toISOString().split('T')[0],
        isUrgent: true
      }, ...announcements]);
      setNewAnnouncementTitle('');
      setNewAnnouncementContent('');
    }
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Admin Sidebar */}
      <aside 
        className={`w-72 bg-slate-900 text-white flex flex-col z-50 fixed inset-y-0 left-0 md:relative h-full transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
             <div className="bg-amber-500 p-2 rounded-lg">
               <ShieldAlert className="w-5 h-5 text-slate-900" />
             </div>
             <div>
               <h1 className="font-bold text-xl tracking-tight">ADMIN</h1>
               <p className="text-[9px] text-amber-500 uppercase tracking-widest font-medium">SARTHI Control Panel</p>
             </div>
          </div>
          <button 
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <SidebarItem 
            icon={<Bus size={18} />} 
            label="Manage Buses & Shifts" 
            active={activeTab === 'manage-buses'} 
            onClick={() => { setActiveTab('manage-buses'); setSidebarOpen(false); }} 
          />
          <SidebarItem 
            icon={<Bell size={18} />} 
            label="Manage Announcements" 
            active={activeTab === 'manage-announcements'} 
            onClick={() => { setActiveTab('manage-announcements'); setSidebarOpen(false); }} 
          />
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={onSwitchToUser}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-amber-500 hover:text-amber-400 hover:bg-slate-800 transition-colors border border-slate-700 border-dashed"
          >
            <User size={18} />
            <span className="font-semibold text-sm">Preview User View</span>
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 relative z-20 shadow-sm">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
              >
                <Menu size={24} />
              </button>
            )}
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">
              {activeTab === 'manage-buses' ? 'Bus Fleet Management' : 'Announcements Setup'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-tight">Admin System</p>
                <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider flex items-center gap-1 justify-end"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</p>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                <ShieldAlert size={18} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto w-full p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'manage-buses' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Registered Buses & Routes</h3>
                    <p className="text-sm text-slate-500">Add, edit, or remove buses from the system.</p>
                  </div>
                  <button 
                    onClick={() => setIsAddingBus(true)}
                    className="bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <Plus size={18} /> Add New Bus
                  </button>
                </div>
                
                {isAddingBus && (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                    <h4 className="font-bold text-slate-900 mb-4">Add New Bus details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input 
                        type="text" 
                        placeholder="Bus Number (e.g., MP07-XXXX)" 
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={newBus.busNumber}
                        onChange={(e) => setNewBus({...newBus, busNumber: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="Route Description" 
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={newBus.route}
                        onChange={(e) => setNewBus({...newBus, route: e.target.value})}
                      />
                      <select 
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={newBus.shift}
                        onChange={(e) => setNewBus({...newBus, shift: e.target.value as any})}
                      >
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                      <select 
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={newBus.status}
                        onChange={(e) => setNewBus({...newBus, status: e.target.value as any})}
                      >
                        <option value="On Time">On Time</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h5 className="font-bold text-sm text-slate-800 mb-3">Bus Stops</h5>
                      <div className="space-y-2 mb-3">
                        {newBus.stops?.map((stop, i) => (
                          <div key={i} className="flex justify-between items-center bg-white border border-slate-200 p-2 rounded-lg text-sm">
                            <div>
                              <span className="font-bold text-slate-700">{stop.name}</span>
                              <span className="text-slate-500 ml-2 text-xs">{stop.time}</span>
                            </div>
                            <button onClick={() => handleRemoveStop(i)} className="text-red-500 hover:bg-red-50 p-1 rounded"><X size={14}/></button>
                          </div>
                        ))}
                        {(!newBus.stops || newBus.stops.length === 0) && (
                          <p className="text-xs text-slate-500">No stops added yet.</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Stop Name (e.g. Main Gate)" 
                          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                          value={newStopName}
                          onChange={(e) => setNewStopName(e.target.value)}
                        />
                        <input 
                          type="text" 
                          placeholder="Time (08:00 AM)" 
                          className="w-32 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                          value={newStopTime}
                          onChange={(e) => setNewStopTime(e.target.value)}
                        />
                        <button onClick={handleAddStop} className="px-3 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-700">Add</button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                       <button onClick={handleAddBus} className="bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-sm">Save</button>
                       <button onClick={() => setIsAddingBus(false)} className="bg-slate-100 text-slate-600 font-bold px-4 py-2 rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4">Bus No.</th>
                          <th className="px-6 py-4">Route Name</th>
                          <th className="px-6 py-4">Shift</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {buses.map((bus) => (
                          <tr key={bus.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-900">{bus.busNumber}</td>
                            <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate">{bus.route}</td>
                            <td className="px-6 py-4">
                              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${
                                bus.shift === 'Morning' ? 'bg-blue-50 text-blue-600' : bus.shift === 'Afternoon' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                              }`}>{bus.shift}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`text-xs font-bold ${bus.status === 'On Time' ? 'text-green-600' : 'text-orange-600'}`}>• {bus.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16} /></button>
                                <button 
                                  onClick={() => handleDeleteBus(bus.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                ><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'manage-announcements' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-4">Post Global Announcement</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Announcement Title" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-medium" 
                      value={newAnnouncementTitle}
                      onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                    />
                    <textarea 
                      placeholder="Write announcement details..." 
                      rows={3} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={newAnnouncementContent}
                      onChange={(e) => setNewAnnouncementContent(e.target.value)}
                    ></textarea>
                    <button 
                      onClick={handleAddAnnouncement}
                      className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-700 transition-colors shadow-sm"
                    >
                      <Bell size={18} /> Publish Announcement
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-6">Active Announcements</h3>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="border border-slate-100 rounded-xl p-4 flex justify-between items-start hover:shadow-sm transition-shadow">
                        <div>
                          {announcement.isUrgent && (
                            <span className="text-[10px] text-red-600 bg-red-50 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 inline-block">Urgent</span>
                          )}
                          <h4 className="font-bold text-slate-900">{announcement.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{announcement.content}</p>
                          <p className="text-[10px] text-slate-400 mt-2 font-mono">{announcement.date}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    
                    {announcements.length === 0 && (
                      <p className="text-sm text-slate-500 text-center py-4">No active announcements.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { 
  Bus, Search, Bell, MapPin, Clock, LayoutDashboard, Settings,
  LogOut, Menu, X, User, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BusRoute, Announcement } from '../types';
import { SidebarItem } from '../components/SidebarItem';

interface DashboardViewProps {
  onLogout: () => void;
  buses: BusRoute[];
  announcements: Announcement[];
}

export function DashboardView({ onLogout, buses, announcements }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBus, setSelectedBus] = useState<BusRoute | null>(buses[0] || null);
  const [isMobileTrackerView, setIsMobileTrackerView] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAnnouncements, setShowAnnouncements] = useState(true);

  // Update selected bus if buses change
  useEffect(() => {
    if (selectedBus) {
      const updated = buses.find(b => b.id === selectedBus.id);
      if (updated) setSelectedBus(updated);
    } else if (buses.length > 0) {
      setSelectedBus(buses[0]);
    }
  }, [buses]);

  // Close sidebar on mobile when a tab is clicked
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const filteredBuses = buses.filter(bus => 
    bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            {/* Route Explorer */}
            <div className={`lg:col-span-7 space-y-4 h-full ${isMobileTrackerView ? 'hidden lg:block' : 'block'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Bus size={20} className="text-red-600" />
                  Route Explorer
                </h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">{filteredBuses.length} Buses Active</span>
              </div>

              <div className="space-y-3">
                {filteredBuses.map((bus) => (
                  <motion.div
                    key={bus.id}
                    layoutId={bus.id}
                    onClick={() => {
                      setSelectedBus(bus);
                      if (window.innerWidth < 1024) {
                        setIsMobileTrackerView(true);
                      }
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                      selectedBus?.id === bus.id 
                        ? 'bg-white border-red-500 shadow-xl' 
                        : 'bg-white border-transparent hover:border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold bg-slate-100 text-slate-600 text-xs text-center p-1 break-all">
                          {bus.busNumber.includes('-') ? bus.busNumber.split('-')[1] : bus.busNumber}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{bus.busNumber}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{bus.route}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] uppercase font-heavy tracking-wider px-2 py-1 rounded-md ${
                          bus.shift === 'Morning' ? 'bg-blue-50 text-blue-600' : bus.shift === 'Afternoon' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {bus.shift}
                        </span>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            bus.status === 'On Time' ? 'bg-green-500' : 'bg-orange-500'
                          }`}></div>
                          <p className={`text-[10px] font-bold ${
                            bus.status === 'On Time' ? 'text-green-600' : 'text-orange-600'
                          }`}>{bus.status}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stop Tracker */}
            <div className={`lg:col-span-5 h-full ${isMobileTrackerView ? 'block' : 'hidden lg:block'}`}>
              <AnimatePresence mode="wait">
                {selectedBus ? (
                  <motion.div 
                    key={selectedBus.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 sticky top-8"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <button 
                          className="lg:hidden p-1.5 -ml-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition-colors"
                          onClick={() => setIsMobileTrackerView(false)}
                        >
                          <ArrowLeft size={20} />
                        </button>
                        <h3 className="font-bold text-lg">Stop Tracker</h3>
                      </div>
                      <div className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold uppercase">
                        Bus {selectedBus.busNumber.includes('-') ? selectedBus.busNumber.split('-')[1] : selectedBus.busNumber}
                      </div>
                    </div>

                    <div className="space-y-0 relative">
                      {/* Vertical line through dots */}
                      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                      
                      {selectedBus.stops.map((stop, index) => (
                        <div key={index} className="flex gap-4 pb-8 last:pb-0 relative">
                          <div className={`w-6 h-6 rounded-full flex-shrink-0 z-10 flex items-center justify-center border-4 border-white ${
                            index === 0 ? 'bg-red-500' : 'bg-slate-300'
                          }`}>
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex items-center justify-between">
                              <h5 className="text-sm font-bold text-slate-800">{stop.name}</h5>
                              <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                {stop.time}
                              </span>
                            </div>
                            {index === 0 && <p className="text-[10px] text-red-500 font-bold uppercase mt-0.5">Source Stop</p>}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]">
                        <MapPin size={18} />
                        View Full Map
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <Bus size={48} className="mb-2 opacity-20" />
                    <p className="font-medium">Select a bus to track its stops</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      case 'announcements':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">Announcements</h3>
            <div className="grid gap-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className={`flex items-center gap-2 mb-2 ${announcement.isUrgent ? 'text-red-600' : 'text-blue-600'}`}>
                    <Bell size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {announcement.isUrgent ? 'Urgent' : 'Update'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{announcement.title}</h4>
                  <p className="text-sm text-slate-600">{announcement.content}</p>
                  <p className="text-[10px] text-slate-400 mt-4 font-mono">Posted on: {announcement.date}</p>
                </div>
              ))}
              
              {announcements.length === 0 && (
                <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                  <Bell size={32} className="mx-auto mb-3 opacity-20" />
                  <p>No new announcements.</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
      case 'routes':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">All Bus Routes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buses.map((bus) => (
                <div key={bus.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">{bus.busNumber}</span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${
                      bus.shift === 'Morning' ? 'bg-blue-50 text-blue-600' : bus.shift === 'Afternoon' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                    }`}>{bus.shift}</span>
                  </div>
                  <h4 className="font-bold text-lg text-slate-900 mb-2">{bus.route}</h4>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                       <MapPin size={16} className="text-slate-400 mt-0.5" />
                       <div>
                         <p className="text-xs font-bold text-slate-700">Start: {bus.stops[0].name}</p>
                         <p className="text-[10px] text-slate-500">{bus.stops[0].time}</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <MapPin size={16} className="text-red-500 mt-0.5" />
                       <div>
                         <p className="text-xs font-bold text-slate-700">End: {bus.stops[bus.stops.length - 1].name}</p>
                         <p className="text-[10px] text-slate-500">{bus.stops[bus.stops.length - 1].time}</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'schedules':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">Timing & Schedules</h3>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-slate-50 border-b border-slate-200">
                       <th className="p-4 font-bold text-sm text-slate-700">Bus No.</th>
                       <th className="p-4 font-bold text-sm text-slate-700">Route</th>
                       <th className="p-4 font-bold text-sm text-slate-700">Shift</th>
                       <th className="p-4 font-bold text-sm text-slate-700">Start Time</th>
                       <th className="p-4 font-bold text-sm text-slate-700">End Time</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {buses.map((bus) => (
                       <tr key={bus.id} className="hover:bg-slate-50 transition-colors">
                         <td className="p-4 font-bold text-red-600">{bus.busNumber}</td>
                         <td className="p-4 text-sm font-medium text-slate-800">{bus.route}</td>
                         <td className="p-4">
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${
                              bus.shift === 'Morning' ? 'bg-blue-50 text-blue-600' : bus.shift === 'Afternoon' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                            }`}>{bus.shift}</span>
                         </td>
                         <td className="p-4 text-sm text-slate-600">{bus.stops[0].time}</td>
                         <td className="p-4 text-sm text-slate-600">{bus.stops[bus.stops.length - 1].time}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        );
      case 'live':
        return (
          <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-800">Live Map Tracking</h3>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                 <select 
                   className="bg-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm outline-none border-none text-slate-700"
                   value={selectedBus?.id || ''}
                   onChange={(e) => setSelectedBus(buses.find(b => b.id === e.target.value) || null)}
                 >
                   {buses.map(b => <option key={b.id} value={b.id}>{b.busNumber} ({b.route})</option>)}
                 </select>
              </div>
            </div>
            <div className="flex-1 bg-slate-200 rounded-2xl border border-slate-300 relative overflow-hidden min-h-[500px]">
               {/* Mock Map Background */}
               <div className="absolute inset-0 opacity-80 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=ITM+University+Gwalior&zoom=14&size=800x600&maptype=roadmap')] bg-cover bg-center"></div>
               <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
               
               {/* Overlay Map UI */}
               {selectedBus && (
                 <>
                   {/* Stops sidebar over the map */}
                   <div className="absolute top-4 left-4 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-30 flex flex-col max-h-[calc(100%-2rem)]">
                     <div className="p-4 bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
                        <div className="flex justify-between items-center mb-2">
                           <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-[10px] font-bold tracking-wider">{selectedBus.busNumber}</span>
                           <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">{selectedBus.shift}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm leading-tight">{selectedBus.route}</h4>
                     </div>
                     <div className="p-4 overflow-y-auto">
                        <div className="space-y-0 relative pl-2">
                          <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-slate-200"></div>
                          {selectedBus.stops.map((stop, i) => (
                            <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
                              <div className={`w-3 h-3 rounded-full flex-shrink-0 z-10 mt-1 border-2 border-white shadow-sm ${
                                i === 0 ? 'bg-green-500 ring-4 ring-green-50' : 
                                i === selectedBus.stops.length - 1 ? 'bg-red-500 ring-4 ring-red-50' : 'bg-blue-500 ring-4 ring-blue-50'
                              }`}></div>
                              <div>
                                <p className="text-sm font-bold text-slate-800 leading-none mb-1.5">{stop.name}</p>
                                <p className="text-[11px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md inline-block">{stop.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                     </div>
                   </div>

                   {/* Mock Bus location */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                     <div className="w-16 h-16 bg-red-600/20 rounded-full animate-ping absolute"></div>
                     <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl relative z-10 border-2 border-white">
                       <Bus size={18} />
                     </div>
                     <div className="bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold mt-2 z-10 border border-slate-100 whitespace-nowrap">
                       {selectedBus.busNumber} - Moving
                     </div>
                   </div>

                   {/* Mock markers representing stops on map */}
                   {selectedBus.stops.map((stop, i) => {
                     // Using pseudo-random positions based on index for the map view
                     const ptX = 30 + ((i * 17) % 40); 
                     const ptY = 20 + ((i * 23) % 50);
                     return (
                       <div key={i} className="absolute z-10" style={{ left: `${ptX + (i * 10)}%`, top: `${ptY + (i * 5)}%` }}>
                          <div className="relative group cursor-pointer flex flex-col items-center">
                            <div className={`w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center ${i===0?'bg-green-500':i===selectedBus.stops.length-1?'bg-red-500':'bg-blue-500'}`}>
                              <span className="text-[10px] text-white font-bold">{i+1}</span>
                            </div>
                            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-max bg-white/95 backdrop-blur text-slate-800 text-[11px] px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity border border-slate-200 pointer-events-none z-50 text-center">
                              <span className="font-bold text-slate-900 block mb-0.5">{stop.name}</span>
                              <span className="text-red-600 font-bold bg-red-50 px-1 py-0.5 rounded">{stop.time}</span>
                            </div>
                          </div>
                       </div>
                     );
                   })}
                 </>
               )}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl space-y-8">
            <h3 className="text-2xl font-bold text-slate-800">Preferences</h3>
            
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-1">Notifications</h4>
                <p className="text-sm text-slate-500">Manage how you receive alerts and updates.</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Push Notifications</p>
                    <p className="text-xs text-slate-500">Receive alerts for delays and route changes.</p>
                  </div>
                  <div className="w-12 h-6 bg-red-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Email Updates</p>
                    <p className="text-xs text-slate-500">Weekly digest and major announcements.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-1">Default Route</h4>
                <p className="text-sm text-slate-500">Set your usual bus route for quick tracking.</p>
              </div>
              <div className="p-6">
                 <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-red-500">
                   <option>Select a default route...</option>
                   {buses.map(bus => (
                     <option key={bus.id}>{bus.busNumber} - {bus.route}</option>
                   ))}
                 </select>
              </div>
            </div>
            
            <button className="bg-red-50 text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-100 transition-colors text-sm w-full sm:w-auto mt-4">
              Save Preferences
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative">

      {/* Mobile Overlay */}
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

      {/* --- SIDEBAR --- */}
      <aside 
        className={`w-72 bg-slate-900 text-white flex flex-col z-50 fixed inset-y-0 left-0 md:relative h-full transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
             <div className="bg-red-600 p-2 rounded-lg cursor-pointer" onClick={() => handleTabClick('dashboard')}>
               <Bus className="w-5 h-5" />
             </div>
             <div className="cursor-pointer" onClick={() => handleTabClick('dashboard')}>
               <h1 className="font-bold text-xl tracking-tight">SARTHI</h1>
               <p className="text-[9px] text-slate-400 uppercase tracking-widest font-medium">Campus Transit</p>
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
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => handleTabClick('dashboard')} 
          />
          <SidebarItem 
            icon={<Bus size={18} />} 
            label="Bus Routes" 
            active={activeTab === 'routes'} 
            onClick={() => handleTabClick('routes')} 
          />
          <SidebarItem 
            icon={<Clock size={18} />} 
            label="Schedules" 
            active={activeTab === 'schedules'} 
            onClick={() => handleTabClick('schedules')} 
          />
          <SidebarItem 
            icon={<MapPin size={18} />} 
            label="Track Live" 
            active={activeTab === 'live'} 
            onClick={() => handleTabClick('live')} 
          />
          <div className="pt-4 mt-4 border-t border-slate-800">
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Support</p>
            <SidebarItem 
              icon={<Bell size={18} />} 
              label="Announcements" 
              active={activeTab === 'announcements'} 
              onClick={() => handleTabClick('announcements')} 
            />
            <SidebarItem 
              icon={<Settings size={18} />} 
              label="Settings" 
              active={activeTab === 'settings'} 
              onClick={() => handleTabClick('settings')} 
            />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Navbar */}
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
            <h2 className="text-xl font-bold text-slate-800 capitalize hidden sm:block">{activeTab.replace('-', ' ')}</h2>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search buses or routes..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 w-64 text-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setActiveTab('announcements')}
              className={`p-2 rounded-xl relative transition-colors ${activeTab === 'announcements' ? 'bg-red-50 text-red-600' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-3 md:pl-5 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-tight">C. Shrivastava</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Student • CSE</p>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 shadow-sm transform hover:scale-105 transition-transform cursor-pointer">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
            {/* Search Bar for Mobile */}
            <div className="relative md:hidden mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search buses or routes..." 
                className="pl-9 pr-4 py-2.5 bg-white shadow-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 w-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Announcement Bar */}
            <AnimatePresence>
              {showAnnouncements && announcements.length > 0 && announcements[0].isUrgent && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                  className="bg-red-50 border border-red-100 border-l-4 border-l-red-500 p-4 rounded-xl flex items-start sm:items-center gap-3 shadow-sm mb-6"
                >
                  <div className="bg-red-100 p-2 rounded-lg text-red-600 mt-0.5 sm:mt-0 flex-shrink-0">
                    <Bell size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-red-900 text-sm">{announcements[0].title}</h4>
                    <p className="text-xs text-red-700 mt-0.5 pr-2">{announcements[0].content}</p>
                  </div>
                  <button 
                    onClick={() => setShowAnnouncements(false)}
                    className="text-red-400 hover:text-red-600 p-1 bg-white/50 rounded-lg hover:bg-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

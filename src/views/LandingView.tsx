import { useState } from 'react';
import { Bus, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingViewProps {
  onLoginClick: () => void;
}

export function LandingView({ onLoginClick }: LandingViewProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative">
      {/* Navbar */}
      <div className="w-full h-[88px] flex justify-between items-center bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] z-50 fixed top-0 left-0">
        <div className="flex items-center h-full">
          <div 
            className="bg-[#b30000] h-full flex flex-col items-center justify-center px-4 md:px-8 relative"
            style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)', width: '220px' }}
          >
            <img 
              src="/logo.png" 
              alt="ITM University Logo" 
              className="h-full object-contain p-2 w-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="flex flex-col items-center justify-center"><h1 class="text-xl md:text-2xl font-black tracking-widest text-white border-t border-b border-white/40 mb-1">ITM</h1><div class="text-[10px] md:text-xs text-white font-bold tracking-widest">UNIVERSITY</div></div>';
              }}
            />
          </div>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-black">
           <a href="#home" className="text-[#b30000] border-b-2 border-[#b30000] pb-1 cursor-pointer">Home</a>
           <a href="#about" className="hover:text-[#b30000] cursor-pointer transition-colors">About</a>
           <a href="#how-it-works" className="hover:text-[#b30000] cursor-pointer transition-colors">How It Works</a>
           <a href="#help" className="hover:text-[#b30000] cursor-pointer transition-colors">Help</a>
        </div>

        <div className="flex items-center gap-4 md:gap-8 pr-4 md:pr-8">
           <button 
             onClick={onLoginClick}
             className="hidden sm:block text-[#b30000] border border-[#b30000] px-6 py-1.5 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
           >
             Login
           </button>
           <div className="flex items-center gap-2">
             <Bus className="text-[#b30000]" size={32}/> 
             <div className="flex flex-col justify-center">
               <span className="font-bold text-xl md:text-2xl text-slate-800 leading-none">SARTHI</span>
               <span className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wide font-medium mt-0.5">Campus Transit System</span>
             </div>
           </div>
           
           {/* Mobile Menu Toggle */}
           <button 
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
           >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[88px] left-0 w-full bg-white shadow-lg z-40 lg:hidden flex flex-col border-t border-slate-100"
          >
            <div className="flex flex-col p-4 space-y-4 text-base font-medium text-slate-800">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-[#b30000] p-2 bg-red-50 rounded-lg">Home</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer block">About</a>
              <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer block">How It Works</a>
              <a href="#help" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer block">Help</a>
              <hr className="border-slate-100" />
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onLoginClick(); }}
                className="text-[#b30000] border border-[#b30000] w-full py-2.5 rounded-lg text-center font-medium hover:bg-red-50"
              >
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <div id="home" className="flex-1 w-full mt-[88px] relative min-h-[calc(100vh-88px)] flex items-center bg-slate-100">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("src/assets/hero.png"), url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop")',
            backgroundPosition: 'center 40%' 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl w-full mx-auto z-10 px-6 md:px-12 py-12 md:py-20 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Smart Transit for<br/><span className="text-[#b30000]">ITM University.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Track your college bus in real-time. Never miss a ride with live updates, schedules, and instant notifications.
            </p>
            <button 
              onClick={onLoginClick}
              className="bg-[#c20000] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-bold hover:bg-red-800 transition-all flex items-center justify-center gap-3 text-lg md:text-xl focus:ring-4 focus:ring-red-200 shadow-lg shadow-red-900/20 active:scale-95 w-full sm:w-auto"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      
      {/* Live Data / Quick Stats Section */}
      <div id="about" className="py-20 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold not-italic no-underline text-slate-900 mb-6">Seamless Campus Connectivity</h2>
          <p className="text-slate-600 text-lg mb-12 leading-relaxed">
            SARTHI connects every corner of Gwalior to the ITM University campus. With real-time tracking, optimized routes, and dedicated support, your daily commute is smarter and safer.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-[#b30000] mb-3">40+</div>
              <div className="font-bold text-slate-600">Buses Active</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-[#b30000] mb-3">20+</div>
              <div className="font-bold text-slate-600">Operating Hours</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-[#b30000] mb-3">03</div>
              <div className="font-bold text-slate-600">Major Shifts</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How SARTHI Works</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Experience a frictionless commute process designed entirely around the student journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative z-10 text-center">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl">1</div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Login Securely</h3>
               <p className="text-slate-600">Access your personalized dashboard using your official university credentials.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative z-10 text-center">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl">2</div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Find Your Route</h3>
               <p className="text-slate-600">Locate your bus by shift or area, and view exact departure and arrival times.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative z-10 text-center">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl">3</div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Stay Updated</h3>
               <p className="text-slate-600">Get instant announcements regarding delays, route changes, or emergency updates from admins.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div id="help" className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 border-b-4 border-[#b30000] pb-2 inline-block">Need Help?</h2>
           <p className="text-slate-300 text-lg mb-10">Facing issues with the portal or have queries about the bus schedules?</p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-sm w-full mx-auto sm:mx-0">
                <div className="font-bold text-xl mb-2">Transport Office</div>
                <div className="text-slate-400 text-sm">Room 102, Admin Block<br/>ITM University Campus</div>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-sm w-full mx-auto sm:mx-0">
                <div className="font-bold text-xl mb-2">Contact Us</div>
                <div className="text-slate-400 text-sm">transport@itmuniverse.ac.in<br/>+91 98765 43210</div>
              </div>
           </div>
        </div>
      </div>
      
      {/* Simple Footer */}
      <div className="py-6 bg-black text-center text-slate-500 text-sm border-t border-slate-800">
        © {new Date().getFullYear()} ITM University Gwalior. SARTHI Campus Transit System.
      </div>
    </div>
  );
}

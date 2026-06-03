import { useState, type FormEvent } from 'react';
import { Bus, User, Lock, ArrowLeft, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLoginViewProps {
  onAdminLogin: () => void;
  onStudentLogin: () => void;
  onBack: () => void;
}

export function AdminLoginView({ onAdminLogin, onStudentLogin, onBack }: AdminLoginViewProps) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loginMode, setLoginMode] = useState<'student' | 'admin'>('student');

  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (loginMode === 'admin') {
      if (password === 'admin123' || password === 'admin') {
        onAdminLogin();
      } else {
        setError('Invalid admin password. Hint: try "admin123"');
      }
    } else {
      // Student login / signup mock
      if (email && password) {
        if (isSignUp) {
          // Sign Up successful fake logic
          onStudentLogin();
        } else {
          // Student Login successful fake logic
          onStudentLogin();
        }
      } else {
        setError('Please enter your student email and password');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 relative overflow-hidden">
      {/* Navbar */}
      <div className="w-full h-[88px] flex justify-between items-center bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] z-50 fixed top-0 left-0">
        <div className="flex items-center h-full">
          <div 
            className="bg-[#b30000] h-full flex flex-col items-center justify-center px-4 md:px-8 relative cursor-pointer"
            style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)', width: '220px' }}
            onClick={onBack}
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
        <div className="flex items-center gap-2 pr-4 md:pr-8 cursor-pointer" onClick={onBack}>
          <Bus className="text-[#b30000] hidden sm:block" size={32}/> 
          <div className="flex flex-col justify-center">
            <span className="font-bold text-xl md:text-2xl text-slate-800 leading-none">SARTHI</span>
            <span className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wide font-medium mt-0.5">Campus Transit System</span>
          </div>
        </div>
      </div>

      {/* Login Content */}
      <div className="flex-1 flex justify-center items-center relative z-10 px-4 pt-20">
        {/* Subtle background placeholder */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-5 pointer-events-none hidden lg:block"
             style={{ 
               backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop")',
               backgroundPosition: 'center',
               backgroundSize: 'cover'
             }}
        ></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100 relative z-20"
        >
          <button onClick={onBack} className="text-slate-400 hover:text-[#b30000] mb-6 flex items-center gap-2 text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </button>
          
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8 relative">
            <div 
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-300 ${loginMode === 'admin' ? 'translate-x-full' : 'translate-x-0'}`}
            ></div>
            <button 
              className={`flex-1 py-2 text-sm font-bold relative z-10 transition-colors ${loginMode === 'student' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => { setLoginMode('student'); setError(''); }}
            >
              Student
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-bold relative z-10 transition-colors ${loginMode === 'admin' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => { setLoginMode('admin'); setError(''); }}
            >
              Admin
            </button>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${loginMode === 'admin' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
              {loginMode === 'admin' ? <ShieldAlert size={24} /> : <User size={24} />}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                {loginMode === 'admin' ? 'Admin Access' : (isSignUp ? 'Student Sign Up' : 'Student Login')}
              </h2>
              <p className="text-slate-500 text-sm">
                {loginMode === 'admin' ? 'Enter master password' : (isSignUp ? 'Create a new account' : 'Login using college email')}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMode === 'student' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">College Email</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="student@itmuniverse.ac.in" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-100">{error}</p>}

            <button type="submit" className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 ${
              loginMode === 'admin' ? 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20' : 'bg-[#c20000] hover:bg-red-800 shadow-red-900/20'
            }`}>
              {loginMode === 'admin' ? 'Secure Login' : (isSignUp ? 'Sign Up' : 'Login')}
            </button>

            {loginMode === 'student' && (
              <p className="text-center text-sm text-slate-500 mt-4">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <span onClick={() => setIsSignUp(!isSignUp)} className="text-[#b30000] font-bold cursor-pointer hover:underline">
                  {isSignUp ? "Login" : "Sign up"}
                </span>
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}

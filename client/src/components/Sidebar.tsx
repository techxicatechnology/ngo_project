import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Users, 
  HeartHandshake, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useLogin } from '../store/useLogin';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useLogin();

  const menuItems = [
    { 
      icon: <Users size={18} />, 
      label: 'Registration', 
      path: '/registrationPerson' 
    },
    { 
      icon: <HeartHandshake size={18} />, 
      label: 'Donation', 
      path: '/donationPerson' 
    },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0">
      
      {/* Brand Header with Logo and Nepali Name */}
      <div 
        className="p-8 flex flex-col items-center gap-2 cursor-pointer text-center"
        onClick={() => navigate('/')}
      >
        <img 
          src="/Logo.png" // Logo in public folder
          alt="Logo"
          className="w-16 h-16 object-contain"
        />
        <span className="text-lg font-bold text-slate-800">
          युवाशक्ती बहुउद्देशीय
        </span>
        <span className="text-sm text-green-600 font-medium">
          सेवाभावी संस्था
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Management</p>
        
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            <div className="flex items-center gap-3 font-medium text-sm">
              {item.icon}
              {item.label}
            </div>
          </NavLink>
        ))}
      </nav>

      {/* Footer / User Settings */}
      <div className="p-4 mt-auto border-t border-slate-50">
        <button
        onClick={() => {
          logout();
          navigate('/');
        }}
        className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 rounded-xl transition-all text-sm font-medium mt-1">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

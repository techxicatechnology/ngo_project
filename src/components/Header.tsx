import { Menu, X } from 'lucide-react';
import { useState } from 'react';
// @ts-ignore
import logo from '../assets/Logo.png';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isSkimsPage = location.pathname === "/skims";
  const isContactPage = location.pathname === "/contact";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-15 h-15 text-white fill-white" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 font-serif tracking-wide">
              युवाशक्ती बहुउद्देशीय सेवाभावी संस्था
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Home</Link>
            {!isSkimsPage && !isContactPage && (
              <>
                <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">About</a>
                <a href="#our-members" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Our Member</a>
                <a href="#gallery" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Gallery</a>

                <Link to="/skims" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Our skims</Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <Link to='/contact' >Contact</Link>
            </button>

          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-100">
            <Link to="/" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">Home</Link>
            {!isSkimsPage && (
              <>
                <a href="#about" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">About</a>
                <a href="#our-members" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">Our Member</a>
                <a href="#gallery" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">Gallery</a>
                <a href="#causes" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">Our Causes</a>
                <a href="#impact" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">Impact</a>
                <a href="#contact" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">Contact</a>
                <Link to="/skims" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">Our skims</Link>
                <button className="w-full mt-4 px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold">
                  Donate
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
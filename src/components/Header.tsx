import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      setActiveSection(location.state.scrollTo);
    } else if (location.pathname === "/skims") {
      setActiveSection("skims");
    } else if (location.pathname === "/contact") {
      setActiveSection("contact");
    } else {
      setActiveSection(""); // Home or default
    }
  }, [location]);

  const linkClass = (name: string) =>
    `font-medium transition-all duration-300 px-3 py-2 rounded-lg relative group ${
      activeSection === name 
        ? "text-white bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg shadow-emerald-200/50" 
        : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
    }`;

  const mobileLinkClass = (name: string) =>
    `font-medium transition-all duration-300 px-4 py-3 rounded-lg block relative group ${
      activeSection === name 
        ? "text-white bg-gradient-to-r from-emerald-600 to-green-600 shadow-md" 
        : "text-gray-700 hover:text-emerald-700 hover:bg-gray-50"
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-gray-200/60' 
        : 'bg-white/95 backdrop-blur-lg shadow-md'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Left Section - Logo and Organization Name */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 p-1 shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-emerald-200/50">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-full h-full object-contain rounded-lg" 
                />
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl bg-emerald-400/20 blur-sm group-hover:bg-emerald-400/30 transition-all duration-300 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-gray-900 font-serif tracking-tight leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                युवाशक्ती बहुउद्देशीय
              </span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-600 font-serif tracking-wide mt-0.5">
                सेवाभावी संस्था
              </span>
            </div>
          </div>

          {/* Center Section - Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 mx-8">
            <Link 
              to="/" 
              className={linkClass("")} 
              onClick={() => setActiveSection("")}
            >
              <span className="relative z-10">Home</span>
              {activeSection === "" && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg animate-pulse-slow"></div>
              )}
            </Link>
            <a 
              onClick={() => handleScrollTo("about")} 
              className={`cursor-pointer ${linkClass("about")}`}
            >
              <span className="relative z-10">About</span>
              {activeSection === "about" && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg animate-pulse-slow"></div>
              )}
            </a>
            <a 
              onClick={() => handleScrollTo("our-members")} 
              className={`cursor-pointer ${linkClass("our-members")}`}
            >
              <span className="relative z-10">Our Members</span>
              {activeSection === "our-members" && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg animate-pulse-slow"></div>
              )}
            </a>
            <a 
              onClick={() => handleScrollTo("gallery")} 
              className={`cursor-pointer ${linkClass("gallery")}`}
            >
              <span className="relative z-10">Gallery</span>
              {activeSection === "gallery" && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg animate-pulse-slow"></div>
              )}
            </a>
            <Link 
              to="/skims" 
              className={linkClass("skims")}
            >
              <span className="relative z-10">Our SKIMS</span>
              {activeSection === "skims" && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg animate-pulse-slow"></div>
              )}
            </Link>
            <Link 
              to="/certificates" 
              className={linkClass("certificates")}
            >
              <span className="relative z-10">Our Certificates</span>
              {activeSection === "certificates" && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg animate-pulse-slow"></div>
              )}
            </Link>
            <Link 
              to="/contact" 
              className={linkClass("contact")}
            >
              <span className="relative z-10">Contact</span>
              {activeSection === "contact" && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg animate-pulse-slow"></div>
              )}
            </Link>
          </div>

          {/* Right Section - Mobile Menu Button */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2.5 rounded-xl transition-all duration-300 relative group ${
                isMenuOpen 
                  ? 'bg-emerald-100 text-emerald-700 shadow-inner' 
                  : 'hover:bg-gray-100 text-gray-700 hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              {/* Ripple effect */}
              <span className={`absolute inset-0 rounded-xl bg-emerald-200/30 scale-0 group-hover:scale-100 transition-transform duration-300 ${isMenuOpen ? 'scale-100' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200/60 bg-white/98 backdrop-blur-xl shadow-2xl rounded-b-2xl animate-slideDown">
            <Link 
              to="/" 
              className={mobileLinkClass("")} 
              onClick={() => { setActiveSection(""); setIsMenuOpen(false); }}
            >
              <span className="relative z-10">Home</span>
            </Link>
            <a 
              onClick={() => handleScrollTo("about")} 
              className={`cursor-pointer ${mobileLinkClass("about")}`}
            >
              <span className="relative z-10">About</span>
            </a>
            <a 
              onClick={() => handleScrollTo("our-members")} 
              className={`cursor-pointer ${mobileLinkClass("our-members")}`}
            >
              <span className="relative z-10">Our Members</span>
            </a>
            <a 
              onClick={() => handleScrollTo("gallery")} 
              className={`cursor-pointer ${mobileLinkClass("gallery")}`}
            >
              <span className="relative z-10">Gallery</span>
            </a>
            <Link 
              to="/skims" 
              className={mobileLinkClass("skims")} 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">Our SKIMS</span>
            </Link>
            <Link 
              to="/certificates" 
              className={mobileLinkClass("certificates")} 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">Our Certificates</span>
            </Link>
            <Link 
              to="/contact" 
              className={mobileLinkClass("contact")} 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">Contact</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
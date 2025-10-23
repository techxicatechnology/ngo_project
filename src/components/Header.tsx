import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';
import logo1 from '../assets/logo2.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

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
    `font-medium transition-colors ${activeSection === name ? "text-emerald-600 underline" : "text-gray-700 hover:text-emerald-600"}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Section - Logo and Organization Name */}
          <div className="flex items-center space-x-2 flex-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-14 h-14 sm:w-15 sm:h-15 object-contain" />
            </div>
            <span className="text-xl sm:text-xl font-extrabold text-gray-900 font-serif tracking-wide">
              युवाशक्ती बहुउद्देशीय सेवाभावी संस्था
            </span>
          </div>

          {/* Center Section - Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 mx-8">
            <Link to="/" className={linkClass("")} onClick={() => setActiveSection("")}>Home</Link>
            <a onClick={() => handleScrollTo("about")} className={linkClass("about")}>About</a>
            <a onClick={() => handleScrollTo("our-members")} className={linkClass("our-members")}>Our Member</a>
            <a onClick={() => handleScrollTo("gallery")} className={linkClass("gallery")}>Gallery</a>
            <Link to="/skims" className={linkClass("skims")}>Our skims</Link>
            <Link to="/contact" className={linkClass("contact")}>Contact</Link>
          </div>

          {/* Right Section - Collaboration Section */}
          <div className="flex items-center space-x-4">
            {/* Improved Collaboration Section with Link */}
            <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-emerald-50 to-blue-50 px-4 py-2 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-200 hover:from-emerald-100 hover:to-blue-100 cursor-pointer">
              <a
                href="https://www.techxicatechnology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 no-underline"
              >
                <img
                  src={logo1}
                  alt="Techxica Technology"
                  className="w-10 h-10 object-contain rounded-lg border border-gray-200 bg-white p-1 hover:scale-105 transition-transform duration-200"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">In Collaboration with</span>
                  <span className="text-sm font-semibold text-gray-800 whitespace-nowrap hover:text-emerald-700 transition-colors">
                    Techxica Technology
                  </span>
                </div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-100 bg-white shadow-lg rounded-b-lg">
            <Link to="/" className={linkClass("")} onClick={() => { setActiveSection(""); setIsMenuOpen(false); }}>Home</Link>
            <a onClick={() => handleScrollTo("about")} className={linkClass("about")}>About</a>
            <a onClick={() => handleScrollTo("our-members")} className={linkClass("our-members")}>Our Member</a>
            <a onClick={() => handleScrollTo("gallery")} className={linkClass("gallery")}>Gallery</a>
            <Link to="/skims" className={linkClass("skims")} onClick={() => setIsMenuOpen(false)}>Our skims</Link>
            <Link to="/contact" className={linkClass("contact")} onClick={() => setIsMenuOpen(false)}>Contact</Link>

            {/* Mobile Collaboration Section with Link */}
            <div className="pt-4 border-t border-gray-100">
              <a
                href="https://www.techxicatechnology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src={logo1}
                  alt="Techxica Technology"
                  className="w-8 h-8 object-contain rounded border border-gray-200 bg-white p-1"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">In Collaboration with</span>
                  <span className="text-sm font-semibold text-gray-800 hover:text-emerald-700 transition-colors">
                    Techxica Technology
                  </span>
                </div>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
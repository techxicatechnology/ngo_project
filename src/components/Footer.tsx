import logo from '../assets/Logo.png';
import logo1 from '../assets/logo2.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinkClass = "text-gray-400 hover:text-emerald-400 transition-colors duration-300";

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Organization Info with Address */}
          <div className="text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br  rounded-2xl flex items-center justify-center shadow-lg">
                <img src={logo} alt="Logo" className="w-12 h-12 object-contain rounded-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  युवाशक्ती बहुउद्देशीय संस्था
                </h3>
                <p className="text-emerald-400 text-sm mt-1">Since 2024</p>
              </div>
            </div>
            
            {/* Address Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  Krishna Plaza, Railway Station Road,<br />
                  Tq. Dist - Jalna, Maharashtra 431501
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm">+91 90497 19826</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm">contact@yuvashakti.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-6 text-white border-b border-emerald-500/30 pb-2 inline-block">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/" className={`${footerLinkClass} text-center md:text-left py-2 px-3 rounded-lg hover:bg-gray-800/50 transition-all`}>
                Home
              </Link>
              <a onClick={() => handleScrollTo("about")} className={`${footerLinkClass} cursor-pointer text-center md:text-left py-2 px-3 rounded-lg hover:bg-gray-800/50 transition-all`}>
                About
              </a>
              <a onClick={() => handleScrollTo("gallery")} className={`${footerLinkClass} cursor-pointer text-center md:text-left py-2 px-3 rounded-lg hover:bg-gray-800/50 transition-all`}>
                 Gallery
              </a>
              <Link to="/contact" className={`${footerLinkClass} text-center md:text-left py-2 px-3 rounded-lg hover:bg-gray-800/50 transition-all`}>
                 Contact
              </Link>
              <a onClick={() => handleScrollTo("our-members")} className={`${footerLinkClass} cursor-pointer text-center md:text-left py-2 px-3 rounded-lg hover:bg-gray-800/50 transition-all`}>
                 Members
              </a>
              <Link to="/skims" className={`${footerLinkClass} text-center md:text-left py-2 px-3 rounded-lg hover:bg-gray-800/50 transition-all`}>
                 Skims
              </Link>
            </div>
          </div>

          {/* Collaboration */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-6 text-white border-b border-emerald-500/30 pb-2 inline-block">
              Partnership
            </h4>
            <a
              href="https://www.techxicatechnology.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center md:items-start space-y-4 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <img 
                    src={logo1} 
                    alt="Techxica Technology" 
                    className="relative w-14 h-14 object-contain rounded-xl border-2 border-gray-600 bg-white p-1.5 transform group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium text-gray-400 block">In Collaboration with</span>
                  <span className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Techxica Technology
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
                Digital Innovation Partner
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Yuvashakti Bahuuddeshiya Sevabhavi Sanstha. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors hover:underline">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors hover:underline">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors hover:underline">Cookie Policy</a>
          </div>
        </div>

        {/* Registration Info */}
        <div className="text-center mt-6 pt-4 border-t border-gray-800">
          <p className="text-gray-500 text-xs">
            Reg. No: F-0012906 | Nonprofit Organization | Jalna, Maharashtra
          </p>
        </div>
      </div>
    </footer>
  );
}
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold">HopeGlobal</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
              Empowering communities worldwide through sustainable development, education,
              and healthcare initiatives since 2010.
            </p>
            <div className="text-sm text-gray-500">
              Tax ID: 12-3456789 | 501(c)(3) Nonprofit Organization
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#causes" className="text-gray-400 hover:text-emerald-400 transition-colors">Our Causes</a></li>
              <li><a href="#impact" className="text-gray-400 hover:text-emerald-400 transition-colors">Impact</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Volunteer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Donate</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Partner With Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 HopeGlobal. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

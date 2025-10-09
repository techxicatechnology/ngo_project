import { Target, Users, Globe, Award } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower underserved communities through sustainable development, education, and healthcare initiatives that create lasting positive change.'
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We work directly with local communities, ensuring our programs are culturally sensitive and meet their specific needs.'
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Operating in 35 countries across 4 continents, we bring hope and opportunity to those who need it most.'
  },
  {
    icon: Award,
    title: 'Transparency',
    description: 'We maintain the highest standards of accountability, ensuring every donation directly supports our programs.'
  }
];

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Team working together"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-xl shadow-xl max-w-xs">
              <div className="text-4xl font-bold text-emerald-600 mb-2">15+ Years</div>
              <div className="text-gray-600">Creating meaningful change worldwide</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
              About Us
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Building a Better Tomorrow, Together
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2010, HopeGlobal has been at the forefront of humanitarian work,
              providing critical support to communities facing poverty, lack of education,
              and limited healthcare access.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Through partnerships with local organizations and dedicated volunteers, we've
              successfully implemented sustainable programs that have transformed the lives
              of over 50,000 individuals and continue to grow our impact every day.
            </p>
            <button className="mt-4 px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              Read Our Story
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { GraduationCap, Heart, Droplets, Sprout } from 'lucide-react';

const causes = [
  {
    icon: GraduationCap,
    title: 'Education for All',
    description: 'Providing quality education and learning resources to underprivileged children in remote areas.',
    raised: 45000,
    goal: 60000,
    image: 'https://images.pexels.com/photos/8500403/pexels-photo-8500403.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Heart,
    title: 'Healthcare Access',
    description: 'Delivering essential medical care and health services to communities in need.',
    raised: 32000,
    goal: 50000,
    image: 'https://images.pexels.com/photos/6303761/pexels-photo-6303761.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Droplets,
    title: 'Clean Water Initiative',
    description: 'Building wells and water systems to provide safe drinking water to rural villages.',
    raised: 28000,
    goal: 40000,
    image: 'https://images.pexels.com/photos/6646914/pexels-photo-6646914.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-teal-500 to-emerald-500'
  },
  {
    icon: Sprout,
    title: 'Sustainable Farming',
    description: 'Training farmers in sustainable practices to ensure food security and economic growth.',
    raised: 18000,
    goal: 35000,
    image: 'https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-green-500 to-lime-500'
  }
];

export function Causes() {
  return (
    <section id="causes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Causes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Support the initiatives that matter most to you and help us create lasting change
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {causes.map((cause, index) => {
            const percentage = (cause.raised / cause.goal) * 100;
            const Icon = cause.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${cause.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{cause.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{cause.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-gray-900">
                        ${cause.raised.toLocaleString()} raised
                      </span>
                      <span className="text-gray-600">
                        ${cause.goal.toLocaleString()} goal
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${cause.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Support This Cause
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { TrendingUp, Users, Heart, BookOpen } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: '50,000+',
    label: 'Lives Impacted',
    description: 'People directly benefited from our programs'
  },
  {
    icon: BookOpen,
    number: '15,000+',
    label: 'Children Educated',
    description: 'Students enrolled in our education programs'
  },
  {
    icon: Heart,
    number: '25,000+',
    label: 'Medical Treatments',
    description: 'Healthcare services provided annually'
  },
  {
    icon: TrendingUp,
    number: '120+',
    label: 'Active Projects',
    description: 'Ongoing initiatives across the globe'
  }
];

const testimonials = [
  {
    quote: "HopeGlobal changed my life. Thanks to their education program, I became the first in my family to attend university. Now I'm giving back to my community.",
    author: "Maria Santos",
    role: "Scholarship Recipient, Philippines",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    quote: "The clean water well built in our village has transformed everything. Children are healthier, and families don't have to walk hours for water anymore.",
    author: "Kwame Osei",
    role: "Village Leader, Ghana",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    quote: "As a volunteer, I've witnessed firsthand the incredible impact of HopeGlobal's work. Every project is thoughtfully executed with the community's needs in mind.",
    author: "Sarah Johnson",
    role: "Volunteer Coordinator, USA",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export function Impact() {
  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Impact</h2>
          <p className="text-xl text-emerald-50 max-w-2xl mx-auto">
            Real numbers, real people, real change happening every single day
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                <div className="text-emerald-50 text-sm">{stat.description}</div>
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12">Stories of Change</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

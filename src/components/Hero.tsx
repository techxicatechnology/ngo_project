import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
              <span className="text-emerald-600 font-medium text-sm">Making a difference since 2010</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Empowering Communities
              <span className="block text-emerald-600 mt-2">Building Futures</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Join us in creating lasting change through education, healthcare, and sustainable development programs that transform lives across the globe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:bg-emerald-700 transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center">
                Donate Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Lives Impacted</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">120+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">35</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Community volunteers helping children"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
              <p className="text-white text-lg font-medium">Together we build stronger communities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

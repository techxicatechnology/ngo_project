import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import vkImage from "../assets/vk.png";
import ngo1 from "../assets/ngo1.png";
import ngo2 from "../assets/ngo2.png";

const handleDonateClick = () => {
  window.open("https://forms.gle/1WhmyerVnKq5NEFt9", "_blank");
};

const carouselImages = [
  vkImage,
  ngo1,
  ngo2,
  "https://images.pexels.com/photos/6646987/pexels-photo-6646987.jpeg?auto=compress&cs=tinysrgb&w=1200"
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-16">
      <section className="relative h-screen w-full overflow-hidden" id="home">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`समाजसेवा ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
              {/* Enhanced gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20"></div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text Content - Smaller text sizes */}
              <div className="space-y-6 text-white lg:ml-8">
                {/* Badge */}
                <div className="inline-flex items-center px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg border border-white/10">
                  <span className="text-white font-semibold text-xs tracking-wide">
                    २०२४ पासून बदल घडवित आहोत
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                    समाज
                    <span className="block text-emerald-300 mt-2">सशक्तीकरण</span>
                  </h1>
                  <div className="w-16 h-1 bg-emerald-400 rounded-full"></div>
                  <p className="text-emerald-100 text-base sm:text-lg font-medium tracking-wide">
                    भविष्य घडवतो आपल्या हातून
                  </p>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-white/95 leading-relaxed max-w-xl font-light tracking-wide">
                  शिक्षण, आरोग्य आणि शाश्वत विकास कार्यक्रमांद्वारे
                  <span className="block mt-2">जीवन बदलण्यासाठी आमच्यात सामील व्हा.</span>
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-3">
                  <button
                    onClick={handleDonateClick}
                    className="group px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center border border-emerald-400/30"
                  >
                    <span className="tracking-wide text-sm">देणगी द्या</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-3 bg-white/15 backdrop-blur-md text-white rounded-xl font-semibold shadow-lg hover:bg-white/25 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20">
                    <span className="tracking-wide text-sm">स्वयंसेवक बना</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

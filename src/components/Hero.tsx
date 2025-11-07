import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import vkImage from "../assets/vk.webp";
import ngo1 from "../assets/ngo1.webp";
import ngo2 from "../assets/ngo2.webp";

const handleDonateClick = () => {
  window.open("https://forms.gle/1WhmyerVnKq5NEFt9", "_blank");
};

const handleVolunteerClick = () => {
  window.open("https://forms.gle/9DZMNxdV6udUZXme7", "_blank");
}

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
                loading="eager"
              />
              {/* Enhanced gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20 
                            md:bg-gradient-to-r md:from-black/70 md:via-black/45 md:to-black/20
                            bg-gradient-to-b from-black/60 via-black/40 to-black/30"></div>
            </div>
          ))}
        </div>

        {/* Carousel Controls - Hidden on mobile, visible on tablet and above */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Text Content - Centered on mobile, left aligned on larger screens */}
              <div className="space-y-4 sm:space-y-6 text-white text-center lg:text-left lg:ml-4 xl:ml-8 px-4 sm:px-0">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg border border-white/10">
                  <span className="text-white font-semibold text-xs tracking-wide">
                    २०२४ पासून बदल घडवित आहोत
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-2 sm:space-y-3">
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                    समाज
                    <span className="block text-emerald-300 mt-1 sm:mt-2">सशक्तीकरण</span>
                  </h1>
                  <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-emerald-400 rounded-full mx-auto lg:mx-0"></div>
                  <p className="text-emerald-100 text-sm sm:text-base lg:text-lg font-medium tracking-wide">
                    भविष्य घडवतो आपल्या हातून
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed max-w-xl font-light tracking-wide mx-auto lg:mx-0">
                  शिक्षण, आरोग्य आणि शाश्वत विकास कार्यक्रमांद्वारे
                  <span className="block mt-1 sm:mt-2">जीवन बदलण्यासाठी आमच्यात सामील व्हा.</span>
                </p>

                {/* Buttons */}
                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3 justify-center lg:justify-start">
                  <button
                    onClick={handleDonateClick}
                    className="group px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg sm:rounded-xl font-semibold shadow-xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center border border-emerald-400/30 text-sm sm:text-base"
                  >
                    <span className="tracking-wide">देणगी द्या</span>
                    <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={handleVolunteerClick}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/15 backdrop-blur-md text-white rounded-lg sm:rounded-xl font-semibold shadow-lg hover:bg-white/25 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20 text-sm sm:text-base"
                  >
                    <span className="tracking-wide">स्वयंसेवक बना</span>
                  </button>
                </div>
              </div>

              {/* Right Column - Hidden on mobile, visible on large screens */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Instructions */}
        <div className="lg:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-2 text-white/70 text-xs">
            <span>Swipe to navigate</span>
            <div className="flex space-x-1">
              <ChevronLeft className="w-3 h-3" />
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
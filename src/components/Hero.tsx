import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const handleDonateClick = () => {
  window.open("https://docs.google.com/forms/d/e/1FAIpQLScD1WInFtEnfiPijNN-4XWjYPgma_AxANM3STAXfTvYfXbI2w/viewform?usp=header", "_blank");
};

const carouselImages = [
  "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/6646904/pexels-photo-6646904.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
    <div className="pt-10">
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
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
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
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-white">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full shadow-sm">
                <span className="text-white font-medium text-sm">
                  २०२४ पासून बदल घडवित आहोत
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                समाज सशक्तीकरण
                <span className="block text-emerald-300 mt-2">भविष्य घडवतो</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                शिक्षण, आरोग्य आणि शाश्वत विकास कार्यक्रमांद्वारे जीवन बदलण्यासाठी आमच्यात सामील व्हा.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleDonateClick}
                  className="group px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:bg-emerald-700 transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center"
                >
                  देणगी द्या
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold shadow-md hover:bg-white/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  स्वयंसेवक बना
                </button>
              </div>
            </div>

            {/* Empty div to maintain grid layout - you can remove this if not needed */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
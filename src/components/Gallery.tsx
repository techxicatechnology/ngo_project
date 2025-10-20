import { useState } from "react";
import ss1 from "../assets/ss1.webp";
import ss2 from "../assets/ss2.webp";
import ss3 from "../assets/ss3.webp";
import ss4 from "../assets/ss4.webp";
import ss5 from "../assets/ss5.webp";
import ss6 from "../assets/ss6.webp";
import ss7 from "../assets/ss7.webp";
import ss8 from "../assets/ss8.webp";
import ss9 from "../assets/ss9.webp";
import ss10 from "../assets/ss10.webp";
import ss11 from "../assets/ss11.webp";

const images = [
  { src: ss1, alt: "Event 1" },
  { src: ss2, alt: "Event 2" },
  { src: ss3, alt: "Event 3" },
  { src: ss4, alt: "Event 4" },
  { src: ss5, alt: "Event 5" },
  { src: ss6, alt: "Event 6" },
  { src: ss7, alt: "Event 7" },
  { src: ss8, alt: "Event 8" },
  { src: ss9, alt: "Event 9" },
  { src: ss10, alt: "Event 10" },
  { src: ss11, alt: "Event 11" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const groupedImages = [];
  for (let i = 0; i < images.length; i += 3) {
    groupedImages.push(images.slice(i, i + 3));
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % groupedImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + groupedImages.length) % groupedImages.length);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
             आमची गॅलरी
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            आमच्या उपक्रमांमधील काही सुंदर क्षण
          </p>
          <div className="w-20 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {groupedImages.map((group, groupIndex) => (
                <div key={groupIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {group.map((image, idx) => (
                      <div
                        key={idx}
                        className="relative group overflow-hidden rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                        onClick={() => setSelectedImage(image.src)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                          <span className="text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                            पहा
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 border border-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 border border-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-2">
            {groupedImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-6">
            <span className="text-gray-500 text-sm font-medium">
              {currentSlide + 1} / {groupedImages.length}
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal - FIXED */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm">
          {/* Close button - positioned separately */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-200 z-50 bg-black/50 rounded-full p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Image container - properly centered */}
          <div 
            className="relative max-w-4xl w-full mx-4 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl cursor-pointer"
            />
          </div>
        </div>
      )}
    </section>
  );
}
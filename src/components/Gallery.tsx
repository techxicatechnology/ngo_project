import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import vk from "../assets/vk.png";
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
  { src: vk, alt: "Event VK" },
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
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const groupedImages = [];
  for (let i = 0; i < images.length; i += 3) {
    groupedImages.push(images.slice(i, i + 3));
  }

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % groupedImages.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + groupedImages.length) % groupedImages.length);

  const nextImage = () =>
    setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : 0));

  const prevImage = () =>
    setSelectedImage((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0
    );

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [selectedImage]);

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            आमचे क्षणचित्र
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            आमच्या उपक्रमांमधील काही सुंदर क्षण
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-gray-200"
        >
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {groupedImages.map((group, groupIndex) => (
                <div key={groupIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
                    {group.map((image, idx) => {
                      const globalIndex = groupIndex * 3 + idx;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100"
                          style={{ perspective: "1000px" }}
                          onClick={() => setSelectedImage(globalIndex)}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Overlay with Icon */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                            <div className="bg-white/90 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <ZoomIn className="w-6 h-6 text-blue-600" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 text-gray-800 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 border-2 border-blue-100"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 text-gray-800 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 border-2 border-blue-100"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-10 space-x-3">
            {groupedImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.3 }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 w-10"
                    : "bg-gray-300 hover:bg-gray-400 w-3"
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm font-semibold bg-gray-100 px-4 py-2 rounded-full">
              {currentSlide + 1} / {groupedImages.length}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal with Framer Motion */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3 z-50"
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Navigation in Lightbox */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 text-white hover:scale-110 transition-transform bg-white/10 hover:bg-white/20 rounded-full p-4"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 text-white hover:scale-110 transition-transform bg-white/10 hover:bg-white/20 rounded-full p-4"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-5xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl mx-auto"
              />
              <p className="text-white text-center mt-4 text-lg font-medium">
                {images[selectedImage].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

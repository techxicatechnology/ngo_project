import { useState } from "react";

const images = [
  { src: "https://plus.unsplash.com/premium_photo-1682092618317-9b50d60e6e0d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", alt: "Event 1" },
  { src: "https://images.unsplash.com/photo-1652858672796-960164bd632b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmdvfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", alt: "Event 2" },
  { src: "https://images.unsplash.com/photo-1535090467336-9501f96eef89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmdvfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", alt: "Event 3" },
  { src: "https://media.istockphoto.com/id/488209444/photo/teenagers-register-at-recycling-volunteer-check-in-table-multi-ethnic-group.webp?a=1&b=1&s=612x612&w=0&k=20&c=h26rCsWIGiAP3d-o1ZDuWrzT0F3_t8YYyxFFrznMWcU=", alt: "Event 4" },
  { src: "https://media.istockphoto.com/id/1298626388/photo/e-donation-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=C2adq2ayKW7RUvHWTHGO2WKEs3770pvxnvdmjW7SSCM=", alt: "Event 5" },
  { src: "https://media.istockphoto.com/id/1298626388/photo/e-donation-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=C2adq2ayKW7RUvHWTHGO2WKEs3770pvxnvdmjW7SSCM=", alt: "Event 6" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">📸 आमची गॅलरी</h2>
          <p className="text-gray-600 mt-2">
            आमच्या उपक्रमांमधील काही सुंदर क्षण
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-lg font-medium">
                पहा
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </section>
  );
}

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, X } from 'lucide-react';
import regImg from '../assets/youvashaki_reg.jpg';
import csrImg from '../assets/csr.jpg';
import tax1 from '../assets/tax1.jpg';
import tax2 from '../assets/tax2.jpg';
import pan from '../assets/pan.jpg';
import savi from '../assets/savitribai fule-yojana.webp';

// Define types
interface Certificate {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  issuedBy: string;
}

interface CertificateGalleryProps {
  certificates: Certificate[];
}

export function CertificateGallery({ certificates }: CertificateGalleryProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openCertificate = (certificate: Certificate, index: number) => {
    setSelectedCertificate(certificate);
    setCurrentIndex(index);
    setZoomLevel(1);
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
    setZoomLevel(1);
  };

  const nextCertificate = () => {
    const nextIndex = (currentIndex + 1) % certificates.length;
    setCurrentIndex(nextIndex);
    setSelectedCertificate(certificates[nextIndex]);
    setZoomLevel(1);
  };

  const prevCertificate = () => {
    const prevIndex = (currentIndex - 1 + certificates.length) % certificates.length;
    setCurrentIndex(prevIndex);
    setSelectedCertificate(certificates[prevIndex]);
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const downloadCertificate = (certificate: Certificate) => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = certificate.imageUrl;
    link.download = `${certificate.title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 bg-gray-50" id="certificates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Certificates & Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recognitions and certifications that validate our commitment to social service and community development.
          </p>
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <div
              key={certificate.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
              onClick={() => openCertificate(certificate, index)}
            >
              {/* Certificate Image */}
              <div className="relative overflow-hidden">
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {certificate.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {certificate.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{certificate.date}</span>
                  <span className="font-medium text-emerald-600">
                    {certificate.issuedBy}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Certificate View */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Issued by {selectedCertificate.issuedBy} on {selectedCertificate.date}
                  </p>
                </div>
                <button
                  onClick={closeCertificate}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Certificate Image with Zoom */}
              <div className="flex-1 overflow-auto p-6">
                <div className="flex justify-center">
                  <img
                    src={selectedCertificate.imageUrl}
                    alt={selectedCertificate.title}
                    className="max-w-full max-h-[60vh] object-contain transition-transform duration-200"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />
                </div>
              </div>

              {/* Modal Footer with Controls */}
              <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
                {/* Navigation */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={prevCertificate}
                    className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-600">
                    {currentIndex + 1} of {certificates.length}
                  </span>
                  <button
                    onClick={nextCertificate}
                    className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={zoomOut}
                    disabled={zoomLevel <= 0.5}
                    className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-600 w-16 text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={zoomIn}
                    disabled={zoomLevel >= 3}
                    className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => downloadCertificate(selectedCertificate)}
                  className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {certificates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📄</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No Certificates Available
            </h3>
            <p className="text-gray-500">
              Certificates and achievements will be displayed here once available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Main Certificates component with sample data
export default function Certificates() {
  // Replace these with your actual certificate images
  const certificatesData: Certificate[] = [
    {
      id: 1,
      title: "NGO Registration Certificate",
      description: "Official registration certificate from the government authorities",
      imageUrl: regImg, // Replace with your image path
      date: "2024-02-24",
      issuedBy: "Government of Maharashtra"
    },
    {
      id: 2,
      title: "Tax Certificate",
      description: "Tax  certificate under section 80G of Income Tax Act",
      imageUrl: tax1, // Replace with your image path
      date: "2023-11-30",
      issuedBy: "Income Tax Department"
    },
    {
      id: 3,
      title: "CSR ",
      description: "Award for outstanding partnership in corporate social responsibility",
      imageUrl: csrImg, // Replace with your image path
      date: "2024-08-12",
      issuedBy: "CSR Foundation"
    },
    {
      id: 4,
      title: "Tax Certificate",
      description: "Tax certificate under section 80G of Income Tax Act",
      imageUrl: tax2, // Replace with your image path
      date: "2023-11-30",
      issuedBy: "Income Tax Department"
    },
    {
      id: 5,
      title: "Pancard",
      description: "Pancard of NGO Youvashakti",
      imageUrl: pan, // Replace with your image path
      date: "2019-12-12",
      issuedBy: ""
    },
    {
      id: 6,
      title: "Savitribai Phule Yojana Certificate",
      description: "Savitribai Phule Yojana Certificate",
      imageUrl: savi, // Replace with your image path
      date: "2024-08-20",
      issuedBy: "Savitribai Phule Yojana Certificate"
    }
  ];

  return <CertificateGallery certificates={certificatesData} />;
}
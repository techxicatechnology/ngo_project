import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { useRegister } from "../store/useRegister";
import { toPng } from "html-to-image";

const NgoIdCardDemo = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { user } = useRegister();

  const dummyData = {
    name: "Janeshwar Kumar",
    uniqueId: "YUVA-2026-0001",
    phone: "98XXXXXXXX",
    area: "Maharashtra",
    issueDate: "14/01/2026",
    image: "https://via.placeholder.com/150",
  };

  const displayData = user || dummyData;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { 
        pixelRatio: 4, // Ultra-high quality for printing
        cacheBust: true 
      });
      const link = document.createElement("a");
      link.download = `ID-${displayData.name.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="flex mt-5 flex-col items-center justify-center gap-8 bg-slate-100 py-16 min-h-screen font-sans">
      
      {/* ID CARD CONTAINER */}
      <div
        ref={cardRef}
        className="relative w-[380px] bg-white rounded-[24px] shadow-2xl border border-slate-200 overflow-hidden"
        style={{ height: "540px" }} // Standard ID Proportions
      >
        {/* 1. Background Texture Layer */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%230f2a44' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}
        ></div>

        {/* 2. Header Section */}
        <div className="relative h-32 bg-[#0f2a44] p-5 flex items-start justify-between">
          {/* Saffron/White Accent Curves */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          
          <div className="z-10">
            <h1 className="text-white text-[20px] font-black leading-tight tracking-tight">
              युवाशक्ती बहुउद्देशीय
            </h1>
            <p className="text-amber-400 text-xs font-bold tracking-[0.15em] uppercase mt-1">
              सेवाभावी संस्था
            </p>
          </div>

          <div className="z-10 bg-white p-1.5 rounded-xl shadow-lg shadow-black/20">
            <img src="/Logo.png" alt="NGO Logo" className="w-12 h-12 object-contain" />
          </div>
        </div>

        {/* 3. Profile Photo Section */}
        <div className="relative flex justify-center -mt-14 z-20">
          <div className="relative">
            <div className="bg-white p-1 rounded-full shadow-2xl">
              <img
                src={displayData.image}
                alt="Member"
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-inner"
              />
            </div>
            {/* Status Badge */}
            <div className="absolute bottom-1 right-1 bg-green-500 border-4 border-white w-6 h-6 rounded-full shadow-md"></div>
          </div>
        </div>

        {/* 4. Name & Title */}
        <div className="text-center mt-4 px-6">
          <p className="text-[11px] font-black text-amber-600 tracking-[0.25em] uppercase">
            Official Identity Card
          </p>
          <h2 className="text-2xl font-black text-[#0f2a44] mt-1 tracking-tight">
            {displayData.name.toUpperCase()}
          </h2>
        </div>

        {/* 5. Information Grid */}
        <div className="mx-6 mt-6 grid grid-cols-2 gap-y-4 gap-x-2 p-4 bg-slate-50/80 backdrop-blur-md rounded-2xl border border-slate-200/60 relative overflow-hidden">
          {/* Subtle watermark in grid */}
          <div className="absolute -right-4 -bottom-4 opacity-[0.05] rotate-12">
            <img src="/Logo.png" className="w-24" alt="" />
          </div>

          <InfoBlock label="Member ID" value={displayData.uniqueId} isMono />
          <InfoBlock label="Mobile" value={displayData.phone} />
          <InfoBlock label="State" value={displayData.area} />
          <InfoBlock label="Issue Date" value={displayData.issueDate} />
        </div>

        {/* 6. Footer Signature & QR */}
        <div className="mt-auto px-6 pt-6 pb-4 flex justify-between items-end">
          <div className="flex flex-col">
            <img
              src="/sign.png"
              className=" w-32 h-16 object-cover mix-blend-multiply opacity-80"
              alt="Signature"
            />
            <div className="mt-1">
              <p className="text-xs font-bold text-[#0f2a44] leading-none">Amol Kharat</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">अध्यक्ष / President</p>
            </div>
          </div>

          <div className="bg-white p-2 rounded-xl shadow-md border border-slate-100 flex items-center justify-center">
            <QRCode 
               value={`MEMBER:${displayData.uniqueId}`} 
               size={55} 
               level="H"
               fgColor="#0f2a44" 
            />
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600"></div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={handleDownload}
        className="group relative flex items-center gap-3 bg-[#0f2a44] text-white px-10 py-4 rounded-2xl font-bold shadow-2xl hover:bg-[#1a3a5a] transition-all active:scale-95"
      >
        <span>Download Digital ID</span>
        <svg 
          className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  );
};

// Helper Component for the Details Grid
const InfoBlock = ({ label, value, isMono = false }: { label: string; value: string; isMono?: boolean }) => (
  <div className="z-10">
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
      {label}
    </p>
    <p className={`text-[13px] font-bold text-slate-800 ${isMono ? 'font-mono text-blue-700' : ''}`}>
      {value}
    </p>
  </div>
);

export default NgoIdCardDemo;
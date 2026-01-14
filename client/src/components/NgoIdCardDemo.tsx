import React, { forwardRef, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { useRegister } from "../store/useRegister";
import { toPng } from "html-to-image";

const NgoIdCardDemo = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { user } = useRegister();

  // Dummy fallback
  const dummyData = {
    name: "Janeshwar Kumar",
    uniqueId: "0000",
    phone: "98XXXXXXXX",
    area: "Maharashtra",
    issueDate: "01/01/2026",
    image: "https://via.placeholder.com/150",
  };

  const displayData = user || dummyData;

  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  // 🔥 DOWNLOAD HANDLER
  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 1.5,
        quality: 1,
      });

      const link = document.createElement("a");
      link.download = `${displayData.name.replace(" ", "-")}-ID.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="flex flex-col mt-5 pt-20 items-center gap-6 py-10 bg-gray-50">
      
      {/* 🔽 ID CARD */}
      <div
        ref={cardRef}
        className="relative w-[350px]  bg-white border-2 border-gray-800 rounded-xl p-4 font-sans shadow-xl overflow-hidden"
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <h1 className="text-6xl font-bold rotate-45">YUVASHIKTI NGO</h1>
        </div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-center border-b-2 border-orange-500 pb-2">
          <div className="text-xs font-bold leading-tight">
            <p className="text-[14px]">युवाशक्ती</p>
            <p className="text-[14px]">बहुउद्देशीय</p>
            <p className="text-[14px]">सेवाभावी संस्था</p>
          </div>

          <div className="w-14 h-14 border-2 border-blue-600 rounded-full overflow-hidden">
            <img src="/Logo.png" alt="NGO Logo" className="w-full border-2 border-blue-600 h-full object-cover" />
          </div>
        </div>

        {/* Photo */}
        <div className="relative z-10 flex justify-center my-4">
          <img
            src={displayData.image}
            alt="Member"
            className="w-28 h-28 rounded-full border-2 border-gray-400 object-cover"
          />
        </div>

        {/* Details */}
        <div className="relative z-10 text-sm space-y-2 px-2">
          <p>
            <span className="block text-[10px] uppercase text-gray-500">Full Name</span>
            <span className="font-semibold">{displayData.name}</span>
          </p>

          <div className="grid grid-cols-2 gap-2">
            <p>
              <span className="block text-[10px] uppercase text-gray-500">Member ID</span>
              <span className="font-mono text-blue-700">{displayData.uniqueId}</span>
            </p>
            <p>
              <span className="block text-[10px] uppercase text-gray-500">Mobile</span>
              <span>{displayData.phone}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <p>
              <span className="block text-[10px] uppercase text-gray-500">State</span>
              <span>{displayData.area}</span>
            </p>
            <p>
              <span className="block text-[10px] uppercase text-gray-500">Issue Date</span>
              <span>{displayData.issueDate}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex justify-between items-end mt-6 pt-2 border-t border-dashed">
          <div className="text-center">
            <img className="w-32 h-16" src="/sign.png"></img>
            <p className="text-[11px] font-bold">Amol KHARAT</p>
            <p className="text-[9px] text-gray-500">President</p>
          </div>

          <div className="flex items-center rounded-[5px] justify-center bg-gray-100 w-[78px] h-[78px]">
                      <QRCode value={`${displayData.uniqueId}`} size={64} />

          </div>

        </div>
      </div>

      {/* 🔽 DOWNLOAD BUTTON */}
      <button
        onClick={handleDownload}
        className="bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
      >
        Download Identity Card
      </button>
    </div>
  );
};

export default NgoIdCardDemo;

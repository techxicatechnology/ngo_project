import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

interface DonationData {
  name: string;
  email: string;
  amount: string;
  uniqueId: string;
  createdAt?: string;
}

const DonationReceiptCard = ({ donation }: { donation: DonationData }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2, // Higher resolution for printing
    });

    const link = document.createElement("a");
    link.download = `Receipt-${donation.uniqueId}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      {/* RECEIPT CARD */}
      <div
        ref={cardRef}
        className="relative w-[360px] bg-white border-[3px] border-emerald-800 rounded-2xl p-0 shadow-2xl overflow-hidden font-sans"
      >
        {/* NGO Professional Pattern Background */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0z' fill='%23064e3b' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Top Header Band */}
        <div className="relative z-10 bg-gradient-to-r from-emerald-900 to-emerald-700 p-4 flex justify-between items-center shadow-md">
          <div className="text-white">
            <p className="text-[16px] font-black tracking-tight leading-none mb-1">युवाशक्ती बहुउद्देशीय</p>
            <p className="text-[12px] font-medium text-emerald-100">सेवाभावी संस्था</p>
          </div>
          <div className="bg-white p-1 rounded-full shadow-inner border border-emerald-500">
            <img src="/Logo.png" alt="NGO Logo" className="w-10 h-10 object-contain" />
          </div>
        </div>

        <div className="relative z-10 p-5">
          {/* Status Badge */}
          <div className="text-center mb-4">
            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 px-5 py-1 rounded-full text-[10px] font-black tracking-[0.15em] uppercase">
              Verified Donation Receipt
            </span>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <span className="block text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Donor Name</span>
              <span className="font-bold text-slate-800 text-lg uppercase tracking-tight">{donation?.name}</span>
            </div>

            <div className="border-b border-slate-100 pb-2">
              <span className="block text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Email Address</span>
              <span className="text-sm font-semibold text-slate-600 break-all">{donation?.email}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                <span className="block text-[10px] uppercase font-bold text-emerald-700">Donation ID</span>
                <span className="font-mono font-black text-slate-900 text-xs">{donation?.uniqueId}</span>
              </div>
              <div className="bg-emerald-600 p-2 rounded-lg shadow-md border-b-4 border-emerald-800">
                <span className="block text-[10px] uppercase font-bold text-emerald-50">Amount</span>
                <span className="font-black text-white text-base">₹ {donation?.amount}</span>
              </div>
            </div>

            <div className="pt-1">
              <span className="block text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Contribution Date</span>
              <span className="text-slate-700 font-bold">
                {donation?.createdAt ? new Date(donation.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }) : 'N/A'}
              </span>
            </div>
          </div>

          {/* Footer Signature & QR Area */}
          <div className="flex justify-between items-end mt-8 pt-3 border-t-2 border-dashed border-slate-200">
            <div className="text-left">
              <div className="mb-1 opacity-80 italic text-emerald-800 font-serif text-[10px]">Authorized Signature</div>
              <p className="text-[12px] font-black text-slate-900 uppercase">Yuvashakti NGO</p>
              <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-widest">Verification Cell</p>
            </div>

            <div className="bg-white p-1.5 border-2 border-emerald-50 rounded-xl shadow-sm">
              <QRCode
                value={`Receipt ID: ${donation?.uniqueId} | Donor: ${donation?.name}`}
                size={60}
              />
            </div>
          </div>
        </div>

        {/* Security Bottom Strip */}
        <div className="h-2 bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-900"></div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={handleDownload}
        className="bg-emerald-800 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Download Donation Receipt
      </button>
    </div>
  );
};

export default DonationReceiptCard;
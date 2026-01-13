import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

interface DonationData {
  name: string;
  email: string;
  amount: string;
  uniqueId: string;
  date: string;
}

const DonationReceiptCard = ({ donation }: { donation: DonationData }) => {

  console.log("donation is",donation)

  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 1.5,
    });

    const link = document.createElement("a");
    link.download = `Donation-${donation.uniqueId}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* RECEIPT CARD */}
      <div
        ref={cardRef}
        className="relative w-[350px] bg-white border-2 border-green-700 rounded-xl p-4 shadow-xl overflow-hidden"
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <h1 className="text-5xl font-bold rotate-45">YUVASHIKTI NGO</h1>
        </div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-center border-b-2 border-green-600 pb-2">
          <div className="text-xs font-bold leading-tight">
            <p className="text-[14px]">युवाशक्ती</p>
            <p className="text-[14px]">बहुउद्देशीय</p>
            <p className="text-[14px]">सेवाभावी संस्था</p>
          </div>

          <div className="w-14 h-14 border-2 border-green-700 rounded-full overflow-hidden">
            <img src="/Logo.png" alt="NGO Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Status */}
        <div className="relative z-10 text-center my-3">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold">
            VERIFIED DONATION
          </span>
        </div>

        {/* Details */}
        <div className="relative z-10 text-sm space-y-2 px-2">
          <p>
            <span className="block text-[10px] uppercase text-gray-500">Donor Name</span>
            <span className="font-semibold">{donation?.name}</span>
          </p>

          <p>
            <span className="block text-[10px] uppercase text-gray-500">Email</span>
            <span className="text-xs break-all">{donation?.email}</span>
          </p>

          <div className="grid grid-cols-2 gap-2">
            <p>
              <span className="block text-[10px] uppercase text-gray-500">Donation ID</span>
              <span className="font-mono text-green-700">{donation?.uniqueId}</span>
            </p>
            <p>
              <span className="block text-[10px] uppercase text-gray-500">Amount</span>
              <span className="font-bold text-green-800">₹ {donation?.amount}</span>
            </p>
          </div>

          <p>
            <span className="block text-[10px] uppercase text-gray-500">Date</span>
<span>
  {donation?.createdAt ? new Date(donation.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'N/A'}
</span>          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex justify-between items-end mt-6 pt-2 border-t border-dashed">
          <div className="text-center">
            <p className="text-[11px] font-bold">Authorized By NGO</p>
            <p className="text-[9px] text-gray-500">Donation Verification</p>
          </div>

          <div className="bg-gray-100 p-2 rounded">
            <QRCode
              value={`Id is:------> ${donation?.uniqueId} and email is:-------> ${donation?.email}`}
              size={64}
            />
          </div>
        </div>
      </div>

      {/* DOWNLOAD */}
      <button
        onClick={handleDownload}
        className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
      >
        Download Donation Receipt
      </button>
    </div>
  );
};

export default DonationReceiptCard;

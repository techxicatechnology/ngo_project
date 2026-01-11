import { forwardRef } from "react";
import QRCode from "react-qr-code";

interface NgoIdCardProps {
  name: string;
  uniqueId: string;
  area: string;
  photo: string;
  issueDate: string;
}

const NgoIdCard = forwardRef<HTMLDivElement, NgoIdCardProps>(
  ({ name, uniqueId, area, photo, issueDate }, ref) => {
    console.log("Nmae is",name)
    console.log("Unique ID is",uniqueId)
    console.log("Area is",area)
    console.log("Photo is",photo)
    console.log("Issue Date is",issueDate)
    return (
      <div
        ref={ref}
        className="w-80 mt-[5vh] bg-white rounded-xl shadow-lg border border-teal-700 overflow-hidden font-sans"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-400 text-white p-3 text-center">
          <h2 className="text-lg font-bold">Yuvashakti NGO</h2>
          <p className="text-xs opacity-80">Empowering Youth for Change</p>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Profile Photo */}
          <div className="flex justify-center mb-3">
            <img
              src={photo}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-teal-400 object-cover"
            />
          </div>

          {/* User Details */}
          
          <div className="text-sm space-y-1">
            <p>
              <span className="font-semibold">Name:</span> {name}
            </p>
            <p>
              <span className="font-semibold">Volunteer ID:</span>
            </p>
            <p className="font-bold text-teal-700 tracking-widest">
              {uniqueId}
            </p>
            <p>
              <span className="font-semibold">Assigned Area:</span> {area}
            </p>
            <p>
              <span className="font-semibold">Issued On:</span> {issueDate}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mt-4">
            <QRCode
              value={`Id is :---> ${uniqueId}`}
              size={80}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-dashed border-gray-300 p-3 flex justify-between text-xs">
          <span>Valid till: Dec 2027</span>
          <span className="italic">Authorized Sign</span>
        </div>
      </div>
    );
  }
);

export default NgoIdCard;

import { useRef } from "react";
import NgoIdCard from "../components/NgoIdCard";
import { toPng } from "html-to-image";
import { useRegister } from "../store/useRegister";

export default function NgoIdCardDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { user } = useRegister();

  // Use first user or default dummy
  const currentUser = user?.[0] || {
    name: "Unknown",
    uniqueId: "0000",
    area: "Unknown",
    photo: "https://via.placeholder.com/150",
    issueDate: "N/A",
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 2,
        cors: true,
      });

      const link = document.createElement("a");
      link.download = `${currentUser.name}-ngo-id.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teal-50 p-4 gap-4">
      <NgoIdCard ref={cardRef} {...currentUser} />
      <button
        onClick={handleDownload}
        className="bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition"
      >
        Download ID
      </button>
    </div>
  );
}

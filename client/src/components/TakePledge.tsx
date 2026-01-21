import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, RefreshCcw, Check, ChevronRight } from "lucide-react";
import { usePledge } from "../store/usePledge";
import states from "../constants/list.json";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TakePledge: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { setUserName } = usePledge();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [formData, setFormData] = useState({ name: "", mobile: "", state: "", district: "" });
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);

  // Typing effect state
  const [typedText, setTypedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  const oathText = "मी गंभीरपणे प्रतिज्ञा करतो की मी बालविवाहाच्या प्रथेला कडाडून विरोध करेन आणि समाजात सकारात्मक बदल घडवून आणण्यासाठी सतत जागरूक आणि सक्रिय राहीन. मुलींचे हक्क, शिक्षण, प्रतिष्ठा आणि सुरक्षितता यासाठी सतत काम करण्यासाठी आणि प्रत्येक मुलीला शिक्षण घेण्यासाठी आणि आदर, सुरक्षितता आणि समान संधी असलेले जीवन जगण्यासाठी प्रोत्साहित करण्यासाठी मी स्वतःला वचनबद्ध करतो.";

  const generateCaptcha = () => {
    setCaptcha(Math.random().toString(36).substring(2, 8).toUpperCase());
  };

  // Animate modal & typing
  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setTypedText("");
      setIsTypingDone(false);

      // Modal animation
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2, display: "flex" });
      gsap.fromTo(modalRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });

      // Typing effect
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(oathText.slice(0, i));
        i++;
        if (i > oathText.length) {
          clearInterval(interval);
          setIsTypingDone(true);
        }
      }, 60); // typing speed (ms per character)

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    const selected = states.states.find((s) => s.state === formData.state);
    setDistrictOptions(selected ? selected.districts : []);
  }, [formData.state]);

  const isFormValid =
    formData.name.trim().length > 2 &&
    formData.mobile.length === 10 &&
    formData.state &&
    formData.district &&
    captchaInput === captcha &&
    isTypingDone; // now form requires typing to complete

  const handleSubmit = () => {
    if (!isFormValid) return;
    toast.success("यशस्वीरित्या नोंदवली गेली!");
    setUserName(formData.name);
    navigate("/pledge-certificate");
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      style={{ fontFamily: "Poppins" }}
      className="fixed inset-0 z-[100] hidden items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 opacity-0"
    >
      <div ref={modalRef} className="w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100 shrink-0">
          <h2 className="text-lg font-bold text-slate-900">Digital Pledge</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
          {/* Oath with typing */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed text-center italic">
              "{typedText}"
              {!isTypingDone && <span className="inline-block w-1 h-5 bg-emerald-500 ml-1 animate-pulse" />}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                <input
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Your Name"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Mobile</label>
                <input
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="10 Digits"
                  maxLength={10}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">State</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                >
                  <option value="">Select State</option>
                  {states.states.map((s) => (
                    <option key={s.state} value={s.state}>
                      {s.state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">District</label>
                <select
                  disabled={!formData.state}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 cursor-pointer disabled:bg-slate-50"
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                >
                  <option value="">Select District</option>
                  {districtOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="flex items-end gap-3 pt-2">
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Verification</label>
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900 rounded-lg">
                  <span className="text-white font-mono font-bold tracking-[0.2em] select-none">{captcha}</span>
                  <button onClick={generateCaptcha} className="text-slate-400 hover:text-white transition-colors">
                    <RefreshCcw size={14} />
                  </button>
                </div>
              </div>
              <input
                className="w-24 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-center font-bold focus:outline-none focus:border-emerald-500 uppercase"
                placeholder="Code"
                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-50 shrink-0">
          <button
            disabled={!isFormValid}
            onClick={handleSubmit}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              isFormValid
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100 active:scale-[0.98]"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
           {
  !isTypingDone
    ? "Read the pledge carefully"
    : isFormValid
      ? "Submit Pledge"
      : "Complete the Form"
}
            
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default TakePledge;

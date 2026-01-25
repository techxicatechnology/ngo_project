import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../store/useRegister";
import {
  User,
  Globe,
  Camera,
  ArrowRight,
  Loader2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Clipboard,
  Download,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";

// --- Types ---
interface RegisterUser {
  fullName: string;
  address: string;
  state: string;
  district: string;
  taluka: string;
  village: string;
  mobileNumber: string;
  email: string;
  dateOfBirth: string;
  profilePhoto: File | null;
}

// --- Form Input Component ---
const FormInput = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  icon,
  error,
  type = "text",
}: {
  name: keyof RegisterUser;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  label: string;
  icon?: React.ReactNode;
  error?: string;
  type?: string;
}) => {
  return (
    <div className="relative w-full">
      <label className="block mb-1.5 text-xs font-bold text-slate-600 ml-1">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-3.5 text-slate-400 pointer-events-none">
          {icon}
        </span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50 text-slate-800 text-sm transition-all outline-none
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-200 focus:border-[#119F52] focus:ring-2 focus:ring-emerald-50"
          }`}
        />
      </div>

      {error && (
        <p className="mt-1 text-[10px] text-red-500 font-bold ml-1">
          आवश्यक
        </p>
      )}
    </div>
  );
};

const RegistrationForm = () => {
  const { registerUser, isRegistering, error, user } = useRegister();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterUser>({
    fullName: "",
    address: "India",
    state: "Maharashtra",
    district: "",
    taluka: "",
    village: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    profilePhoto: null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterUser, string>>
  >({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<{field: string, message: string} | null>(null);
  const idCardRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const required: (keyof RegisterUser)[] = [
      "fullName",
      "mobileNumber",
      "district",
      "taluka",
      "village",
      "address",
      "dateOfBirth",
      "profilePhoto",
      "email"
    ];

    const newErrors: Partial<Record<keyof RegisterUser, string>> = {};
    required.forEach((field) => {
      if (!formData[field]?.toString().trim())
        newErrors[field] = "आवश्यक";
    });

    if (
      formData.mobileNumber &&
      !/^\d{10}$/.test(formData.mobileNumber)
    )
      newErrors.mobileNumber = "१० अंकी क्रमांक आवश्यक";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Watch for user registration success or errors
  useEffect(() => {
    if (user && !error) {
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (error && (error as any)?.response?.data?.field) {
      const errorData = (error as any).response.data;
      setDuplicateWarning({
        field: errorData.field,
        message: errorData.message
      });
    }
  }, [user, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setDuplicateWarning(null);
    setShowSuccess(false);
    
    await registerUser(formData);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("ID Copied!");
  };

  const handleDownloadIdCard = async () => {
    if (!idCardRef.current) return;
    try {
      const dataUrl = await toPng(idCardRef.current, { 
        pixelRatio: 4,
        cacheBust: true 
      });
      const link = document.createElement("a");
      const fileName = user ? `ID-${user.name.replace(/\s+/g, "-")}.png` : `ID-Card.png`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();
      toast.success("ID Card downloaded!");
    } catch (err) {
      console.error("Download failed", err);
      toast.error("Failed to download ID card");
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-slate-50 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            युवाशक्ती <span className="text-[#119F52]">बहुउद्देशीय संस्था</span>
          </h1>
          <p className="text-slate-400 font-bold mt-1 text-xs uppercase tracking-[0.2em]">
            नोंदणी अर्ज
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && user && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border-2 border-green-200 rounded-2xl p-6"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-black text-green-900 text-center mb-2">
              Registration Successful! 🎉
            </h3>
            <p className="text-sm text-green-700 text-center mb-4">
              Your membership has been registered successfully
            </p>
            
            {/* Member ID Display */}
            <div className="bg-white rounded-xl p-4 mb-4 border-2 border-green-200">
              <p className="text-xs font-bold text-slate-500 uppercase mb-2 text-center">Your Member ID</p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-2xl font-mono font-black text-slate-900 tracking-wider">{user.uniqueId}</p>
                <button
                  onClick={() => copyToClipboard(user.uniqueId)}
                  className="p-2 bg-green-100 hover:bg-green-200 rounded-xl text-green-700 transition-colors"
                  title="Copy ID"
                >
                  <Clipboard size={20} />
                </button>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleDownloadIdCard}
                className="w-full bg-[#119F52] hover:bg-[#0d7a3f] text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Download size={20} /> Download ID Card
              </button>
              <p className="text-xs text-slate-500 text-center">
                Save your Member ID for future reference
              </p>
            </div>
          </motion.div>
        )}

        {/* Duplicate Warning */}
        {duplicateWarning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-start gap-3"
          >
            <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-amber-900 mb-1">{duplicateWarning.message}</p>
              <p className="text-sm text-amber-700">
                Please use a different {duplicateWarning.field === "email" ? "email address" : "mobile number"}
              </p>
            </div>
          </motion.div>
        )}

        {/* Hidden ID Card for Download */}
        {user && (
          <div className="absolute -left-[9999px] opacity-0 pointer-events-none">
            <div ref={idCardRef} className="w-[380px] bg-white rounded-[24px] shadow-2xl border border-slate-200 overflow-hidden" style={{ height: "540px" }}>
              <div className="h-full bg-[#0f2a44] rounded-xl p-6 text-white relative">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-black">युवाशक्ती बहुउद्देशीय</h2>
                  <p className="text-xs text-amber-400">सेवाभावी संस्था</p>
                </div>
                <div className="bg-white rounded-xl p-4 mt-8">
                  <div className="flex justify-center mb-4">
                    <img 
                      src={user.photo || '/default-avatar.png'} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-slate-200"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="text-center text-slate-900">
                    <h3 className="text-lg font-black mb-2">{user.name.toUpperCase()}</h3>
                    <p className="text-xs text-slate-500 mb-2">Member ID</p>
                    <p className="text-xl font-mono font-black text-[#119F52] mb-4">{user.uniqueId}</p>
                    <div className="text-xs space-y-1 text-left bg-slate-50 p-3 rounded-lg">
                      <p><span className="font-bold">Area:</span> {user.area}</p>
                      <p><span className="font-bold">Issue Date:</span> {user.issueDate}</p>
                      <p><span className="font-bold">Phone:</span> {user.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full  overflow-hidden bg-white flex items-center justify-center ${errors.profilePhoto ? 'border border-red-500' : ''}`}>
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-slate-200" />
                )}
              </div>

              <label className="absolute bottom-0 right-0 p-2.5 rounded-full cursor-pointer bg-[#119F52]">
                <Camera size={16} className="text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-white p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6 flex gap-2">
              <User size={18} /> वैयक्तिक माहिती
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <FormInput
                name="fullName"
                label="पूर्ण नाव"
                placeholder="Enter name"
                icon={<User size={14} />}
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />

              <div className="relative">
                <FormInput
                  name="mobileNumber"
                  label="मोबाईल क्रमांक"
                  placeholder="10-digit number"
                  icon={<Phone size={14} />}
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  error={errors.mobileNumber || (duplicateWarning?.field === "mobileNumber" ? duplicateWarning.message : undefined)}
                />
                {duplicateWarning?.field === "mobileNumber" && (
                  <div className="mt-1 flex items-center gap-1 text-amber-600 text-xs">
                    <AlertCircle size={12} />
                    <span>{duplicateWarning.message}</span>
                  </div>
                )}
              </div>

              <div className="relative">
                <FormInput
                  name="email"
                  label="ईमेल"
                  placeholder="name@example.com"
                  icon={<Mail size={14} />}
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email || (duplicateWarning?.field === "email" ? duplicateWarning.message : undefined)}
                />
                {duplicateWarning?.field === "email" && (
                  <div className="mt-1 flex items-center gap-1 text-amber-600 text-xs">
                    <AlertCircle size={12} />
                    <span>{duplicateWarning.message}</span>
                  </div>
                )}
              </div>

              <FormInput
                name="dateOfBirth"
                label="जन्मतारीख"
                placeholder=""
                type="date"
                icon={<CheckCircle2 size={14} />}
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
              />
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6 flex gap-2">
              <MapPin size={18} /> पत्ता माहिती
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <FormInput
                name="state"
                label="राज्य"
                placeholder="State name"
                icon={<Globe size={14} />}
                value="Maharashtra"
                onChange={handleChange}
              />

              <FormInput
                name="district"
                label="जिल्हा"
                placeholder="District name"
                icon={<Globe size={14} />}
                value={formData.district}
                onChange={handleChange}
                error={errors.district}
              />

              <FormInput
                name="taluka"
                label="तालुका"
                placeholder="Taluka name"
                icon={<Globe size={14} />}
                value={formData.taluka}
                onChange={handleChange}
                error={errors.taluka}
              />

              <FormInput
                name="village"
                label="गाव / शहर"
                placeholder="Village name"
                icon={<Globe size={14} />}
                value={formData.village}
                onChange={handleChange}
                error={errors.village}
              />

              <FormInput
                name="address"
                label="देश"
                placeholder="India"
                icon={<MapPin size={14} />}
                value="India"
                onChange={handleChange}
                error={errors.address}
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isRegistering}
            className="h-14 w-full rounded-2xl bg-[#119F52] text-white text-lg font-bold flex items-center justify-center gap-3"
          >
            {isRegistering ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                नोंदणी करा <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;

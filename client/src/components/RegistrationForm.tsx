import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../store/useRegister";
import {
  User,
  Globe,
  Camera,
  ArrowRight,
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

// --- Form Input Component (Compact English Version) ---
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
      <label className="block mb-1.5 text-xs font-bold text-slate-600 ml-1">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-3.5 text-slate-400 pointer-events-none">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50 text-slate-800 text-sm transition-all outline-none
          ${error
            ? "border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-200 focus:border-[#119F52] focus:ring-2 focus:ring-emerald-50"
          }`}
        />
      </div>
      {error && <p className="mt-1 text-[10px] text-red-500 font-bold ml-1">{error}</p>}
    </div>
  );
};

const RegistrationForm = () => {
  const { registerUser, isRegistering } = useRegister();
  const navigate = useNavigate();
  const brandGreen = "#119F52";

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

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterUser, string>>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterUser]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const required: (keyof RegisterUser)[] = ["fullName", "mobileNumber", "district", "taluka", "village", "address", "dateOfBirth"];
    const newErrors: Partial<Record<keyof RegisterUser, string>> = {};
    required.forEach((field) => {
      if (!formData[field]?.toString().trim()) newErrors[field] = "Required";
    });
    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = "10 digits required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await registerUser(formData);
    navigate("/demo");
  };

  return (
    <div className="min-h-screen mt-10 bg-slate-50 py-10 px-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        
        {/* Nepali Name Header - Everything else is English */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            युवाशक्ती <span className="text-[#119F52]">बहुउद्देशीय संस्था</span>
          </h1>
          <p className="text-slate-400 font-bold mt-1 text-xs uppercase tracking-[0.2em]">Registration Form</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white flex items-center justify-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-slate-200" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2.5 rounded-full cursor-pointer shadow-md border-2 border-white bg-[#119F52] hover:scale-110 transition-transform">
                <Camera size={16} className="text-white" />
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          {/* Personal Details (English) */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <User size={18} className="text-[#119F52]" /> Personal Details
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput name="fullName" label="Full Name" placeholder="Enter name" icon={<User size={14}/>} value={formData.fullName} onChange={handleChange} error={errors.fullName} />
              <FormInput name="mobileNumber" label="Mobile Number" placeholder="10-digit number" icon={<Phone size={14}/>} value={formData.mobileNumber} onChange={handleChange} error={errors.mobileNumber} type="tel" />
              <FormInput name="email" label="Email Address" placeholder="name@example.com" icon={<Mail size={14}/>} value={formData.email} onChange={handleChange} error={errors.email} type="email" />
              <FormInput  name="dateOfBirth" label="Date of Birth" placeholder="" icon={<CheckCircle2 size={14}/>} value={formData.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} type="date" />
            </div>
          </div>

          {/* Location Details (English) */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MapPin size={18} className="text-[#119F52]" /> Location Details
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput name="state" label="State" placeholder="State name" icon={<Globe size={14}/>} value="Maharastra" onChange={handleChange} error={errors.state} />
              <FormInput name="district" label="District" placeholder="District name" icon={<Globe size={14}/>} value={formData.district} onChange={handleChange} error={errors.district} />
              <FormInput name="taluka" label="Taluka" placeholder="Taluka name" icon={<Globe size={14}/>} value={formData.taluka} onChange={handleChange} error={errors.taluka} />
              <FormInput name="village" label="Village / City" placeholder="Village name" icon={<Globe size={14}/>} value={formData.village} onChange={handleChange} error={errors.village} />
              <FormInput name="address" label="Country" placeholder="India" icon={<MapPin size={14}/>} value="India" onChange={handleChange} error={errors.address} />
            </div>
          </div>

          {/* Submit Button (English) */}
          <div className="pt-2 pb-10">
            <motion.button 
              whileTap={{ scale: 0.97 }} 
              type="submit" 
              disabled={isRegistering} 
              className="h-14 w-full rounded-2xl bg-[#119F52] text-white text-lg font-bold shadow-lg hover:bg-[#0e8544] disabled:opacity-70 flex items-center justify-center gap-3 transition-all"
            >
              {isRegistering ? <Loader2 className="animate-spin" size={24} /> : <>Register Now <ArrowRight size={20} /></>}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
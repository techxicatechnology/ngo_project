import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../store/useRegister";

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

const RegistrationForm = () => {
  const {registerUser,isRegistering} = useRegister()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterUser>({
    fullName: "",
    address: "",
    state: "",
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePhoto: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof RegisterUser, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "This field is required";
    if (!formData.address.trim()) newErrors.address = "This field is required";
    if (!formData.state.trim()) newErrors.state = "This field is required";
    if (!formData.district.trim()) newErrors.district = "This field is required";
    if (!formData.taluka.trim()) newErrors.taluka = "This field is required";
    if (!formData.village.trim()) newErrors.village = "This field is required";
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "This field is required";
    if (!formData.email.trim()) newErrors.email = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await registerUser(formData)

    console.log("Form submitted:", formData);
    alert("Registration form submitted successfully!");
    navigate("/demo")


  };

  const inputClass = (field: keyof RegisterUser) =>
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
    }`;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg mt-20 shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Registration Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={inputClass("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={inputClass("address")}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* State & District */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">State *</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={inputClass("state")}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">District *</label>
            <input
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={inputClass("district")}
            />
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district}</p>
            )}
          </div>
        </div>

        {/* Taluka & Village */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Taluka *</label>
            <input
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              className={inputClass("taluka")}
            />
            {errors.taluka && (
              <p className="text-red-500 text-sm mt-1">{errors.taluka}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Village *</label>
            <input
              name="village"
              value={formData.village}
              onChange={handleChange}
              className={inputClass("village")}
            />
            {errors.village && (
              <p className="text-red-500 text-sm mt-1">{errors.village}</p>
            )}
          </div>
        </div>

        {/* Mobile & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number *
            </label>
            <input
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className={inputClass("mobileNumber")}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* DOB */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Photo */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Profile Photo
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-24 h-24 rounded-full mt-2 object-cover"
            />
          )}
        </div>

       <button
  type="submit"
  disabled={isRegistering}
  className={`w-full py-2 rounded-md text-white transition
    ${isRegistering
      ? "bg-blue-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
    }`}
>
  {isRegistering ? "Registering..." : "Register"}
</button>

      </form>
    </div>
  );
};

export default RegistrationForm;

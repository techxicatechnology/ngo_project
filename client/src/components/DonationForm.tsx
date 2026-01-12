import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Clipboard, CheckCircle, Clock, AlertCircle, Search, CreditCard, X, FileImage, User, DollarSign, Mail } from "lucide-react";
import { useDonation } from "../store/useDonation";

type ViewMode = "donation" | "status";
type StatusResult = string;

export default function DonationPage() {
  const [currentView, setCurrentView] = useState<ViewMode>("donation");

  // --- FORM STATE ---

  const {createDonation,isCreating,donation,getStatus,status} = useDonation()
  const [donorName, setDonorName] = useState<string>("");
  const [email, setEmail] = useState<string>(""); // New state for email
  const [amount, setAmount] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  // --- STATUS STATE ---
  const [donationId, setDonationId] = useState<string>("");
  const [donationStatus] = useState<StatusResult>("pending");
  const [checkId, setCheckId] = useState<string>("");
  const [checkResult, setCheckResult] = useState<StatusResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setScreenshot(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
  if (status) {
    setCheckResult(status);
  }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl,status]);

  const removeImage = () => {
    setScreenshot(null);
    setPreviewUrl(null);
  };

  const generateDonationId = (): string =>
    "DON-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!donorName || !amount || !email) {
      setError("Name, Email, and Amount are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!transactionId && !screenshot) {
      setError("Please provide a Transaction ID or Screenshot");
      return;
    }

    


    setError("");
   await createDonation({
      name: donorName,
      email,
      amount,
      transactionId,
      screenshot,
    });


    setEmail("")
    setDonorName("")
    setAmount("")
    setTransactionId("")
    setScreenshot(null)
    setPreviewUrl(null)


    // toast.success(`Submission successful! Check your email soon.`);
  };

 const handleCheckStatus = () => {
  if (!checkId) return;
  getStatus(checkId);
};

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("ID Copied!");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <Toaster position="top-center" />
      
      <div className="max-w-md mx-auto mt-6 bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        
        {/* TAB TOGGLE */}
        <div className="p-6 pb-0">
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
            <button
              onClick={() => setCurrentView("donation")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                currentView === "donation" ? "bg-white text-green-600 shadow-sm" : "text-slate-500"
              }`}
            >
              <CreditCard size={18} /> Donate
            </button>
            <button
              onClick={() => setCurrentView("status")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                currentView === "status" ? "bg-white text-green-600 shadow-sm" : "text-slate-500"
              }`}
            >
              <Search size={18} /> Status
            </button>
          </div>
        </div>

        {currentView === "donation" ? (
          <div className="px-8 pb-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Support Us</h2>
              <p className="text-slate-500 text-sm mt-1">Scan the QR code to proceed</p>
            </div>

            <div className="flex justify-center mb-8">
              <img src="/donation-qr.png" alt="Donation QR" className="w-40 h-40 bg-white border-4 border-white rounded-xl shadow-lg" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
                />
              </div>

              {/* Email & Amount Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Transaction ID */}
              <input
                type="text"
                placeholder="Transaction Reference Number"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none"
              />

              <div className="flex items-center gap-3">
                <hr className="flex-1 border-slate-100" />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">OR ATTACH RECEIPT</span>
                <hr className="flex-1 border-slate-100" />
              </div>

              {/* IMAGE PREVIEW AREA */}
              {!previewUrl ? (
                <div className="relative border-2 border-dashed border-slate-200 hover:border-green-400 rounded-2xl p-4 transition-colors bg-slate-50 group">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="text-center">
                    <FileImage size={24} className="mx-auto mb-1 text-slate-400 group-hover:text-green-600 transition-colors" />
                    <p className="text-xs font-bold text-slate-600">Upload Receipt</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border-2 border-green-500 shadow-inner group h-32">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70">
                    <X size={16} />
                  </button>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <button type="submit" disabled={isCreating} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-200 active:scale-[0.98]">
                {isCreating ? "Processing..." : "Confirm Donation"}
              </button>
            </form>

            {donation && (
              <div className="mt-6 bg-slate-900 rounded-2xl p-4 flex items-center justify-between border border-slate-800">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Track your Donation ID</p>
                  <p className="text-lg font-mono font-bold text-white tracking-wider">{donation.uniqueId}</p>
                </div>
                <button onClick={() => copyToClipboard(donation.uniqueId)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300">
                  <Clipboard size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="px-8 pb-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Track Status</h2>
              <p className="text-slate-500 text-sm mt-1">Check the progress of your contribution</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="DON-XXXXXX"
                  value={checkId}
                  onChange={(e) => setCheckId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none"
                />
                <Search className="absolute right-4 top-4 text-slate-300" size={20} />
              </div>
              <button onClick={handleCheckStatus} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200">
                Lookup Donation
              </button>
              {checkResult && (
                <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center">
                  {checkResult === "pending" ? (
                    <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 text-center w-full">
                      <Clock size={32} className="text-amber-500 mb-2 mx-auto" />
                      <h4 className="font-bold text-amber-900">Pending Verification</h4>
                    </div>
                  ) : checkResult === "verified" ? (
                    <div className="bg-green-50 p-6 rounded-3xl border border-green-100 text-center w-full">
                      <CheckCircle size={32} className="text-green-500 mb-2 mx-auto" />
                      <h4 className="font-bold text-green-900">Payment Verified</h4>
                    </div>
                  ) : (
                    <div className="bg-red-50 p-6 rounded-3xl border border-red-100 text-center w-full">
                      <AlertCircle size={32} className="text-red-500 mb-2 mx-auto" />
                      <h4 className="font-bold text-red-900">Record Not Found</h4>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
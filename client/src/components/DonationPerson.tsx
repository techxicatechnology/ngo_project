import React, { useState, useEffect } from "react";
import { useDonation } from "../store/useDonation";
import {
  CheckCircle,
  Clock,
  XCircle,
  Edit2,
  Save,
  TrendingUp,
  Users as UsersIcon,
  Image as ImageIcon,
  FileSpreadsheet,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";

const DonationPerson = () => {
  const { getAllDonation, allDonations, updateDonation } = useDonation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [tempAmount, setTempAmount] = useState("");

  useEffect(() => {
    getAllDonation();
  }, [getAllDonation]);


   const exportToExcel = () => {
    if (!allDonations || allDonations.length === 0) return;

    const data = allDonations.map((d, index) => ({
      "S.N": index + 1,
      Name: d.name,
      "Unique ID": d.uniqueId,
      Amount: d.amount,
      "Transaction ID": d.transactionId || "---",
      Status: d.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Donations");

    XLSX.writeFile(workbook, "donations.xlsx");
  };

  const statusOptions = [
    { value: "pending", color: "bg-amber-50 text-amber-600 border-amber-100", icon: <Clock size={12} /> },
    { value: "verified", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: <CheckCircle size={12} /> },
    { value: "rejected", color: "bg-rose-50 text-rose-600 border-rose-100", icon: <XCircle size={12} /> },
  ];

  const handleStatusChange = (id, newStatus) => {
    updateDonation(id, { status: newStatus });
  };

  const saveAmount = (id) => {
    updateDonation(id, { amount: tempAmount });
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* IMAGE MODAL */}
{selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage} 
              alt="Receipt Enlarged" 
              className="max-h-[85vh] w-auto rounded-2xl shadow-2xl border-4 border-white/10"
            />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* COMPACT STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-tight">Total Collection</p>
              <h3 className="text-2xl font-black text-slate-900">
                Rs. {allDonations?.reduce((sum, d) => sum + parseInt(d.amount || 0), 0).toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-tight">Active Donors</p>
              <h3 className="text-2xl font-black text-slate-900">{allDonations?.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <UsersIcon size={24} />
            </div>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 flex items-center justify-between py-4 border-b border-slate-50">
            <h2 className="text-lg font-bold text-slate-800">Donation History</h2>
              <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-100 active:scale-95"
          >
            <FileSpreadsheet size={18} />
            Export to Excel
          </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                  <th className="px-6 py-3 border-b border-slate-100">Contributor</th>
                  <th className="px-6 py-3 border-b border-slate-100">Amount</th>
                  <th className="px-6 py-3 border-b border-slate-100">Transaction ID</th>
                  <th className="px-6 py-3 border-b border-slate-100">Screenshot</th>
                  <th className="px-6 py-3 border-b border-slate-100">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {allDonations?.map((donor) => {
                  const style = statusOptions.find((s) => s.value === donor.status);
                  return (
                    <tr key={donor.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                            {donor.name?.[0]}
                            
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 text-sm leading-tight">{donor.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{donor.uniqueId}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-3 text-sm font-bold text-slate-900">
                        {editId === donor.uniqueId ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={tempAmount}
                              onChange={(e) => setTempAmount(e.target.value)}
                              className="w-20 px-2 py-1 border border-blue-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-400"
                              autoFocus
                            />
                            <button onClick={() => saveAmount(donor.uniqueId)} className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                              <Save size={12} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group">
                            <span>Rs. {donor.amount}</span>
                            <button onClick={() => { setEditId(donor.uniqueId); setTempAmount(donor.amount); }} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-500 transition-opacity">
                              <Edit2 size={12} />
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-3">
                        <span className="text-xs font-mono font-medium text-slate-500">
                          {donor.transactionId || "---"}
                        </span>
                      </td>

                      <td className="px-6 py-3">
                        {donor.screenshot ? (
                          <button 
                            onClick={() => setSelectedImage(donor.screenshot)}
                            className="w-12 h-8 rounded border border-slate-200 overflow-hidden hover:ring-2 hover:ring-blue-400 transition-all"
                          >
                            <img src={donor.screenshot} className="w-full h-full object-cover" alt="Thumb" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">No Screenshot</span>
                        )}
                      </td>

                      <td className="px-6 py-3">
                        <div className="relative inline-flex items-center">
                          <span className={`absolute left-2.5 ${style?.color.split(" ")[1]}`}>
                            {style?.icon}
                          </span>
                          <select
                            value={donor.status}
                            onChange={(e) => handleStatusChange(donor.uniqueId, e.target.value)}
                            className={`pl-7 pr-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight border appearance-none cursor-pointer outline-none transition-all ${style?.color}`}
                          >
                            {statusOptions.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-white text-slate-900">{opt.value}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPerson;
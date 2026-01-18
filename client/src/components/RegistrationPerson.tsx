import { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, Hash, X, ZoomIn,FileSpreadsheet } from 'lucide-react';
import { useRegister } from '../store/useRegister';
import * as XLSX from 'xlsx';

const RegistrationPerson = () => {
  const { Alluser, getAllUser, currentPage, totalPages, setCurrentPage } = useRegister();
  
  // State for the enlarged image modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const exportToExcel = () => {
    if (!Alluser || Alluser.length === 0) return;

    // Map the data to a clean format for Excel
    const excelData = Alluser.map(user => ({
      "Full Name": user.fullName,
      "Unique ID": user.uniqueId,
      "Email Address": user.email,
      "Mobile Number": user.mobileNumber,
      "Registration Date": new Date(user.createdAt).toLocaleDateString('en-GB'),
      "State/Area": user.area || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registered Members");

    // Generate buffer and download
    XLSX.writeFile(workbook, `NGO_Members_List_${new Date().toLocaleDateString()}.xlsx`);
  };

  useEffect(() => {
    getAllUser(currentPage);
  }, [currentPage]); // Added currentPage dependency to trigger re-fetch on page change

  return (
    <div className="p-8 mt-[50px] bg-slate-50 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Registered Personnel
            </h2>
            <p className="text-slate-500 text-sm">
              A complete list of all verified community members.
            </p>
          </div>
          <div>
             <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-100 active:scale-95"
          >
            <FileSpreadsheet size={18} />
            Export to Excel
          </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full border-collapse">
          
        
            <thead>
              <tr className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-100">
                <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">User Identity</th>
                <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Communication</th>
                <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {Alluser?.map((user) => (
                <tr key={user._id} className="group hover:bg-slate-50/30 transition-all duration-300 cursor-default">

                  {/* User Identity Column */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      {/* Clickable Image Container */}
                      <div 
                        className="relative shrink-0 cursor-zoom-in group/img"
                        onClick={() => setSelectedImage(user.image || 'https://i.pravatar.cc/150')}
                      >
                        <img 
                          src={user.image || 'https://i.pravatar.cc/150'} 
                          alt={user.fullName} 
                          className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50 group-hover/img:ring-indigo-100 transition-all duration-300 shadow-sm"
                        />
                        {/* Hover Overlay Icon */}
                        <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover/img:opacity-100 rounded-2xl flex items-center justify-center transition-opacity">
                          <ZoomIn size={16} className="text-indigo-600" />
                        </div>
                      </div>

                      <div>
                        <div className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {user.fullName}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1 bg-slate-100/80 w-fit px-2 py-0.5 rounded-md">
                          <Hash size={10} />
                          {user.uniqueId}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Communication Column */}
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <div className="p-1.5 bg-indigo-50 rounded-lg">
                          <Mail size={14} className="text-indigo-500" />
                        </div>
                        {user.email}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                          <Phone size={14} className="text-slate-400" />
                        </div>
                        {user.mobileNumber}
                      </div>
                    </div>
                  </td>

                  {/* Date Column */}
                  <td className="px-8 py-6 text-right">
                    <div className="inline-flex items-center gap-2 text-sm text-slate-700 font-semibold bg-white border border-slate-100 shadow-sm px-4 py-2 rounded-xl group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-all">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(user.createdAt).toLocaleDateString('en-GB')}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-center items-center gap-3">
          <button 
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
          >
            Previous
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                  currentPage === i + 1 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
          >
            Next
          </button>
        </div>

        {/* End of Records Footer */}
        <div className="mt-12 flex justify-center items-center gap-3">
          <div className="h-px w-12 bg-slate-200"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
            End of Records
          </p>
          <div className="h-px w-12 bg-slate-200"></div>
        </div>
      </div>

      {/* --- IMAGE ENLARGEMENT MODAL --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-2xl w-full flex flex-col items-center">
            {/* Close Button */}
            <button 
              className="absolute -top-12 right-0 text-white hover:text-indigo-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            
            {/* Enlarged Image */}
            <img 
              src={selectedImage} 
              alt="Profile Enlarged" 
              className="w-full h-auto max-h-[80vh] object-contain rounded-3xl shadow-2xl border-4 border-white/10 animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
            
            <p className="mt-4 text-slate-400 text-sm font-medium">Click anywhere to close</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPerson;
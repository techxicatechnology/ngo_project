import React, { useEffect } from 'react';
import { Mail, Phone, Calendar, Hash } from 'lucide-react';
import { useRegister } from '../store/useRegister';

const RegistrationPerson = () => {
  const { Alluser, getAllUser, currentPage, totalPages, setCurrentPage } = useRegister();

  useEffect(() => {
    getAllUser(currentPage); // fetch first page
  }, []);

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
        </div>

        {/* Table */}
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

                  {/* User Column */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <img 
                          src={user.image || 'https://i.pravatar.cc/150'} 
                          alt={user.fullName} 
                          className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50"
                        />
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

                  {/* Contact Column */}
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

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <button 
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 hover:bg-slate-300'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="mt-8 flex justify-center items-center gap-2">
          <div className="h-px w-8 bg-slate-200"></div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
            End of Records
          </p>
          <div className="h-px w-8 bg-slate-200"></div>
        </div>

      </div>
    </div>
  );
};

export default RegistrationPerson;

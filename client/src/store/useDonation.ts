import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface DonationStore {
  donation: Donation | null;
  isCreating: boolean;
  status:string|null;
  createDonation: (data: CreateDonationPayload) => Promise<void>;
  clearDonation: () => void;
  getStatus :(data:string)=>Promise<string|null>;
}

export const useDonation = create<DonationStore>((set) => ({
  donation: null,
  isCreating: false,
  status:null,

  createDonation: async (data) => {
    set({ isCreating: true });

    try {
      const res = await axiosInstance.post("/donate/create", data);
console.log("Your data is ", res.data.data )
      set({
        donation: res.data.data,
        isCreating: false,
      });

      toast.success("Donation successful");
    } catch (error) {
      console.error("Failed to create donation", error);
      toast.error("Failed to create donation");
      set({ isCreating: false });
    }
  },

  clearDonation: () => set({ donation: null }),
getStatus:async(data)=>{
  try {
    const res = await axiosInstance.get(`/donate/getStatus/${data}`);
    console.log("Your data is ", res.data.data.status)
    set({
      status: res.data.data.status,
      isCreating: false,
    });
   
    if(res.data.success === false){
     return toast.error("Donation not found")
    }

return res.data.data.status;
  } catch (error) {
    console.error("Failed to get status", error);
    toast.error("Failed to get status");
    set({ isCreating: false });
    return null;
  }
}

}));
  
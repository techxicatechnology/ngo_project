import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface DonationStore {
  allDonations:any,
  donation: Donation | null;
  isCreating: boolean;
  status:any|null;
  createDonation: (data: CreateDonationPayload) => Promise<void>;
  clearDonation: () => void;
  getStatus :(data:string)=>Promise<string|null>;
  getAllDonation:()=>Promise<void>;
  updateDonation:(id:string,data:string)=>Promise<void>;
}

export const useDonation = create<DonationStore>((set) => ({
  donation: null,
  isCreating: false,
  status:null,
allDonations:null,
createDonation: async (data) => {
  set({ isCreating: true });

  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("amount", data.amount);
    formData.append("transactionId", data.transactionId);

    if (data.screenshot) {
      formData.append("screenshot", data.screenshot);
    }

    const res = await axiosInstance.post(
      "/donate/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );


    set({
      donation: res.data.data,
      isCreating: false,
    });

    toast.success("Donation successful");
  } catch (error) {
    toast.error("Failed to create donation");
    set({ isCreating: false });
  }
},

 clearDonation: () => set({ donation: null }),
getStatus:async(data)=>{
  try {
    const res = await axiosInstance.get(`/donate/getStatus/${data}`);
    console.log("Your data is ", res.data.data)
    set({
      status: res.data.data,
      isCreating: false,
    });
   
    if(res.data.success === false){
     return toast.error("Donation not found")
    }

return res.data.data;
  } catch (error) {
    console.error("Failed to get status", error);
    toast.error("Failed to get status");
    set({ isCreating: false });
    return null;
  }
},
getAllDonation:async()=>{
  try {
    const res = await axiosInstance.get("/donate/list")
    console.log("All donations are ",res.data.data)
    set({allDonations:res.data.data})
  } catch (error) {
    console.log("error is ",error)
  }
},
updateDonation:async(id:string,data:string)=>{
  try {
    const res = await axiosInstance.post(`/donate/updateStatus/${id}`,data)
    console.log("All donations are ",res.data.data)
    set({allDonations:res.data.data})
    toast.success("Donation updated successfully");
  } catch (error) {
    console.log("error is ",error)
    toast.error("Failed to update donation");
  }
}

}));
  
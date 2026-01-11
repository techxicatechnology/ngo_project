import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface User {
  name: string;
  uniqueId: string;
  area: string;
  photo: string;
  issueDate: string;
}

interface RegisterUserPayload {
  fullName: string;
  address: string;
  state: string;
  district: string;
  taluka: string;
  village: string;
  mobileNumber: string;
  email: string;
  dateOfBirth: string;
  profilePhoto?: File | null;
}

interface NgoCardStore {
  user: User[] | null;
  registerUser: (data: RegisterUserPayload) => Promise<void>;
  isRegistering:boolean;
}

export const useRegister = create<NgoCardStore>((set) => ({
  user: null,
  isRegistering:false,
  registerUser: async (data) => {
    set({isRegistering:true})
    try {
      // ✅ Use FormData for file upload
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as any);
        }
      });

      const res = await axiosInstance.post("/add", formData);
      console.log("Your data is ", res.data )
      const newUser: User = {
        name: res.data.data.name,
        uniqueId: res.data.data.uniqueId,
        area: res.data.data.area,
        photo: res.data.data.image, 
        issueDate: res.data.data.issueDate,
      };
      console.log("New user is ", res.data)
      set({ user: [newUser] });
    } catch (error) {
      console.error("Failed to register user", error);
    }
    finally{
      set({isRegistering:false})
    }
  },
}));

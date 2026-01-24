import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

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
  isRegistering: boolean;
  Alluser: any[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  getAllUser: (page?: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  error: Error | null;
  
}

export const useRegister = create<NgoCardStore>((set, get) => ({
  user: null,
  Alluser: [],
  totalPages: 0,
  currentPage: 1,
  itemsPerPage: 10,
  isRegistering: false,
  error:null,

  registerUser: async (data) => {
    set({ isRegistering: true });
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as any);
        }
      });

      const res = await axiosInstance.post("/add", formData);
      console.log("New user is ", res.data.data);
      toast.success("Registration successful");
      set({ user: res.data.data, error: null });
    } catch (error) {
      console.error("Failed to register user", error);
      const err = error as Error;
      toast.error(err?.response?.data?.message || "Failed to register user");
      set({ error: err });
    } finally {
      set({ isRegistering: false });
    }
  },

  // ✅ Pagination-enabled fetch
  getAllUser: async (page = 1) => {
    try {
      const { itemsPerPage } = get();
      const res = await axiosInstance.get(`/list?page=${page}&limit=${itemsPerPage}`);
      console.log("All users are ", res.data.data);
      set({
        Alluser: res.data.data,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
      });
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
    get().getAllUser(page); // fetch new page
  },
}));

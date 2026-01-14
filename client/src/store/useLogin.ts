import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


interface LoginStore{
    user : any;
    login : (email : string , password : string) => Promise<void>;
    checkAuth :()=>Promise<void>;
    logout : ()=>Promise<void>;
}


export const useLogin = create<LoginStore>((set)=>({
    user:null,
    checkAuth:async()=>{
        try {
           const res = await axiosInstance.get("/admin/check")
console.log(res.data)
set({user:res.data}) 
        } catch (error) {
            console.log("error is",error)
        }
    },
login: async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post("/admin/login", { email, password });
    console.log(res.data); // logs the response from your server
    set({ user: res.data }); // store user in Zustand
  } catch (error: any) {
    console.log("error is", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Login failed");
  }
},
logout: async () => {
  try {
    await axiosInstance.post("/admin/logout");
    set({ user: null });
  } catch (error: any) {
    console.log("error is", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Logout failed");
  }
}
}))
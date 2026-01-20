import { create } from "zustand";

interface PledgeStore {
    userName: string;
    setUserName: (userName: string) => void;
}

export const usePledge = create<PledgeStore>((set) => ({
    userName: "",
    setUserName: (userName: string) => set({ userName }),
}));
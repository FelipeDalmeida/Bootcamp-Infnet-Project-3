import { create } from "zustand";
import type { User } from "../types/types";

type StoreUser = User & { isAuthenticated: boolean, isEmailVerified:boolean };

type GlobalStore = {
  user: StoreUser;
  setUser: (user: Partial<StoreUser>) => void;
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  user: {
    isAuthenticated: false,
    isEmailVerified:false,
    nome: "",
    email: "",
    id:0,
  },
  setUser(user) {
    set({ user: { ...get().user, ...user } });
  },
}));
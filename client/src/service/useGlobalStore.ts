import { create } from "zustand";
import type { User } from "../types/types";

type StoreUser = User & { isAuthenticated: boolean };

type GlobalStore = {
  user: StoreUser;
  setUser: (user: Partial<StoreUser>) => void;
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  user: {
    isAuthenticated: false,
    nome: "",
    email: "",
  },
  setUser(user) {
    set({ user: { ...get().user, ...user } });
  },
}));
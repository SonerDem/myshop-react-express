import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  loggingOut: boolean;
  error: string;
  loadUser: (signal?: AbortSignal) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  loggingOut: false,
  error: "",

  logout: async () => {
    set({ loggingOut: true, error: "" });
    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Abmelden fehlgeschlagen.");
      }
      // Erst nach erfolgreichem Löschen der Session die Anzeige zurücksetzen.
      set({ user: null, loggingOut: false });
    } catch (error) {
      console.error("Fehler beim Logout:", error);
      set({ loggingOut: false, error: "Abmelden fehlgeschlagen. Bitte erneut versuchen." });
    }
  },

  loadUser: async (signal) => {
    set({ loading: true, error: "" });
    try {
      const response = await fetch("http://localhost:3000/api/me", {
        credentials: "include",
        ...(signal ? { signal } : {}),
      });

      if (signal?.aborted) return;

      if (response.status === 401) {
        set({ user: null, loading: false });
        return;
      }

      if (!response.ok) {
        throw new Error("Benutzer konnte nicht geladen werden.");
      }

      const data = await response.json();
      if (signal?.aborted) return;
      set({ user: data.user, loading: false });
    } catch (error) {
      if (signal?.aborted) return;
      console.error("Fehler beim Prüfen der Session:", error);
      set({ loading: false, error: "Anmeldestatus konnte nicht geprüft werden." });
    }
  },
}));

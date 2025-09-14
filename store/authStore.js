// import create from "zustand";
// import { persist } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuth, signOut } from "firebase/auth";

// const auth = getAuth();

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       setUser: (user) => set({ user }),
//       logout: async () => {
//         await signOut(auth);
//         set({ user: null });
//       },
//     }),
//     {
//       name: "auth-storage",
//       getStorage: () => AsyncStorage, // explicitly use AsyncStorage
//     }
//   )
// );

// "use client";
// import { useState, useEffect } from "react";
// import { SafeUser } from "../types";
// import { getCurrentUser } from "../actions/getCurrentUser";

// const useCurrentUser = () => {
//   const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       console.log("Fetching user...");
//       const user = await getCurrentUser();
//       console.log("Fetched user:", user);

//       if (user) {
//         const safeUser: SafeUser = {
//           ...user,
//           // createdAt: user.createdAt.toISOString(),
//           // updatedAt: user.updatedAt.toISOString(),
//           emailVerified: user.emailVerified?.toString() || null,
//         };

//         setCurrentUser(safeUser);
//         console.log("Set safe user:", safeUser);
//       } else {
//         setCurrentUser(null);
//       }
//     };

//     fetchUser();
//   }, []);

//   return currentUser;
// };

// export default useCurrentUser;

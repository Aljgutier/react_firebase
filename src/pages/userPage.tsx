import React, { useEffect, useState } from "react";
import { getUserId } from "../utils/backendTokenUserId";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const UserPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const data = await getUserId();
          setUserId(data.id);
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return <div>User ID: {userId ?? "Loading..."}</div>;
};

export default UserPage;

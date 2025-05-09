// src/utils/backendTokenUserId.tsx

import { getAuthToken } from "./getAuthToken";

// returns userId from token
import axios from "axios";
import { auth } from "../firebase-config";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserId = async (): Promise<any> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated user");
  }

  const token = await getAuthToken();

  const response = await axios.get(`${BASE_URL}/userid`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

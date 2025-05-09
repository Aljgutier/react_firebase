//utils/getAuthToken.tsx
import { auth } from "../firebase-config";

export const getAuthToken = async (): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");
  return await user.getIdToken();
};

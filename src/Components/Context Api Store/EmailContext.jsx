import { createContext, useState, useMemo } from "react";

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const value = useMemo(
    () => ({ email, setEmail, userId, setUserId, username, setUsername }),
    [email, userId, username]
  );

    
  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
};

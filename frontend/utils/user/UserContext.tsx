// User Interface for UserProvider
// Defines UserContext and functions

import { createContext, ReactNode, SetStateAction , Dispatch, useState, useEffect, useContext } from "react";
import { User } from "@/types/User";
import getUserFromLocalStorage from "./getUser";
interface UserContextProps {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps> ({
    user: null,
    setUser: () => {},
});

interface UserProviderProps {
    children: ReactNode;
  }

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const storedUser = getUserFromLocalStorage();
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      );
};

export const useUser = () => useContext(UserContext);
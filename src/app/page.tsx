"use client";
import { createContext, useState } from "react";
import { Chat } from "./components/Chat";
import Login from "./components/Login";
import { User, UserContextType } from "./lib/types";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

function ChatApp() {
  const [user, setUser] = useState<User>({} as User);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="flex flex-col justify-center h-screen w-auto mx-auto">
        <div className="self-center">
          {Object.values(user).length === 0 ? <Login /> : <Chat />}
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default ChatApp;

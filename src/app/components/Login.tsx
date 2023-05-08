"use client";
import { useContext, useState } from "react";
import { User } from "../lib/types";
import { UserContext } from "../page";

function Login() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");

  function connect(): void {
    if (!username || username?.length == 0 || !setUser) return;
    setUser({ username } as User);
  }

  function handleKeyUp(e: React.KeyboardEvent): void {
    if (e.key !== "Enter") return;
    connect();
  }

  return (
    <div className="grid grid-rows-2 gap-2">
      <div className="row-start-1">
        <div className="w-full text-center rounded-sm bg-teal-500 border-2 p-2">
          <label className="text-white w-full">Username:</label>
          <input
            autoFocus
            className="text-black px-1"
            type="text"
            value={username}
            onChange={(e) => setUsername(e?.target?.value)}
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>
      <button
        className="row-start-2 text-white rounded-sm border-2 hover:bg-teal-600 bg-teal-500"
        onClick={connect}
      >
        Login
      </button>
    </div>
  );
}

export default Login;

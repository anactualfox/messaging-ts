import { useContext, useState } from "react";
import { UserContext } from "../page";

export function MessageBox(props: { webSocket: WebSocket }) {
  const { webSocket } = props;
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  function send(e: React.KeyboardEvent): void {
    if (!message || e.key !== "Enter" || message?.length === 0) return;
    webSocket.send(
      JSON.stringify({
        message,
        username: user.username,
      })
    );
    setMessage("");
  }

  return (
    <input
      autoFocus
      className="p-2 w-full rounded-lg bg-black text-white text-right"
      type="text"
      value={message}
      onChange={(e) => setMessage(e?.target?.value)}
      onKeyUp={send}
    />
  );
}

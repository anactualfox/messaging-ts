"use client";
import { MessageBox } from "./MessageBox";
import { Message } from "../lib/types";
import { useMemo, useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "../page";
import { useWebSocket } from "../lib/hooks";

export function Chat() {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [webSocket] = useWebSocket({
    onmessage,
    onopen: logevent,
    onerror: logevent,
    onclose: logevent,
  });
  const chatContainer = useRef(null);

  function onmessage(this: WebSocket, ev: MessageEvent<any>) {
    const message: Message = JSON.parse(ev?.data);
    messages.push(message);
    setMessages([...messages]);
  }

  function logevent(this: WebSocket, e: Event) {
    // console.log(e);
  }

  function handleBubbleAlignment(otherUsername: string) {
    return user.username !== otherUsername
      ? "text-white self-start"
      : "bg-teal-300 self-end ";
  }

  useEffect(() => {
    // Keep chat scrollbar at the most recent message
    if (!chatContainer?.current) return;
    const ele: HTMLDivElement = chatContainer.current;
    ele.scrollTop = ele.scrollHeight;
  }, [messages]);

  return useMemo(
    () => (
      <>
        {!webSocket ? (
          <div className="text-white">Could not connect to websocket!</div>
        ) : (
          <>
            <div
              className="flex flex-col p-2 my-2 bg-black rounded-lg shadow-md border gap-2 h-60 max-h-60 max-w-sm w-96 overflow-auto "
              ref={chatContainer}
            >
              {messages?.map((message, id) => (
                <div
                  className={`p-2 rounded-lg border-2 h-fit w-fit break-words 
                            ${handleBubbleAlignment(message.username)}`}
                  key={id}
                  children={message.content}
                />
              ))}
            </div>
            <div className="max-w-sm rounded-lg border-2">
              <MessageBox webSocket={webSocket} />
            </div>
          </>
        )}
      </>
    ),
    [messages, webSocket]
  );
}

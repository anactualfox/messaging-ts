'use client';
import { useState, useEffect } from "react";

interface webSocketCallbacks {
  onmessage: (this: WebSocket, ev: MessageEvent<any>) => void;
  onopen: (this: WebSocket, ev: Event) => void;
  onclose: (this: WebSocket, ev: Event) => void;
  onerror: (this: WebSocket, ev: Event) => void;
}

export function useWebSocket (callbacks: webSocketCallbacks) {
  const [webSocket, setWebSocket] = useState<WebSocket>();

  useEffect(() => {
    if (!webSocket) {
      const ws = new WebSocket("ws://localhost:8080");
      ws.onmessage = callbacks.onmessage;
      ws.onopen = callbacks.onclose;
      ws.onclose = callbacks.onclose;
      ws.onerror = callbacks.onerror;
      setWebSocket(ws);
    }
  }, [webSocket]);
  return [webSocket];
};

import { WebSocketServer, WebSocket } from "ws";

type User = {
  username: string;
  userId: string;
};

type ClientMessage = {
  username: string;
  message: string;
};

type ServerMessage = {
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
};

/**
 * Keyed by username, usernames are considered unique
 */
const users = new Map<string, User>();

/**
 * Echoes messages back to all connected clients
 */
function server() {
  const host = "localhost";
  const port = 8080;
  const wss = new WebSocketServer({ host, port });
  console.log("Starting up server: ", wss.options.host, wss.options.port);
  wss.on("connection", function connection(ws: WebSocket) {
    ws.onerror = console.error;
    ws.onmessage = function message(data) {
      const message: ClientMessage = JSON.parse(data.data.toString());
      let user = users.get(message.username);
      if (!user) {
        user = { userId: users.size.toString(), username: message.username };
        users.set(message.username, user);
      }
      const serverMessage: ServerMessage = {
        userId: user.userId,
        username: user.username,
        content: message.message,
        timestamp: new Date(),
      } as ServerMessage;

      for (const client of wss.clients) {
        client.send(JSON.stringify(serverMessage));
      }
    };
  });
}

server();

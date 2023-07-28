import { io } from "socket.io-client";

export const socket = io("https://api.leparse.tech", {
  path: "/loyalty/ws",
  autoConnect: false,
  reconnection: true,
  auth: (cb) => {
    cb({
      token: localStorage.getItem("$leparse-loyalty-token"),
      store_id: localStorage.getItem("$leparse-loyalty-store-id"),
    });
  },
});

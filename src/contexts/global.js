import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { socket } from "../services/socket";

const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [intervalToFetch, setIntervalToFetch] = useState();

  const [tickets, setTickets] = useState([]);

  function login(username = "igoraugusto", password = "marina2207") {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.post("/auth/login", {
          username,
          password,
        });

        setUser(data.user);
        setToken(data.token);

        localStorage.setItem(
          "$leparse-loyalty-user",
          JSON.stringify(data.user)
        );
        localStorage.setItem("$leparse-loyalty-token", data.token);

        resolve(data.user);
      } catch (error) {
        reject(error);
      }
    });
  }

  function logout() {
    setUser({});
    setToken("");
    localStorage.removeItem("$leparse-loyalty-user");
    localStorage.removeItem("$leparse-loyalty-token");
    socket.disconnect();
  }

  function connectToStore() {
    socket.connect();
    setStoreId(localStorage.getItem("$leparse-loyalty-store-id"));
    registerListeners();
    socket.emit("tickets-req");
    let interval = setInterval(() => {
      socket.emit("tickets-req");
    }, 5000);
    setIntervalToFetch(interval);
  }

  function disconnectFromStore() {
    socket.disconnect();
  }

  function registerListeners() {
    socket.on("tickets-res", (tickets) => {
      setTickets(tickets);
    });

    socket.on("success", (success) => {
      let toastMessage = success.message || "Sucesso!";
      let toastType;

      switch (success.type) {
        case "voucher_applied":
          toastType = "success";
          navigate("/tickets");
          break;
        default:
          toastType = "success";
          break;
      }

      toast(toastMessage, {
        type: toastType,
      });
    });

    socket.on("error", (error) => {
      let toastMessage =
        error.message || "Erro desconhecido! Contate um administrador.";
      let toastType;

      switch (error.type) {
        case "voucher_not_found":
          toastType = "error";
          break;
        case "invalid_character_in_voucher":
          toastType = "warn";
          break;
        case "voucher_not_active":
          toastType = "warning";
          break;
        default:
          toastType = "error";
          break;
      }

      toast(toastMessage, {
        type: toastType,
      });
    });
  }

  function unregisterListeners() {
    socket.removeAllListeners();
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalToFetch);
      unregisterListeners();
      disconnectFromStore();
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        login,
        logout,
        user,
        token,
        socket,
        storeId,
        connectToStore,
        setIntervalToFetch,
        registerListeners,
        tickets,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export function useGlobal() {
  const context = useContext(GlobalContext);
  return context;
}

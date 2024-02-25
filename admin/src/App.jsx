import Navbar from "./MainLayout/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import Login from "./Login/Login";
import { socket } from "./socket";
import { useEffect } from "react";

export default function App() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chat:send", (msg, user) => {
      console.log(`${user} send : ${msg}`);
    });

    return () => {
      socket.off("chat:send");
    };
  }, []);
  return (
    <>
      <div id="main-layout">
        <h2 onClick={() => navigate("/")}>Admin Page</h2>
        <Navbar />
      </div>
      {auth !== null ? <Outlet /> : <Login />}
      <ToastContainer autoClose={700} />
    </>
  );
}

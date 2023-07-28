import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, LazyMotion, domMax } from "framer-motion";

import GlobalProvider from "./contexts/global";

import Login from "./pages/Login";
import Voucher from "./pages/Voucher";
import Tickets from "./pages/Tickets";
import ChooseStore from "./pages/ChooseStore";

const AnimatedRoutes = () => {
  return (
    <LazyMotion features={domMax}>
      <AnimatePresence mode="wait">
        {/* <Navigate to="/login" replace /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/choose-store" element={<ChooseStore />} />
          <Route path="/voucher" element={<Voucher />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AnimatePresence>
    </LazyMotion>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <AnimatedRoutes />
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default Router;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Voucher from "./pages/Voucher";
import Tickets from "./pages/Tickets";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

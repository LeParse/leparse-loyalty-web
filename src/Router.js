import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Voucher from "./pages/Voucher";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/voucher" element={<Voucher />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Invoices from "./components/Invoices/Invoices_Main/Invoices";
import Sellers from "./components/Sellers/Sellers_Main/Sellers";
import Customers from "./components/Customers/Customers_Main/Customers";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="appDiv">
      <Header />
      <Routes>
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </div>
  );
}

export default App;

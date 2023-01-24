import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Invoices from "./components/Invoices/Invoices_Main/Invoices";
import Sellers from "./components/Sellers/Sellers_Main/Sellers";
import Customers from "./components/Customers/Customers_Main/Customers";
import Header from "./components/Header/Header";

function App() {
  const [customers, setCustomers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchCustomers = () => {
    fetch("https://63ce642b6d27349c2b6c72c5.mockapi.io/customers")
      .then((res) => res.json())
      .then(
        (result) => {
          setCustomers(result);
          setIsLoaded(true);
          setSelectedIds([]);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  };

  const fetchSellers = () => {
    fetch("https://63ce9ae9fdfe2764c726a809.mockapi.io/sellers")
      .then((res) => res.json())
      .then(
        (result) => {
          setSellers(result);
          setIsLoaded(true);
          setSelectedIds([]);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    fetchCustomers();
    fetchSellers();
  }, []);

  return (
    <div className="appDiv">
      <Header />
      <Routes>
        <Route path="/invoices" element={<Invoices />} />
        <Route
          path="/sellers"
          element={
            <Sellers
              sellers={sellers}
              error={error}
              isLoaded={isLoaded}
              fetchSellers={fetchSellers}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          }
        />
        <Route
          path="/customers"
          element={
            <Customers
              customers={customers}
              error={error}
              isLoaded={isLoaded}
              fetchCustomers={fetchCustomers}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

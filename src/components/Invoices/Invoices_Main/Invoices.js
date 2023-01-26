import React, { useState, useEffect } from "react";
import styles from "../Invoices_Main/invoices.module.css";
import AddInvoices from "../Add_Invoices/AddInvoices";
import EditInvoices from "../Edit_Invoices/EditInvoices";
import { ClipLoader } from "react-spinners";
import DeleteInvoices from "../DeleteInvoices/DeleteInvoices";
import { Link, Route, Routes } from "react-router-dom";

const Invoices = (props) => {
  const [notificationsDeleteInvoices, setNotificationsDeleteInvoices] =
    useState(false);

  const [openInvoicesAdd, setOpenInvoicesAdd] = useState(false);
  const [openDeleteInvoices, setOpenDeleteInvoices] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledDelete, setIsDisabledDelete] = useState(true);

  const [editInvoicesData, setInvoicesData] = useState([]);

  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    setLoadingApp(true);
    setTimeout(() => {
      setLoadingApp(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (props.selectedIds.length === 0) {
      setIsDisabled(props.selectedIds.length === 0);
      setIsDisabledDelete(props.selectedIds.length === 0);
    } else if (props.selectedIds.length === 1) {
      setIsDisabled(props.selectedIds.length <= 0);
      setIsDisabledDelete(props.selectedIds.length <= 0);
    } else if (props.selectedIds.length === 2) {
      setIsDisabled(props.selectedIds.length !== 1);
    }
  }, [props.selectedIds]);

  const deleteRowInvoices = () => {
    if (props.selectedIds.length >= 1) {
      for (let i = 0; i < props.selectedIds.length; i++) {
        fetch(
          `https://63ce642b6d27349c2b6c72c5.mockapi.io/invoice/${props.selectedIds[i]}`,
          {
            method: "DELETE",
          }
        );
      }
    }
    setNotificationsDeleteInvoices(true);
    setTimeout(() => {
      setNotificationsDeleteInvoices(false);
      props.fetchInvoices();
      setOpenDeleteInvoices(false);
    }, 1000);
  };

  if (props.error) {
    return <div>Error: {props.error.message}</div>;
  } else if (!props.isLoaded) {
    return;
  } else {
    return (
      <div className={styles.head}>
        <div className={styles.invoices}>INVOICES</div>
        <div className={styles.main_invoices}>
          <div className={styles.mainDiv_buttons}>
            <div className={styles.icons}>
              <div
                className={styles.add}
                onClick={() => {
                  setOpenInvoicesAdd(true);
                }}
              >
                <img src="./assets/plus.png" alt="" />
              </div>
              <Link
                to={`/invoices/${props.selectedIds}`}
                className={`${styles.edit} ${
                  isDisabled ? styles.disabled : ""
                }`}
              >
                <div
                  className={`${styles.edit} ${
                    isDisabled ? styles.disabled : ""
                  }`}
                >
                  <img src="./assets/pen.png" alt="" />
                </div>
              </Link>
              <div
                className={`${styles.delete} ${
                  isDisabledDelete ? styles.disabled : ""
                }`}
                onClick={() => {
                  setOpenDeleteInvoices(true);
                }}
              >
                <img src="./assets/close.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Seller</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          {loadingApp ? (
            <ClipLoader
              color={"#289944"}
              loading={loadingApp}
              cssOverride={{ position: "absolute", top: "40%", left: "51.5%" }}
            />
          ) : (
            <tbody className={styles.tbody}>
              {props.invoices.map((item) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() => {
                      if (props.selectedIds.includes(item.id)) {
                        props.setSelectedIds(
                          props.selectedIds.filter((id) => id !== item.id)
                        );
                      } else {
                        setInvoicesData(item);
                        props.setSelectedIds([...props.selectedIds, item.id]);
                      }
                    }}
                    className={
                      props.selectedIds.includes(item.id)
                        ? styles.selectedRow
                        : ""
                    }
                  >
                    <td>{item.sellerName}</td>
                    <td>{item.customerName}</td>
                    <td>{item.date}</td>
                    <td>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(item.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {openDeleteInvoices && (
          <DeleteInvoices
            deleteRowInvoices={deleteRowInvoices}
            setOpenDeleteInvoices={setOpenDeleteInvoices}
            invoices={props.invoices}
            setSelectedIds={props.setSelectedIds}
            setNotificationsDeleteInvoices={setNotificationsDeleteInvoices}
            notificationsDeleteInvoices={notificationsDeleteInvoices}
          />
        )}
        {openInvoicesAdd && (
          <AddInvoices
            closeInvoicesModal={setOpenInvoicesAdd}
            sellers={props.sellers}
            customers={props.customers}
            fetchInvoices={props.fetchInvoices}
          />
        )}

        <Routes>
          <Route
            path="/:id"
            element={
              <EditInvoices
                editInvoicesData={editInvoicesData}
                fetchInvoices={props.fetchInvoices}
                sellers={props.sellers}
                customers={props.customers}
                setSelectedIds={props.setSelectedIds}
              />
            }
          />
        </Routes>
      </div>
    );
  }
};

export default Invoices;

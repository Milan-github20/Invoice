import React, { useState, useEffect } from "react";
import styles from "../Invoices_Main/invoices.module.css";
import AddInvoices from "../Add_Invoices/AddInvoices";
import EditInvoices from "../Edit_Invoices/EditInvoices";
import { ClipLoader } from "react-spinners";

const Invoices = () => {
  const [openInvoicesAdd, setOpenInvoicesAdd] = useState(false);
  const [openInvoicesEdit, setOpenInvoicesEdit] = useState(false);

  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledDelete, setIsDisabledDelete] = useState(true);

  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    setLoadingApp(true);
    setTimeout(() => {
      setLoadingApp(false);
    }, 1000);
  }, []);

  const fetchInvoices = () => {
    fetch("https://63ce642b6d27349c2b6c72c5.mockapi.io/invoice")
      .then((res) => res.json())
      .then(
        (result) => {
          setInvoices(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    if (selectedIds.length === 0) {
      setIsDisabled(selectedIds.length === 0);
      setIsDisabledDelete(selectedIds.length === 0);
    } else if (selectedIds.length === 1) {
      setIsDisabled(selectedIds.length <= 0);
      setIsDisabledDelete(selectedIds.length <= 0);
    } else if (selectedIds.length === 2) {
      setIsDisabled(selectedIds.length !== 1);
    }
  }, [selectedIds]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
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
              <div
                className={`${styles.edit} ${
                  isDisabled ? styles.disabled : ""
                }`}
                onClick={() => {
                  setOpenInvoicesEdit(true);
                }}
              >
                <img src="./assets/pen.png" alt="" />
              </div>
              <div
                className={`${styles.delete} ${
                  isDisabledDelete ? styles.disabled : ""
                }`}
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
              {invoices.map((item) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() => {
                      if (selectedIds.includes(item.id)) {
                        setSelectedIds(
                          selectedIds.filter((id) => id !== item.id)
                        );
                      } else {
                        setSelectedIds([...selectedIds, item.id]);
                      }
                    }}
                    className={
                      selectedIds.includes(item.id) ? styles.selectedRow : ""
                    }
                  >
                    <td>{item.sellerName}</td>
                    <td>{item.customerName}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {openInvoicesAdd && (
          <AddInvoices closeInvoicesModal={setOpenInvoicesAdd} />
        )}
        {openInvoicesEdit && (
          <EditInvoices closeInvoicesModalEdit={setOpenInvoicesEdit} />
        )}
      </div>
    );
  }
};

export default Invoices;

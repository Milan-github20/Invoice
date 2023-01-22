import React, { useState } from "react";
import styles from "../Invoices_Main/invoices.module.css";
import AddInvoices from "../Add_Invoices/AddInvoices";
import EditInvoices from "../Edit_Invoices/EditInvoices";

const Invoices = () => {
  const [openInvoicesAdd, setOpenInvoicesAdd] = useState(false);
  const [openInvoicesEdit, setOpenInvoicesEdit] = useState(false);

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
              className={styles.edit}
              onClick={() => {
                setOpenInvoicesEdit(true);
              }}
            >
              <img src="./assets/pen.png" alt="" />
            </div>
            <div className={styles.delete}>
              <img src="./assets/close.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {openInvoicesAdd && (
        <AddInvoices closeInvoicesModal={setOpenInvoicesAdd} />
      )}
      {openInvoicesEdit && (
        <EditInvoices closeInvoicesModalEdit={setOpenInvoicesEdit} />
      )}
    </div>
  );
};

export default Invoices;

import React, { useState } from "react";
import styles from "../Customers_Main/customers.module.css";
import AddCustomers from "../Add_Customers/AddCustomers";
import EditCustomers from "../Edit_Customers/EditCustomers";

const Customers = () => {
  const [openCustomersAdd, setOpenCustomersAdd] = useState(false);
  const [openCustomersEdit, setOpenCustomersEdit] = useState(false);

  return (
    <div className={styles.head}>
      <div className={styles.customers}>CUSTOMERS</div>
      <div className={styles.main_Customers}>
        <div className={styles.mainDiv_buttons}>
          <div className={styles.icons}>
            <div
              className={styles.add}
              onClick={() => {
                setOpenCustomersAdd(true);
              }}
            >
              <img src="./assets/plus.png" alt="" />
            </div>
            <div
              className={styles.edit}
              onClick={() => {
                setOpenCustomersEdit(true);
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
      {openCustomersAdd && (
        <AddCustomers closeCustomersModal={setOpenCustomersAdd} />
      )}
      {openCustomersEdit && (
        <EditCustomers closeCustomersModalEdit={setOpenCustomersEdit} />
      )}
    </div>
  );
};

export default Customers;

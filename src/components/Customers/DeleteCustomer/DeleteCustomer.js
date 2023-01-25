import React from "react";
import styles from "./deleteCustomer.module.css";
import ReactDOM from "react-dom";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const DeleteCustomerModal = (props) => {
  return (
    <div className={styles.mainDiv}>
      <h3>Are you sure ?</h3>
      <div className={styles.buttons}>
        <button
          className={styles.yes}
          onClick={(e) => {
            props.deleteRowCustomers(props.customers.id, e);
          }}
        >
          Yes
        </button>
        <button
          className={styles.no}
          onClick={() => {
            props.setOpenDeleteCustomer(false);
            props.setSelectedIds([]);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

const DeleteCustomers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <DeleteCustomerModal
          deleteRowCustomers={props.deleteRowCustomers}
          setOpenDeleteCustomer={props.setOpenDeleteCustomer}
          customers={props.customers}
          setSelectedIds={props.setSelectedIds}
        ></DeleteCustomerModal>,

        document.getElementById("modal")
      )}
    </>
  );
};

export default DeleteCustomers;

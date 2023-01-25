import React from "react";
import styles from "./deleteInvoices.module.css";
import ReactDOM from "react-dom";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const DeleteInvoicesModal = (props) => {
  return (
    <div className={styles.mainDiv}>
      <h3>Are you sure ?</h3>
      <div className={styles.buttons}>
        <button
          className={styles.yes}
          onClick={(e) => {
            props.deleteRowInvoices(props.invoices.id, e);
          }}
        >
          Yes
        </button>
        <button
          className={styles.no}
          onClick={() => {
            props.setOpenDeleteInvoices(false);
            props.setSelectedIds([]);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

const DeleteInvoices = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <DeleteInvoicesModal
          deleteRowInvoices={props.deleteRowInvoices}
          setOpenDeleteInvoices={props.setOpenDeleteInvoices}
          invoices={props.invoices}
          setSelectedIds={props.setSelectedIds}
        ></DeleteInvoicesModal>,

        document.getElementById("modal")
      )}
    </>
  );
};

export default DeleteInvoices;

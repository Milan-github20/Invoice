import React from "react";
import styles from "./deleteInvoices.module.css";
import ReactDOM from "react-dom";
import { NotificationsDeleteInvoice } from "../NotificationsInvoices/NotificationsInvoices";

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
            props.setNotificationsDeleteInvoices(true);
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
      {props.notificationsDeleteInvoices && (
        <NotificationsDeleteInvoice
          setNotificationsDeleteInvoices={props.setNotificationsDeleteInvoices}
        />
      )}
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
          setNotificationsDeleteInvoices={props.setNotificationsDeleteInvoices}
          notificationsDeleteInvoices={props.notificationsDeleteInvoices}
        ></DeleteInvoicesModal>,

        document.getElementById("modal")
      )}
    </>
  );
};

export default DeleteInvoices;

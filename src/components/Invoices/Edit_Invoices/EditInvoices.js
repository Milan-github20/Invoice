import React from "react";
import styles from "../Edit_Invoices/editInvoices.module.css";
import ReactDOM from "react-dom";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditInvoices = (props) => {
  return (
    <div className={styles.modal}>
      <form>
        <div className={styles.header}>
          <h2>Edit an invoice</h2>
          <img
            src="./assets/close.png"
            alt=""
            onClick={() => {
              props.closeInvoicesModalEdit(false);
            }}
          />
        </div>

        <div className={styles.form}>
          <h4>Seller</h4>
          <input />
          <h4>Customer</h4>
          <input />
          <h4>Date</h4>
          <input />
          <h4>Amount</h4>
          <input />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeInvoicesModalEdit(false);
            }}
          >
            Discard
          </button>
          <button className={styles.save}>Save</button>
        </div>
      </form>
    </div>
  );
};

const EditInvoices = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalEditInvoices
          closeInvoicesModalEdit={props.closeInvoicesModalEdit}
        ></ModalEditInvoices>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default EditInvoices;

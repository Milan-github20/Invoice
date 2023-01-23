import React from "react";
import styles from "../Add_Invoices/addInvoices.module.css";
import ReactDOM from "react-dom";
import { format } from "date-fns";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalAddInvoices = (props) => {
  return (
    <div className={styles.modal}>
      <form>
        <div className={styles.header}>
          <h2>Create an invoice</h2>
          <img
            src="./assets/close.png"
            alt=""
            onClick={() => {
              props.closeInvoicesModal(false);
            }}
          />
        </div>

        <div className={styles.form}>
          <h4>Seller</h4>
          <select />
          <h4>Customer</h4>
          <select />
          <h4>Date</h4>
          <input type="date" max={format(new Date(), "yyyy-MM-dd")} />
          <h4>Amount</h4>
          <input />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeInvoicesModal(false);
            }}
          >
            Discard
          </button>
          <button className={styles.create}>Create</button>
        </div>
      </form>
    </div>
  );
};

const AddInvoices = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalAddInvoices
          closeInvoicesModal={props.closeInvoicesModal}
        ></ModalAddInvoices>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default AddInvoices;

import React from "react";
import styles from "../Add_Customers/addCustomers.module.css";
import ReactDOM from "react-dom";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalAddCustomers = (props) => {
  return (
    <div className={styles.modal}>
      <form>
        <div className={styles.header}>
          <h2>Create an customer</h2>
          <img
            src="./assets/close.png"
            alt=""
            onClick={() => {
              props.closeCustomersModal(false);
            }}
          />
        </div>

        <div className={styles.form}>
          <h4>Seller</h4>
          <select />
          <h4>Customer</h4>
          <select />
          <h4>Date</h4>
          <input />
          <h4>Amount</h4>
          <input />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeCustomersModal(false);
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

const AddCustomers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalAddCustomers
          closeCustomersModal={props.closeCustomersModal}
        ></ModalAddCustomers>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default AddCustomers;

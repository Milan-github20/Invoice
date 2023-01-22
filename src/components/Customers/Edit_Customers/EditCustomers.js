import React from "react";
import styles from "../Edit_Customers/editCustomers.module.css";
import ReactDOM from "react-dom";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditCustomers = (props) => {
  return (
    <div className={styles.modal}>
      <form>
        <div className={styles.header}>
          <h2>Edit an customer</h2>
          <img
            src="./assets/close.png"
            alt=""
            onClick={() => {
              props.closeCustomersModalEdit(false);
            }}
          />
        </div>

        <div className={styles.form}>
          <h4>Name</h4>
          <input />
          <h4>Surname</h4>
          <input />
          <h4>Address</h4>
          <input />
          <h4>Age</h4>
          <input />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeCustomersModalEdit(false);
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

const EditCustomers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalEditCustomers
          closeCustomersModalEdit={props.closeCustomersModalEdit}
        ></ModalEditCustomers>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default EditCustomers;

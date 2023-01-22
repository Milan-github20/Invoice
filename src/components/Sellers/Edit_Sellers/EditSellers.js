import React from "react";
import styles from "../Edit_Sellers/editSellers.module.css";
import ReactDOM from "react-dom";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditSellers = (props) => {
  return (
    <div className={styles.modal}>
      <form>
        <div className={styles.header}>
          <h2>Edit an seller</h2>
          <img
            src="./assets/close.png"
            alt=""
            onClick={() => {
              props.closeSellersModalEdit(false);
            }}
          />
        </div>

        <div className={styles.form}>
          <h4>Company</h4>
          <input />
          <h4>Company address</h4>
          <input />
          <h4>Active</h4>
          <input />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeSellersModalEdit(false);
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

const EditSellers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalEditSellers
          closeSellersModalEdit={props.closeSellersModalEdit}
        ></ModalEditSellers>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default EditSellers;

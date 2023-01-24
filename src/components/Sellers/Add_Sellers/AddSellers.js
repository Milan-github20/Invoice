import React, { useRef } from "react";
import styles from "../Add_Sellers/addSellers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalAddSellers = (props) => {
  const companyNameRefSellers = useRef();
  const hqAddressRefSellers = useRef();
  const isActiveRefSellers = useRef();

  const submitAddSellers = (e) => {
    e.preventDefault();

    axios
      .post("https://63ce9ae9fdfe2764c726a809.mockapi.io/sellers", {
        companyName: companyNameRefSellers.current.value,
        hqAddress: hqAddressRefSellers.current.value,
        isActive: isActiveRefSellers.current.value,
      })
      .then(() => {
        alert("DA");
        props.closeSellersModal(false);
        props.fetchSellers();
      });
  };

  const handlekeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitAddSellers(event);
    }
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={(e) => submitAddSellers(e)} onKeyDown={handlekeydown}>
        <div className={styles.header}>
          <h2>Create an seller</h2>
          <img
            src="./assets/close.png"
            alt=""
            onClick={() => {
              props.closeSellersModal(false);
            }}
          />
        </div>

        <div className={styles.form}>
          <h4>Company</h4>
          <input ref={companyNameRefSellers} />
          <h4>Company address</h4>
          <input ref={hqAddressRefSellers} />
          <h4>Active</h4>
          <select ref={isActiveRefSellers}>
            <option>Active</option>;<option>No active</option>;
          </select>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeSellersModal(false);
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

const AddSellers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalAddSellers
          closeSellersModal={props.closeSellersModal}
          fetchSellers={props.fetchSellers}
        ></ModalAddSellers>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default AddSellers;

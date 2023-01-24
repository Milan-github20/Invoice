import React, { useRef } from "react";
import styles from "../Edit_Sellers/editSellers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditSellers = (props) => {
  const companyNameRefSellers = useRef();
  const hqAddressRefSellers = useRef();
  const isActiveRefSellers = useRef();

  const submitEditSellers = (e) => {
    e.preventDefault();

    axios
      .put(
        `https://63ce9ae9fdfe2764c726a809.mockapi.io/sellers/${props.editSellersData.id}`,
        {
          companyName: companyNameRefSellers.current.value,
          hqAddress: hqAddressRefSellers.current.value,
          isActive: isActiveRefSellers.current.value,
        }
      )
      .then(
        alert("daa"),
        props.closeSellersModalEdit(false),
        props.fetchSellers()
      );
  };

  const handlekeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitEditSellers(event);
    }
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={submitEditSellers} onKeyDown={handlekeydown}>
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
          <input
            ref={companyNameRefSellers}
            defaultValue={props.editSellersData.companyName}
          />
          <h4>Company address</h4>
          <input
            ref={hqAddressRefSellers}
            defaultValue={props.editSellersData.hqAddress}
          />
          <h4>Active</h4>
          <select
            ref={isActiveRefSellers}
            defaultValue={props.editSellersData.isActive}
          >
            <option>Active</option>
            <option>No Active</option>
          </select>
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
          editSellersData={props.editSellersData}
          fetchSellers={props.fetchSellers}
        ></ModalEditSellers>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default EditSellers;

import React, { useState } from "react";
import styles from "../Edit_Sellers/editSellers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditSellers = (props) => {
  const [company, setCompany] = useState(props.editSellersData.companyName);
  const [companyAddress, setCompanyAddress] = useState(
    props.editSellersData.hqAddress
  );
  const [active, setActive] = useState(props.editSellersData.isActive);

  const submitEditSellers = (e) => {
    e.preventDefault();

    axios
      .put(
        `https://63ce9ae9fdfe2764c726a809.mockapi.io/sellers/${props.editSellersData.id}`,
        {
          companyName: company,
          hqAddress: companyAddress,
          isActive: active,
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
            onChange={(e) => setCompany(e.target.value)}
            defaultValue={company}
          />
          <h4>Company address</h4>
          <input
            onChange={(e) => setCompanyAddress(e.target.value)}
            defaultValue={companyAddress}
          />
          <h4>Active</h4>
          <select
            onChange={(e) => setActive(e.target.value)}
            defaultValue={active}
          >
            <option>Active</option>
            <option>No active</option>
          </select>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeSellersModalEdit(false);
              props.setSelectedIds([]);
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
          selectedIds={props.selectedIds}
          isDisabled={props.isDisabled}
          setSelectedIds={props.setSelectedIds}
        ></ModalEditSellers>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default EditSellers;

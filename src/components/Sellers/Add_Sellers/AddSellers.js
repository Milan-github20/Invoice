import React, { useRef, useState } from "react";
import styles from "../Add_Sellers/addSellers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  NotificationsAddSubmit,
  NotificationsCompany,
  NotificationsCompanyAddress,
} from "../NotificationsSellers/NotificationsSellers";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalAddSellers = (props) => {
  const [notificationsCompany, setNotificationsCompany] = useState(false);
  const [notificationsCompanyAddress, setNotificationsCompanyAddress] =
    useState(false);
  const [notificationsAddSubmit, setNotificationsAddSubmit] = useState(false);

  const companyNameRefSellers = useRef();
  const hqAddressRefSellers = useRef();
  const isActiveRefSellers = useRef();

  const submitAddSellers = (e) => {
    e.preventDefault();

    if (companyNameRefSellers.current.value.trim() === "") {
      setNotificationsCompany(true);
      setTimeout(() => {
        setNotificationsCompany(false);
      }, 1500);
      return;
    }

    if (hqAddressRefSellers.current.value.trim() === "") {
      setNotificationsCompanyAddress(true);
      setTimeout(() => {
        setNotificationsCompanyAddress(false);
      }, 1500);
      return;
    }

    axios
      .post("https://63ce9ae9fdfe2764c726a809.mockapi.io/sellers", {
        companyName: companyNameRefSellers.current.value,
        hqAddress: hqAddressRefSellers.current.value,
        isActive: isActiveRefSellers.current.value,
      })
      .then(() => {
        setNotificationsAddSubmit(true);
        setTimeout(() => {
          setNotificationsAddSubmit(false);
          props.closeSellersModal(false);
          props.fetchSellers();
        }, 1000);
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

      {notificationsCompany && (
        <NotificationsCompany
          setNotificationsCompany={setNotificationsCompany}
        />
      )}

      {notificationsCompanyAddress && (
        <NotificationsCompanyAddress
          setNotificationsCompanyAddress={setNotificationsCompanyAddress}
        />
      )}

      {notificationsAddSubmit && (
        <NotificationsAddSubmit
          setNotificationsAddSubmit={setNotificationsAddSubmit}
        />
      )}
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

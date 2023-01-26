import React, { useState } from "react";
import styles from "../Edit_Sellers/editSellers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  NotificationsAddSubmit,
  NotificationsCompany,
  NotificationsCompanyAddress,
} from "../NotificationsSellers/NotificationsSellers";
import { Link, useNavigate } from "react-router-dom";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditSellers = (props) => {
  const navigate = useNavigate();

  const [notificationsCompany, setNotificationsCompany] = useState(false);
  const [notificationsCompanyAddress, setNotificationsCompanyAddress] =
    useState(false);
  const [notificationsAddSubmit, setNotificationsAddSubmit] = useState(false);

  const [company, setCompany] = useState(props.editSellersData.companyName);
  const [companyAddress, setCompanyAddress] = useState(
    props.editSellersData.hqAddress
  );
  const [active, setActive] = useState(props.editSellersData.isActive);

  const submitEditSellers = (e) => {
    e.preventDefault();

    if (company === "") {
      setNotificationsCompany(true);
      setTimeout(() => {
        setNotificationsCompany(false);
      }, 1500);
      return;
    }

    if (companyAddress === "") {
      setNotificationsCompanyAddress(true);
      setTimeout(() => {
        setNotificationsCompanyAddress(false);
      }, 1500);
      return;
    }

    axios
      .put(
        `https://63ce9ae9fdfe2764c726a809.mockapi.io/sellers/${props.editSellersData.id}`,
        {
          companyName: company,
          hqAddress: companyAddress,
          isActive: active,
        }
      )
      .then(() => {
        setNotificationsAddSubmit(true);
        setTimeout(() => {
          setNotificationsAddSubmit(false);
          navigate("/sellers");
          props.fetchSellers();
        }, 1000);
      });
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
          <Link to={`/sellers`}>
            <img
              src="../assets/close.png"
              alt=""
              onClick={() => {
                props.setSelectedIds([]);
              }}
            />
          </Link>
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
          <Link to={`/sellers`}>
            <button
              className={styles.discard}
              onClick={() => {
                props.setSelectedIds([]);
              }}
            >
              Discard
            </button>
          </Link>
          <button className={styles.save}>Save</button>
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

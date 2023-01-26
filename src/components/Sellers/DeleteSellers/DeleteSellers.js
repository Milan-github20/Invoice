import React from "react";
import styles from "./deleteSellers.module.css";
import ReactDOM from "react-dom";
import {
  NotificationsDeleteSeller,
  NotificationsDeleteSellerError,
} from "../NotificationsSellers/NotificationsSellers";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const DeleteSellersModal = (props) => {
  return (
    <div className={styles.mainDiv}>
      <h3>Are you sure ?</h3>
      <div className={styles.buttons}>
        <button
          className={styles.yes}
          onClick={(e) => {
            props.deleteRowSellers(props.sellers.id, e);
          }}
        >
          Yes
        </button>
        <button
          className={styles.no}
          onClick={() => {
            props.setOpenDeleteSeller(false);
            props.setSelectedIds([]);
          }}
        >
          No
        </button>
      </div>
      {props.notificationsDeleteSellers && (
        <NotificationsDeleteSeller
          setNotificationsDeleteSellers={props.setNotificationsDeleteSellers}
        />
      )}

      {props.notificationsDeleteSellersError && (
        <NotificationsDeleteSellerError
          setNotificationsDeleteSellersError={
            props.setNotificationsDeleteSellersError
          }
        />
      )}
    </div>
  );
};

const DeleteSellers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <DeleteSellersModal
          sellers={props.sellers}
          setOpenDeleteSeller={props.setOpenDeleteSeller}
          deleteRowSellers={props.deleteRowSellers}
          setSelectedIds={props.setSelectedIds}
          setNotificationsDeleteSellers={props.setNotificationsDeleteSellers}
          notificationsDeleteSellers={props.notificationsDeleteSellers}
          notificationsDeleteSellersError={
            props.notificationsDeleteSellersError
          }
          setNotificationsDeleteSellersError={
            props.setNotificationsDeleteSellersError
          }
        ></DeleteSellersModal>,

        document.getElementById("modal")
      )}
    </>
  );
};

export default DeleteSellers;

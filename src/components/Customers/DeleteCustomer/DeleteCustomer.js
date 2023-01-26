import React from "react";
import styles from "./deleteCustomer.module.css";
import ReactDOM from "react-dom";
import {
  NotificationsDeleteCustomers,
  NotificationsDeleteCustomersError,
} from "../NotificationsCustomers/NotificationsCustomers";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const DeleteCustomerModal = (props) => {
  return (
    <div className={styles.mainDiv}>
      <h3>Are you sure ?</h3>
      <div className={styles.buttons}>
        <button
          className={styles.yes}
          onClick={(e) => {
            props.deleteRowCustomers(props.customers.id, e);
          }}
        >
          Yes
        </button>
        <button
          className={styles.no}
          onClick={() => {
            props.setOpenDeleteCustomer(false);
            props.setSelectedIds([]);
          }}
        >
          No
        </button>
      </div>
      {props.notificationsDeleteCustomers && (
        <NotificationsDeleteCustomers
          setNotificationsDeleteCustomers={
            props.setNotificationsDeleteCustomers
          }
        />
      )}

      {props.notificationsDeleteCustomersError && (
        <NotificationsDeleteCustomersError
          setNotificationsDeleteCustomersError={
            props.setNotificationsDeleteCustomersError
          }
        />
      )}
    </div>
  );
};

const DeleteCustomers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <DeleteCustomerModal
          deleteRowCustomers={props.deleteRowCustomers}
          setOpenDeleteCustomer={props.setOpenDeleteCustomer}
          customers={props.customers}
          setSelectedIds={props.setSelectedIds}
          notificationsDeleteCustomers={props.notificationsDeleteCustomers}
          setNotificationsDeleteCustomers={
            props.setNotificationsDeleteCustomers
          }
          notificationsDeleteCustomersError={
            props.notificationsDeleteCustomersError
          }
          setNotificationsDeleteCustomersError={
            props.setNotificationsDeleteCustomersError
          }
        ></DeleteCustomerModal>,

        document.getElementById("modal")
      )}
    </>
  );
};

export default DeleteCustomers;

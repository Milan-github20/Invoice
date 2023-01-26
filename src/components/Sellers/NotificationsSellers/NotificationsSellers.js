import React from "react";
import styles from "./notificationsSellers.module.css";

//ADD NOTIFICATIONS SELLERS

export const NotificationsCompany = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsCompany(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Company can't be empty!</h4>
    </div>
  );
};

export const NotificationsCompanyAddress = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsCustomer(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Company address can't be empty!</h4>
    </div>
  );
};

export const NotificationsAddSubmit = (props) => {
  return (
    <div className={styles.mainDivAdd}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsAddSubmit(false);
          }}
        >
          X
        </span>
      </div>
      <h4>You have successfully edited the seller!</h4>
    </div>
  );
};

//EDIT NOTIFICATIONS SELLERS

export const NotificationsCompanyEdit = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsDate(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Company can't be empty!</h4>
    </div>
  );
};

export const NotificationsCompanyAddressEdit = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsAmountEdit(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Company address can't be empty!</h4>
    </div>
  );
};

export const NotificationsEditSubmit = (props) => {
  return (
    <div className={styles.mainDivEdit}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsEditSubmit(false);
          }}
        >
          X
        </span>
      </div>
      <h4>You have successfully edited the invoice!</h4>
    </div>
  );
};

//DELETE NOTIFICATIONS SELLERS

export const NotificationsDeleteSeller = (props) => {
  return (
    <div className={styles.mainDivDelete}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsDeleteSellers(false);
          }}
        >
          X
        </span>
      </div>
      <h4>You have successfully deleted the seller!</h4>
    </div>
  );
};

export const NotificationsDeleteSellerError = (props) => {
  return (
    <div className={styles.mainDivDeleteError}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsDeleteSellersError(false);
          }}
        >
          X
        </span>
      </div>
      <h4>You cannot delete the seller because it is on the invoice!</h4>
    </div>
  );
};

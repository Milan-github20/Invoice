import React from "react";
import styles from "./notificationsCustomers.module.css";

//ADD NOTIFICATIONS CUSTOMERS

export const NotificationsName = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsName(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Name can't be empty!</h4>
    </div>
  );
};

export const NotificationsSurname = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsSurname(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Surname can't be empty!</h4>
    </div>
  );
};

export const NotificationsAddress = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsAddress(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Address can't be empty!</h4>
    </div>
  );
};

export const NotificationsAge = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsAge(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Age can't be empty!</h4>
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
      <h4>You have successfully added an Customer!</h4>
    </div>
  );
};

//EDIT NOTIFICATIONS CUSTOMERS

export const NotificationsNameEdit = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsName(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Name can't be empty!</h4>
    </div>
  );
};

export const NotificationsSurnameEdit = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsSurname(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Surname can't be empty!</h4>
    </div>
  );
};

export const NotificationsAddressEdit = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsAddress(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Address can't be empty!</h4>
    </div>
  );
};

export const NotificationsAgeEdit = (props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.span}>
        <span
          onClick={() => {
            props.setNotificationsAge(false);
          }}
        >
          X
        </span>
      </div>
      <h4>Field Age can't be empty!</h4>
    </div>
  );
};

export const NotificationsEditSubmit = (props) => {
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
      <h4>You have successfully edited the Customer!</h4>
    </div>
  );
};

//DELETE NOTIFICATIONS CUSTOMERS

export const NotificationsDeleteCustomers = (props) => {
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
      <h4>You have successfully deleted the customer!</h4>
    </div>
  );
};

export const NotificationsDeleteCustomersError = (props) => {
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
      <h4>You cannot delete the customer because it is on the invoice!</h4>
    </div>
  );
};

import React, { useRef, useState } from "react";
import styles from "../Add_Customers/addCustomers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  NotificationsAddress,
  NotificationsAddSubmit,
  NotificationsAge,
  NotificationsName,
  NotificationsSurname,
} from "../NotificationsCustomers/NotificationsCustomers";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalAddCustomers = (props) => {
  const [notificationsName, setNotificationsName] = useState(false);
  const [notificationsSurname, setNotificationsSurname] = useState(false);
  const [notificationsAddress, setNotificationsAddress] = useState(false);
  const [notificationsAge, setNotificationsAge] = useState(false);
  const [notificationsAddSubmit, setNotificationsAddSubmit] = useState(false);

  const [value, setValue] = useState("");

  const nameCustomer = useRef();
  const surnameCustomer = useRef();
  const addressCustomer = useRef();
  const ageCustomer = useRef();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0) {
      setValue("");
    } else {
      setValue(inputValue);
    }
  };

  const submitAddCustomer = (e) => {
    e.preventDefault();

    if (nameCustomer.current.value.trim() === "") {
      setNotificationsName(true);
      setTimeout(() => {
        setNotificationsName(false);
      }, 1500);
      return;
    }

    if (surnameCustomer.current.value.trim() === "") {
      setNotificationsSurname(true);
      setTimeout(() => {
        setNotificationsSurname(false);
      }, 1500);
      return;
    }

    if (addressCustomer.current.value.trim() === "") {
      setNotificationsAddress(true);
      setTimeout(() => {
        setNotificationsAddress(false);
      }, 1500);
      return;
    }

    if (ageCustomer.current.value.trim() === "") {
      setNotificationsAge(true);
      setTimeout(() => {
        setNotificationsAge(false);
      }, 1500);
      return;
    }

    axios
      .post("https://63ce642b6d27349c2b6c72c5.mockapi.io/customers", {
        name: nameCustomer.current.value,
        surname: surnameCustomer.current.value,
        address: addressCustomer.current.value,
        age: ageCustomer.current.value,
      })
      .then(() => {
        setNotificationsAddSubmit(true);
        setTimeout(() => {
          setNotificationsAddSubmit(false);
          props.fetchCustomers();
          props.closeCustomersModal(false);
        }, 1000);
      });
  };

  const handlekeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitAddCustomer(event);
    }
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={(e) => submitAddCustomer(e)} onKeyDown={handlekeydown}>
        <div className={styles.header}>
          <h2>Create an customer</h2>
          <img
            src="./assets/close.png"
            alt=""
            onClick={() => {
              props.closeCustomersModal(false);
            }}
          />
        </div>

        <div className={styles.form}>
          <h4>Name</h4>
          <input type="text" ref={nameCustomer} />
          <h4>Surname</h4>
          <input type="text" ref={surnameCustomer} />
          <h4>Address</h4>
          <input type="text" ref={addressCustomer} />
          <h4>Age</h4>
          <input
            type="number"
            value={value}
            onChange={handleChange}
            ref={ageCustomer}
          />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeCustomersModal(false);
            }}
          >
            Discard
          </button>
          <button className={styles.create} type="submit">
            Create
          </button>
        </div>
      </form>
      {notificationsName && (
        <NotificationsName setNotificationsName={setNotificationsName} />
      )}

      {notificationsSurname && (
        <NotificationsSurname
          setNotificationsSurname={setNotificationsSurname}
        />
      )}

      {notificationsAddress && (
        <NotificationsAddress
          setNotificationsAddress={setNotificationsAddress}
        />
      )}

      {notificationsAge && ageCustomer.current.value.length === 0 ? (
        <NotificationsAge setNotificationsAge={setNotificationsAge} />
      ) : (
        ""
      )}

      {notificationsAddSubmit && (
        <NotificationsAddSubmit
          setNotificationsAddSubmit={setNotificationsAddSubmit}
        />
      )}
    </div>
  );
};

const AddCustomers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalAddCustomers
          closeCustomersModal={props.closeCustomersModal}
          fetchCustomers={props.fetchCustomers}
        ></ModalAddCustomers>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default AddCustomers;

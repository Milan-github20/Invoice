import React, { useState } from "react";
import styles from "../Edit_Customers/editCustomers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  NotificationsAddressEdit,
  NotificationsAgeEdit,
  NotificationsEditSubmit,
  NotificationsNameEdit,
  NotificationsSurnameEdit,
} from "../NotificationsCustomers/NotificationsCustomers";
import { Link, useNavigate } from "react-router-dom";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditCustomers = (props) => {
  const navigate = useNavigate();

  const [notificationsName, setNotificationsName] = useState(false);
  const [notificationsSuruname, setNotificationsSurname] = useState(false);
  const [notificationsAddress, setNotificationsAddress] = useState(false);
  const [notificationsAge, setNotificationsAge] = useState(false);
  const [notificationsAddSubmit, setNotificationsAddSubmit] = useState(false);

  const [name, setName] = useState(props.editCustomersData.name);
  const [surname, setSurname] = useState(props.editCustomersData.surname);
  const [address, setAddress] = useState(props.editCustomersData.address);
  const [age, setAge] = useState(props.editCustomersData.age);

  const submitEditCustomers = (e) => {
    e.preventDefault();

    if (name === "") {
      setNotificationsName(true);
      setTimeout(() => {
        setNotificationsName(false);
      }, 1500);
      return;
    }

    if (surname === "") {
      setNotificationsSurname(true);
      setTimeout(() => {
        setNotificationsSurname(false);
      }, 1500);
      return;
    }

    if (address === "") {
      setNotificationsAddress(true);
      setTimeout(() => {
        setNotificationsAddress(false);
      }, 1500);
      return;
    }

    if (age === "") {
      setNotificationsAge(true);
      setTimeout(() => {
        setNotificationsAge(false);
      }, 1500);
      return;
    }

    axios
      .put(
        `https://63ce642b6d27349c2b6c72c5.mockapi.io/customers/${props.editCustomersData.id}`,
        {
          name: name,
          surname: surname,
          address: address,
          age: age,
        }
      )
      .then(() => {
        setNotificationsAddSubmit(true);
        setTimeout(() => {
          setNotificationsAddSubmit(false);
          props.closeCustomersModalEdit(false);
          navigate("/customers");
          props.fetchCustomers();
        }, 1000);
      });
  };

  const handlekeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitEditCustomers(event);
    }
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={submitEditCustomers} onKeyDown={handlekeydown}>
        <div className={styles.header}>
          <h2>Edit an customer</h2>
          <Link to={`/customers`}>
            <img
              src="../assets/close.png"
              alt=""
              onClick={() => {
                props.closeCustomersModalEdit(false);
                props.setSelectedIds([]);
              }}
            />
          </Link>
        </div>

        <div className={styles.form}>
          <h4>Name</h4>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
          />
          <h4>Surname</h4>
          <input
            type="text"
            onChange={(e) => setSurname(e.target.value)}
            defaultValue={surname}
          />
          <h4>Address</h4>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            defaultValue={address}
          />
          <h4>Age</h4>
          <input
            type="number"
            onChange={(e) => setAge(e.target.value)}
            defaultValue={age}
          />
        </div>
        <div className={styles.buttons}>
          <Link to={`/customers`}>
            <button
              className={styles.discard}
              onClick={() => {
                props.closeCustomersModalEdit(false);
                props.setSelectedIds([]);
              }}
            >
              Discard
            </button>
          </Link>
          <button className={styles.save}>Save</button>
        </div>
      </form>
      {notificationsName && (
        <NotificationsNameEdit setNotificationsName={setNotificationsName} />
      )}

      {notificationsSuruname && (
        <NotificationsSurnameEdit
          setNotificationsSurname={setNotificationsSurname}
        />
      )}

      {notificationsAddress && (
        <NotificationsAddressEdit
          setNotificationsAddress={setNotificationsAddress}
        />
      )}

      {notificationsAge && (
        <NotificationsAgeEdit setNotificationsAge={setNotificationsAge} />
      )}

      {notificationsAddSubmit && (
        <NotificationsEditSubmit
          setNotificationsAddSubmit={setNotificationsAddSubmit}
        />
      )}
    </div>
  );
};

const EditCustomers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalEditCustomers
          editCustomersData={props.editCustomersData}
          closeCustomersModalEdit={props.closeCustomersModalEdit}
          fetchCustomers={props.fetchCustomers}
          setSelectedIds={props.setSelectedIds}
        ></ModalEditCustomers>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default EditCustomers;

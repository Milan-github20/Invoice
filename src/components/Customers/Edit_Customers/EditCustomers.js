import React, { useRef } from "react";
import styles from "../Edit_Customers/editCustomers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditCustomers = (props) => {
  const nameRefEditCustomers = useRef();
  const surnameRefEditCustomers = useRef();
  const addressRefEditCustomers = useRef();
  const ageRefEditCustomers = useRef();

  const submitEditCustomers = (e) => {
    e.preventDefault();

    axios
      .put(
        `https://63ce642b6d27349c2b6c72c5.mockapi.io/customers/${props.editCustomers.id}`,
        {
          name: nameRefEditCustomers.current.value,
          surnameRefEditCustomers: surnameRefEditCustomers.current.value,
          address: addressRefEditCustomers.current.value,
          age: ageRefEditCustomers.current.value,
        }
      )
      .then(
        alert("daa"),
        props.closeCustomersModalEdit(false),
        props.fetchCustomers()
      );
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={submitEditCustomers}>
        <div className={styles.header}>
          <h2>Edit an customer</h2>
          <img
            src="./assets/close.png"
            alt=""
            onClick={() => {
              props.closeCustomersModalEdit(false);
            }}
          />
        </div>

        <div className={styles.form}>
          <h4>Name</h4>
          <input
            type="text"
            ref={nameRefEditCustomers}
            defaultValue={props.editCustomers.name}
          />
          <h4>Surname</h4>
          <input
            type="text"
            ref={surnameRefEditCustomers}
            defaultValue={props.editCustomers.surname}
          />
          <h4>Address</h4>
          <input
            type="text"
            ref={addressRefEditCustomers}
            defaultValue={props.editCustomers.address}
          />
          <h4>Age</h4>
          <input
            type="text"
            ref={ageRefEditCustomers}
            defaultValue={props.editCustomers.age}
          />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeCustomersModalEdit(false);
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

const EditCustomers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalEditCustomers
          closeCustomersModalEdit={props.closeCustomersModalEdit}
          editCustomers={props.editCustomers}
          fetchCustomers={props.fetchCustomers}
        ></ModalEditCustomers>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default EditCustomers;

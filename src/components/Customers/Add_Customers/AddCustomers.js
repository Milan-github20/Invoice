import React, { useRef } from "react";
import styles from "../Add_Customers/addCustomers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalAddCustomers = (props) => {
  const nameCustomer = useRef();
  const surnameCustomer = useRef();
  const addressCustomer = useRef();
  const ageCustomer = useRef();

  const submitAddCustomer = (e) => {
    e.preventDefault();

    axios
      .post("https://63ce642b6d27349c2b6c72c5.mockapi.io/customers", {
        name: nameCustomer.current.value,
        surname: surnameCustomer.current.value,
        address: addressCustomer.current.value,
        age: ageCustomer.current.value,
      })
      .then(() => {
        alert("DA");
        props.fetchCustomers();
        props.closeCustomersModal(false);
      });
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={(e) => submitAddCustomer(e)}>
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
          <input type="text" id="name" ref={nameCustomer} />
          <h4>Surname</h4>
          <input type="text" id="surname" ref={surnameCustomer} />
          <h4>Address</h4>
          <input type="text" id="address" ref={addressCustomer} />
          <h4>Age</h4>
          <input type="text" id="age" ref={ageCustomer} />
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
          <button className={styles.create}>Create</button>
        </div>
      </form>
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

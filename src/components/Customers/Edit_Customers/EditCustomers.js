import React, { useState } from "react";
import styles from "../Edit_Customers/editCustomers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditCustomers = (props) => {
  const [name, setName] = useState(props.editCustomersData.name);
  const [surname, setSurname] = useState(props.editCustomersData.surname);
  const [address, setAddress] = useState(props.editCustomersData.address);
  const [age, setAge] = useState(props.editCustomersData.age);

  const submitEditCustomers = (e) => {
    e.preventDefault();

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
      .then(
        alert("daa"),
        props.closeCustomersModalEdit(false),
        props.fetchCustomers()
      );
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
          editCustomersData={props.editCustomersData}
          closeCustomersModalEdit={props.closeCustomersModalEdit}
          fetchCustomers={props.fetchCustomers}
        ></ModalEditCustomers>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default EditCustomers;

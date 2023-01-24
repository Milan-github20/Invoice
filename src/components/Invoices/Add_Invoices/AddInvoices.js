import React, { useRef, useState } from "react";
import styles from "../Add_Invoices/addInvoices.module.css";
import ReactDOM from "react-dom";
import { format } from "date-fns";
import axios from "axios";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalAddInvoices = (props) => {
  const sellerRefAdd = useRef();
  const customerRefAdd = useRef();
  const dateRefAdd = useRef();
  const amountRefAdd = useRef();

  const handlekeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitAddInvoices(event);
    }
  };

  const submitAddInvoices = (e) => {
    e.preventDefault();

    axios
      .post("https://63ce642b6d27349c2b6c72c5.mockapi.io/invoice", {
        sellerName: sellerRefAdd.current.value,
        customerName: customerRefAdd.current.value,
        date: dateRefAdd.current.value,
        amount: amountRefAdd.current.value,
      })
      .then(() => {
        alert("da");
        props.fetchInvoices();
        props.closeInvoicesModal(false);
      });
  };

  return (
    <div className={styles.modal}>
      <form
        onSubmit={(e) => {
          submitAddInvoices(e);
        }}
        onKeyDown={handlekeydown}
      >
        <div className={styles.header}>
          <h2>Create an invoice</h2>
          <img
            src="./assets/close.png"
            alt=""
            onClick={() => {
              props.closeInvoicesModal(false);
            }}
          />
        </div>

        <div className={styles.form}>
          <h4>Seller</h4>
          <select ref={sellerRefAdd}>
            {props.sellers.map((item) => {
              if (item.isActive === "Active") {
                return <option>{item.companyName}</option>;
              }
            })}
          </select>
          <h4>Customer</h4>
          <select ref={customerRefAdd}>
            {props.customers.map((item) => {
              return <option>{item.name + " " + item.surname}</option>;
            })}
          </select>
          <h4>Date</h4>
          <input
            ref={dateRefAdd}
            type="date"
            max={format(new Date(), "yyyy-MM-dd")}
          />
          <h4>Amount</h4>
          <input ref={amountRefAdd} type="number" min="0" />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeInvoicesModal(false);
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

const AddInvoices = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalAddInvoices
          closeInvoicesModal={props.closeInvoicesModal}
          sellers={props.sellers}
          customers={props.customers}
          fetchInvoices={props.fetchInvoices}
        ></ModalAddInvoices>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default AddInvoices;

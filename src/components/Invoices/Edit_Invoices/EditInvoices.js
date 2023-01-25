import React, { useState } from "react";
import styles from "../Edit_Invoices/editInvoices.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import { format } from "date-fns";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditInvoices = (props) => {
  const [seller, setSeller] = useState(props.editInvoicesData.sellerName);
  const [customer, setCustomer] = useState(props.editInvoicesData.customerName);
  const [date, setDate] = useState(props.editInvoicesData.date);
  const [amount, setAmount] = useState(props.editInvoicesData.amount);

  const handlekeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitEditInvoices(event);
    }
  };

  const submitEditInvoices = (e) => {
    e.preventDefault();

    axios
      .put(
        `https://63ce642b6d27349c2b6c72c5.mockapi.io/invoice/${props.editInvoicesData.id}`,
        {
          sellerName: seller,
          customerName: customer,
          date: date,
          amount: amount,
        }
      )
      .then(
        alert("daaaaa"),
        props.fetchInvoices(),
        props.closeInvoicesModalEdit(false)
      );
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={submitEditInvoices} onKeyDown={handlekeydown}>
        <div className={styles.header}>
          <h2>Edit an invoice</h2>
          <img
            src="./assets/close.png"
            alt=""
            onClick={() => {
              props.closeInvoicesModalEdit(false);
            }}
          />
        </div>

        <div className={styles.form}>
          <h4>Seller</h4>
          <select
            onChange={(e) => setSeller(e.target.value)}
            defaultValue={seller}
          >
            {props.sellers.map((item) => {
              if (item.isActive === "Active") {
                return <option key={item.id}>{item.companyName}</option>;
              } else {
                return null;
              }
            })}
          </select>
          <h4>Customer</h4>
          <select
            onChange={(e) => setCustomer(e.target.value)}
            defaultValue={customer}
          >
            {props.customers.map((item) => {
              return (
                <option key={item.id}>{item.name + " " + item.surname}</option>
              );
            })}
          </select>
          <h4>Date</h4>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            defaultValue={date}
            max={format(new Date(), "yyyy-MM-dd")}
          />
          <h4>Amount</h4>
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            defaultValue={amount}
          />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeInvoicesModalEdit(false);
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

const EditInvoices = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalEditInvoices
          closeInvoicesModalEdit={props.closeInvoicesModalEdit}
          fetchInvoices={props.fetchInvoices}
          editInvoicesData={props.editInvoicesData}
          sellers={props.sellers}
          customers={props.customers}
        ></ModalEditInvoices>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default EditInvoices;

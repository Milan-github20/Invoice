import React, { useState } from "react";
import styles from "../Edit_Invoices/editInvoices.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import { format } from "date-fns";
import {
  NotificationsAmountEdit,
  NotificationsDateEdit,
  NotificationsEditSubmit,
} from "../NotificationsInvoices/NotificationsInvoices";
import { useParams } from "react-router-dom";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalEditInvoices = (props) => {
  const params = useParams();

  const [notificationsDateEdit, setNotificationsDateEdit] = useState(false);
  const [notificationsAmountEdit, setNotificationsAmountEdit] = useState(false);
  const [notificationsEditSubmit, setNotificationsEditSubmit] = useState(false);

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

  console.log(params.id);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0) {
      setAmount("");
    } else {
      setAmount(inputValue);
    }
  };

  const submitEditInvoices = (e) => {
    e.preventDefault();

    if (date.trim() === "") {
      setNotificationsDateEdit(true);
      setTimeout(() => {
        setNotificationsDateEdit(false);
      }, 1500);
      return;
    }

    if (amount.trim() === "") {
      setNotificationsAmountEdit(true);
      setTimeout(() => {
        setNotificationsAmountEdit(false);
      }, 1500);
      return;
    }

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
      .then(() => {
        setNotificationsEditSubmit(true);
        setTimeout(() => {
          setNotificationsEditSubmit(false);
          props.fetchInvoices();
          props.closeInvoicesModalEdit(false);
        }, 1000);
      });
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
            onChange={(e) => {
              setAmount(e.target.value);
              handleChange(e);
            }}
            defaultValue={amount}
          />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.discard}
            onClick={() => {
              props.closeInvoicesModalEdit(false);
              props.setSelectedIds([]);
            }}
          >
            Discard
          </button>
          <button className={styles.save}>Save</button>
        </div>
      </form>
      {notificationsDateEdit && date.length === 0 ? (
        <NotificationsDateEdit
          setNotificationsDateEdit={setNotificationsDateEdit}
        />
      ) : (
        ""
      )}
      {notificationsAmountEdit && amount.length === 0 ? (
        <NotificationsAmountEdit
          setNotificationsAmountEdit={setNotificationsAmountEdit}
        />
      ) : (
        ""
      )}

      {notificationsEditSubmit && (
        <NotificationsEditSubmit
          setNotificationsEditSubmit={setNotificationsEditSubmit}
        />
      )}
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
          setSelectedIds={props.setSelectedIds}
        ></ModalEditInvoices>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default EditInvoices;

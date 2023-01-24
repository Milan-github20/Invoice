import React, { useState, useEffect } from "react";
import styles from "../Customers_Main/customers.module.css";
import AddCustomers from "../Add_Customers/AddCustomers";
import EditCustomers from "../Edit_Customers/EditCustomers";
import { ClipLoader } from "react-spinners";

const Customers = (props) => {
  const [openCustomersAdd, setOpenCustomersAdd] = useState(false);
  const [openCustomersEdit, setOpenCustomersEdit] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledDelete, setIsDisabledDelete] = useState(true);

  const [loadingApp, setLoadingApp] = useState(true);

  const [editCustomersData, setEditCustomersData] = useState([]);

  useEffect(() => {
    setLoadingApp(true);
    setTimeout(() => {
      setLoadingApp(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (props.selectedIds.length === 0) {
      setIsDisabled(props.selectedIds.length === 0);
      setIsDisabledDelete(props.selectedIds.length === 0);
    } else if (props.selectedIds.length === 1) {
      setIsDisabled(props.selectedIds.length <= 0);
      setIsDisabledDelete(props.selectedIds.length <= 0);
    } else if (props.selectedIds.length === 2) {
      setIsDisabled(props.selectedIds.length !== 1);
    }
  }, [props.selectedIds]);

  const deleteRowCustomers = () => {
    if (window.confirm("Are u sure?")) {
      if (props.selectedIds.length >= 1) {
        for (let i = 0; i < props.selectedIds.length; i++) {
          fetch(
            `https://63ce642b6d27349c2b6c72c5.mockapi.io/customers/${props.selectedIds[i]}`,
            {
              method: "DELETE",
            }
          );
        }
        alert("asdasdasd");
        props.fetchCustomers();
      }
    }
  };

  if (props.error) {
    return <div>Error: {props.error.message}</div>;
  } else if (!props.isLoaded) {
    return;
  } else {
    return (
      <div className={styles.head}>
        <div className={styles.customers}>CUSTOMERS</div>
        <div className={styles.main_Customers}>
          <div className={styles.mainDiv_buttons}>
            <div className={styles.icons}>
              <div
                className={styles.add}
                onClick={() => {
                  setOpenCustomersAdd(true);
                }}
              >
                <img src="./assets/plus.png" alt="" />
              </div>
              <div
                className={`${styles.edit} ${
                  isDisabled ? styles.disabled : ""
                }`}
                onClick={() => {
                  setOpenCustomersEdit(true);
                }}
              >
                <img src="./assets/pen.png" alt="" />
              </div>
              <div
                className={`${styles.delete} ${
                  isDisabledDelete ? styles.disabled : ""
                }`}
                onClick={(e) => {
                  deleteRowCustomers(props.customers.id, e);
                }}
              >
                <img src="./assets/close.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Address</th>
              <th>Age</th>
            </tr>
          </thead>
          {loadingApp ? (
            <ClipLoader
              color={"#289944"}
              loading={loadingApp}
              cssOverride={{ position: "absolute", top: "40%", left: "51.5%" }}
            />
          ) : (
            <tbody className={styles.tbody}>
              {props.customers.map((item) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() => {
                      if (props.selectedIds.includes(item.id)) {
                        props.setSelectedIds(
                          props.selectedIds.filter((id) => id !== item.id)
                        );
                      } else {
                        setEditCustomersData(item);
                        props.setSelectedIds([...props.selectedIds, item.id]);
                      }
                    }}
                    className={
                      props.selectedIds.includes(item.id)
                        ? styles.selectedRow
                        : ""
                    }
                  >
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.address}</td>
                    <td>{item.age}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {openCustomersAdd && (
          <AddCustomers
            closeCustomersModal={setOpenCustomersAdd}
            fetchCustomers={props.fetchCustomers}
          />
        )}
        {openCustomersEdit && (
          <EditCustomers
            editCustomersData={editCustomersData}
            closeCustomersModalEdit={setOpenCustomersEdit}
            fetchCustomers={props.fetchCustomers}
          />
        )}
      </div>
    );
  }
};

export default Customers;

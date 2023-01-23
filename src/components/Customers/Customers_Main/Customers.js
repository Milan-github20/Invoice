import React, { useState, useEffect } from "react";
import styles from "../Customers_Main/customers.module.css";
import AddCustomers from "../Add_Customers/AddCustomers";
import EditCustomers from "../Edit_Customers/EditCustomers";
import { ClipLoader } from "react-spinners";

const Customers = () => {
  const [openCustomersAdd, setOpenCustomersAdd] = useState(false);
  const [openCustomersEdit, setOpenCustomersEdit] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledDelete, setIsDisabledDelete] = useState(true);

  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    setLoadingApp(true);
    setTimeout(() => {
      setLoadingApp(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (selectedIds.length === 0) {
      setIsDisabled(selectedIds.length === 0);
      setIsDisabledDelete(selectedIds.length === 0);
    } else if (selectedIds.length === 1) {
      setIsDisabled(selectedIds.length <= 0);
      setIsDisabledDelete(selectedIds.length <= 0);
    } else if (selectedIds.length === 2) {
      setIsDisabled(selectedIds.length !== 1);
    }
  }, [selectedIds]);

  const fetchCustomers = () => {
    fetch("https://63ce642b6d27349c2b6c72c5.mockapi.io/customers")
      .then((res) => res.json())
      .then(
        (result) => {
          setCustomers(result);
          setIsLoaded(true);
          setSelectedIds([]);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteRowCustomers = (e) => {
    //e.preventDefault();

    if (window.confirm("Are u sure?")) {
      if (selectedIds.length >= 1) {
        for (let i = 0; i < selectedIds.length; i++) {
          fetch(
            `https://63ce642b6d27349c2b6c72c5.mockapi.io/customers/${selectedIds[i]}`,
            {
              method: "DELETE",
            }
          );
        }
        alert("asdasdasd");
        fetchCustomers();
      }
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
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
                  deleteRowCustomers(customers.id, e);
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
              {customers.map((item) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() => {
                      if (selectedIds.includes(item.id)) {
                        setSelectedIds(
                          selectedIds.filter((id) => id !== item.id)
                        );
                      } else {
                        setSelectedIds([...selectedIds, item.id]);
                      }
                    }}
                    className={
                      selectedIds.includes(item.id) ? styles.selectedRow : ""
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
            fetchCustomers={fetchCustomers}
          />
        )}
        {openCustomersEdit && (
          <EditCustomers closeCustomersModalEdit={setOpenCustomersEdit} />
        )}
      </div>
    );
  }
};

export default Customers;

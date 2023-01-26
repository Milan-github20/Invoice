import React, { useState, useEffect } from "react";
import styles from "../Customers_Main/customers.module.css";
import AddCustomers from "../Add_Customers/AddCustomers";
import EditCustomers from "../Edit_Customers/EditCustomers";
import { ClipLoader } from "react-spinners";
import DeleteCustomers from "../DeleteCustomer/DeleteCustomer";
import { Link, Route, Routes } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Customers = (props) => {
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(props.customers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [notificationsDeleteCustomers, setNotificationsDeleteCustomers] =
    useState(false);

  const [
    notificationsDeleteCustomersError,
    setNotificationsDeleteCustomersError,
  ] = useState(false);

  const [openCustomersAdd, setOpenCustomersAdd] = useState(false);
  const [openDeleteCustomer, setOpenDeleteCustomer] = useState(false);

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
    if (props.selectedIds.length >= 1) {
      for (let i = 0; i < props.selectedIds.length; i++) {
        let counter = 0;
        props.invoices.map((item) => {
          if (
            String(editCustomersData.name + " " + editCustomersData.surname) ===
            String(item.customerName)
          ) {
            return (counter = 1);
          } else {
            return counter;
          }
        });

        if (Number(counter) === Number(0)) {
          return fetch(
            `https://63ce642b6d27349c2b6c72c5.mockapi.io/customers/${props.selectedIds[i]}`,
            {
              method: "DELETE",
            }
          ).then(() => {
            setNotificationsDeleteCustomers(true);
            setTimeout(() => {
              setNotificationsDeleteCustomers(false);
              props.fetchCustomers();
              setOpenDeleteCustomer(false);
            }, 1000);
          });
        }
      }
      setNotificationsDeleteCustomersError(true);
      setTimeout(() => {
        setNotificationsDeleteCustomersError(false);
        setOpenDeleteCustomer(false);
        props.setSelectedIds([]);
      }, 2000);
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
              <Link
                to={`/customers/${props.selectedIds}`}
                className={`${styles.edit} ${
                  isDisabled ? styles.disabled : ""
                }`}
              >
                <div
                  className={`${styles.edit} ${
                    isDisabled ? styles.disabled : ""
                  }`}
                >
                  <img src="./assets/pen.png" alt="" />
                </div>
              </Link>
              <div
                className={`${styles.delete} ${
                  isDisabledDelete ? styles.disabled : ""
                }`}
                onClick={() => {
                  setOpenDeleteCustomer(true);
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
              {props.customers
                .slice(pagesVisited, pagesVisited + usersPerPage)
                .map((item) => {
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
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={styles.paginationBttns}
          previousLinkClassName={styles.previousBttn}
          nextLinkClassName={styles.nextBttn}
          disabledClassName={styles.paginationDisabled}
          activeClassName={styles.paginationActive}
        />
        {openDeleteCustomer && (
          <DeleteCustomers
            deleteRowCustomers={deleteRowCustomers}
            setOpenDeleteCustomer={setOpenDeleteCustomer}
            customers={props.customers}
            setSelectedIds={props.setSelectedIds}
            notificationsDeleteCustomers={notificationsDeleteCustomers}
            setNotificationsDeleteCustomers={setNotificationsDeleteCustomers}
            notificationsDeleteCustomersError={
              notificationsDeleteCustomersError
            }
            setNotificationsDeleteCustomersError={
              setNotificationsDeleteCustomersError
            }
          />
        )}
        {openCustomersAdd && (
          <AddCustomers
            closeCustomersModal={setOpenCustomersAdd}
            fetchCustomers={props.fetchCustomers}
          />
        )}

        <Routes>
          <Route
            path="/:id"
            element={
              <EditCustomers
                editCustomersData={editCustomersData}
                fetchCustomers={props.fetchCustomers}
                setSelectedIds={props.setSelectedIds}
              />
            }
          />
        </Routes>
      </div>
    );
  }
};

export default Customers;

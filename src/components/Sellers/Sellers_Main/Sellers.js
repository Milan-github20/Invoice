import React, { useState, useEffect } from "react";
import styles from "../Sellers_Main/sellers.module.css";
import AddSellers from "../Add_Sellers/AddSellers";
import EditSellers from "../Edit_Sellers/EditSellers";
import { ClipLoader } from "react-spinners";
import DeleteSellers from "../DeleteSellers/DeleteSellers";

const Sellers = (props) => {
  const [openSellersAdd, setOpenSellersAdd] = useState(false);
  const [openSellersEdit, setOpenSellersEdit] = useState(false);
  const [openDeleteSeller, setOpenDeleteSeller] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledDelete, setIsDisabledDelete] = useState(true);

  const [loadingApp, setLoadingApp] = useState(true);

  const [editSellersData, setEditSellersData] = useState([]);

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

  const deleteRowSellers = () => {
    if (props.selectedIds.length >= 1) {
      for (let i = 0; i < props.selectedIds.length; i++) {
        let counter = 0;
        props.invoices.map((item) => {
          if (String(editSellersData.companyName) === String(item.sellerName)) {
            return (counter = 1);
          } else {
            return counter;
          }
        });

        if (Number(counter) === Number(0)) {
          return fetch(
            `https://63ce9ae9fdfe2764c726a809.mockapi.io/sellers/${props.selectedIds[i]}`,
            {
              method: "DELETE",
            }
          ).then(
            alert("asdasdasd"),
            props.fetchSellers(),
            setOpenDeleteSeller(false)
          );
        }
      }

      alert("Ne moze se obrisati");
      props.setSelectedIds([]);
      setOpenDeleteSeller(false);
    }
  };

  if (props.error) {
    return <div>Error: {props.error.message}</div>;
  } else if (!props.isLoaded) {
    return;
  } else {
    return (
      <div className={styles.head}>
        <div className={styles.sellers}>SELLERS</div>
        <div className={styles.main_Sellers}>
          <div className={styles.mainDiv_buttons}>
            <div className={styles.icons}>
              <div
                className={styles.add}
                onClick={() => {
                  setOpenSellersAdd(true);
                }}
              >
                <img src="./assets/plus.png" alt="" />
              </div>
              <div
                className={`${styles.edit} ${
                  isDisabled ? styles.disabled : ""
                }`}
                onClick={() => {
                  setOpenSellersEdit(true);
                }}
              >
                <img src="./assets/pen.png" alt="" />
              </div>
              <div
                className={`${styles.delete} ${
                  isDisabledDelete ? styles.disabled : ""
                }`}
                onClick={() => {
                  setOpenDeleteSeller(true);
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
              <th>Company</th>
              <th>Company address</th>
              <th>Active</th>
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
              {props.sellers.map((item) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() => {
                      if (props.selectedIds.includes(item.id)) {
                        props.setSelectedIds(
                          props.selectedIds.filter((id) => id !== item.id)
                        );
                      } else {
                        setEditSellersData(item);
                        props.setSelectedIds([...props.selectedIds, item.id]);
                      }
                    }}
                    className={
                      props.selectedIds.includes(item.id)
                        ? styles.selectedRow
                        : ""
                    }
                  >
                    <td>{item.companyName}</td>
                    <td>{item.hqAddress}</td>
                    <td
                      className={`${
                        item.isActive === "Active"
                          ? styles.activeGreen
                          : styles.activeRed
                      }`}
                      id={item.id}
                    >
                      {item.isActive}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {openDeleteSeller && (
          <DeleteSellers
            sellers={props.sellers}
            setOpenDeleteSeller={setOpenDeleteSeller}
            deleteRowSellers={deleteRowSellers}
            setSelectedIds={props.setSelectedIds}
          />
        )}
        {openSellersAdd && (
          <AddSellers
            closeSellersModal={setOpenSellersAdd}
            fetchSellers={props.fetchSellers}
          />
        )}
        {openSellersEdit && (
          <EditSellers
            closeSellersModalEdit={setOpenSellersEdit}
            editSellersData={editSellersData}
            fetchSellers={props.fetchSellers}
          />
        )}
      </div>
    );
  }
};

export default Sellers;

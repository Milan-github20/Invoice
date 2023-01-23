import React, { useState, useEffect } from "react";
import styles from "../Sellers_Main/sellers.module.css";
import AddSellers from "../Add_Sellers/AddSellers";
import EditSellers from "../Edit_Sellers/EditSellers";
import { ClipLoader } from "react-spinners";

const Sellers = () => {
  const [openSellersAdd, setOpenSellersAdd] = useState(false);
  const [openSellersEdit, setOpenSellersEdit] = useState(false);

  const [sellers, setSellers] = useState([]);
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

  const fetchSellers = () => {
    fetch("https://63ce9ae9fdfe2764c726a809.mockapi.io/sellers")
      .then((res) => res.json())
      .then(
        (result) => {
          setSellers(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
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
              {sellers.map((item) => {
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
        {openSellersAdd && (
          <AddSellers
            closeSellersModal={setOpenSellersAdd}
            fetchSellers={fetchSellers}
          />
        )}
        {openSellersEdit && (
          <EditSellers closeSellersModalEdit={setOpenSellersEdit} />
        )}
      </div>
    );
  }
};

export default Sellers;

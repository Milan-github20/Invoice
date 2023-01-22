import React, { useState } from "react";
import styles from "../Sellers_Main/sellers.module.css";
import AddSellers from "../Add_Sellers/AddSellers";
import EditSellers from "../Edit_Sellers/EditSellers";

const Sellers = () => {
  const [openSellersAdd, setOpenSellersAdd] = useState(false);
  const [openSellersEdit, setOpenSellersEdit] = useState(false);

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
              className={styles.edit}
              onClick={() => {
                setOpenSellersEdit(true);
              }}
            >
              <img src="./assets/pen.png" alt="" />
            </div>
            <div className={styles.delete}>
              <img src="./assets/close.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {openSellersAdd && <AddSellers closeSellersModal={setOpenSellersAdd} />}
      {openSellersEdit && (
        <EditSellers closeSellersModalEdit={setOpenSellersEdit} />
      )}
    </div>
  );
};

export default Sellers;

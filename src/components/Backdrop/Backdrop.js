import React from "react";
import styles from "./Backdrop.module.css";

function Backdrop(props) {
  const { handleModalShow } = props;
  const handleModalShowHandler = () => {
    handleModalShow((prevState) => !prevState);
  };

  return (
    <div className={styles.backdrop} onClick={handleModalShowHandler}></div>
  );
}

export default Backdrop;

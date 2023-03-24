import React from "react";
import NotFoundImage from "../../assets/images/404NotFound.jpg";
import styles from "./NotFound.module.css";

function NotFound(props) {
  return (
    <div className={styles.NotFoundContainer}>
      <div className={styles.NotFoundImage}><img src={NotFoundImage} alt="" /></div>
    </div>
  );
}

export default NotFound;

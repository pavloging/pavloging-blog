import React from "react";
import styles from "./CreatorInfo.module.scss";

export const CreatorInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || "/noavatar.png"}
        alt={fullName}
      />
      <div className={styles.creatorDetails}>
        <span className={styles.creatorName}>{fullName}</span>
        <span className={styles.additional}>
          {new Date(additionalText).toLocaleString("ru")}
        </span>
      </div>
    </div>
  );
};

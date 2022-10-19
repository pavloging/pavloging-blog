import React from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children }) => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography
        style={{ color: "rgba(255, 255, 255, 0.9)" }}
        variant="h6"
        classes={{ root: styles.title }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

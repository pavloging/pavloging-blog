import React from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { Box } from "@mui/system";
import { Avatar, IconButton, Tooltip } from "@mui/material";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const creator = useSelector((store) => store.auth.data);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>
              <pre>
                <code>&lt;&gt;PAVLOGING&lt;/&gt;</code>
              </pre>
            </div>
          </Link>
          <div style={{ display: "flex" }}>
            <div className={styles.buttons}>
              {isAuth ? (
                <>
                  <Link className="link" to="/add-post">
                    <Button variant="outlined">Написать статью</Button>
                  </Link>
                  <Button
                    onClick={onClickLogout}
                    variant="outlined"
                    color="error"
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Link className="link" to="/login">
                    <Button variant="outlined">Войти</Button>
                  </Link>
                  <Link className="link" to="/register">
                    <Button variant="outlined" sx={{ background: "blue" }}>
                      Создать аккаунт
                    </Button>
                  </Link>
                </>
              )}
            </div>
            {isAuth && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Your avatar">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={creator ? creator.avatarUrl : null}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

import React from "react";
import Container from "@mui/material/Container";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { Header } from "./components";
import { fetchAuthMe } from "./redux/slices/auth";
import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
  TagDefinite,
} from "./pages";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/*" element={<TagDefinite />} />
        </Routes>
      </Container>

      <ToastContainer />
    </>
  );
}

export default App;

import React, { Children } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={styles.layout}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

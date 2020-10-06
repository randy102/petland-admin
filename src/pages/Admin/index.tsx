import Header from "components/Header";
import LeftBar from "components/LeftBar";
import React from "react";
import { Redirect } from "react-router-dom";
import { isLogin } from "utils/auth";
import Routes from "./Routes";
import "./styles.scss";

export default function Admin() {
  if (!isLogin()) return <Redirect to="/login" />;
  return (
    <div>
      <Header />
      <LeftBar />
      <Routes />
    </div>
  );
}

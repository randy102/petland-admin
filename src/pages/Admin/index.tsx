import Header from "components/Header";
import LeftBar from "components/LeftBar";
import React from "react";
import Routes from "./Routes";
import "./styles.scss";

export default function Admin() {
  return (
    <div>
      <Header />
      <LeftBar />
      <Routes />
    </div>
  );
}

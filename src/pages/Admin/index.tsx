import Header from "components/Header";
import LeftBar from "components/LeftBar";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { hasAdminPermission, isLogin, logOut } from "utils/auth";
import { useFetch } from "utils/request";
import Routes from "./Routes";
import "./styles.scss";

export default function Admin() {
  const [result,{error, loading}] = useFetch({api:'user/profile'})
  const [validUser, setValidUser] = useState(true)

  useEffect(() => {
    if(!loading && (error || !hasAdminPermission(result?.data.role))){
      setValidUser(false)
    } else {
      setValidUser(true)
    }
  },[loading, error, result])

  if (!isLogin() || (!loading && !validUser)){
    logOut()
    return <Redirect to="/login" />
  } 

  return (
    <div>
      <Header />
      <LeftBar />
      <Routes />
    </div>
  );
}

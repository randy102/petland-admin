import Header from "components/Header";
import LeftBar from "components/LeftBar";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isLogin, logOut } from "utils/auth";
import { useFetch } from "utils/request";
import Routes from "./Routes";
import "./styles.scss";

export default function Admin() {
  const [,{error, loading}] = useFetch({api:'/ping'})
  const [validToken, setValidToken] = useState(true)

  useEffect(() => {
    if(!loading && error){
      setValidToken(false)
    }
  },[loading, error])

  if (!isLogin() || !validToken){
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

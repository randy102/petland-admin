import { Button, Result, Space } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { logOut } from "utils/auth";

export default function Logout() {
  const history = useHistory();

  function handleLogout() {
    logOut();
    history.push("/login");
  }

  return (
    <Result
      status="warning"
      title="Bạn có chắc muốn đăng xuất?"
      extra={
        <Space>
          <Button onClick={() => history.push('/')}>Trở về</Button>
          <Button type="primary" key="console" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Space>
      }
    />
  );
}

import React, { useCallback } from "react";
import { Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useGlobalStore } from "../../components/GlobalStore";
import "./Login.scss";
import RInput from "components/Shared/RForm/RInput";
import RForm from "components/Shared/RForm";
import RPassword from "components/Shared/RForm/RPassword";
import LogForm from "components/LoginForm";

function Login() {
  const [state, dispatch] = useGlobalStore();

  console.log(state);

  const onLogin = useCallback(() => {
    dispatch({
      type: "SAVE_USER_INFO",
      payload: {
        username: "test",
        token: "wertrwer",
      },
    });
  }, [dispatch]);

  function handleLogin(){
    onLogin()
  }

  return (
    <LogForm title="Đăng nhập">
      <RForm onEnter={handleLogin}>
        <RInput
          label="Email"
          placeholder="Nhập email..."
          name="email"
          rules={{ type: "email", required: true }}
          prefix={<MailOutlined />}
        />

        <RPassword
          label="Mật khẩu"
          placeholder="Nhập mật khẩu..."
          name="password"
          rules={{ required: true, min: 8 }}
          prefix={<LockOutlined />}
        />

        <Button onClick={handleLogin} style={{ marginTop: 5 }} block type="primary">
          Đăng nhập
        </Button>
      </RForm>
    </LogForm>
  );
}

export default Login;

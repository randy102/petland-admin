import React, { useState } from "react";
import { Button, Form, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import RInput from "components/Shared/RForm/RInput";
import RForm from "components/Shared/RForm";
import RPassword from "components/Shared/RForm/RPassword";
import LogForm from "components/LoginForm";
import { isLogin, logIn } from "utils/auth";
import { useMutation } from "utils/request";
import { Redirect, useHistory } from "react-router-dom";
import "./Login.scss";
import { handleFieldError } from "../../utils/form";

function Login() {
  const [loading, setLoading] = useState(false);
  const requestLogin = useMutation({ api: "auth/login", method: "post" });
  const [form] = Form.useForm();
  const history = useHistory();

  function onLogin() {
    form.validateFields().then((inputs) => {
      setLoading(true);
      requestLogin({data: inputs})
        .then((res) => {
          logIn(res.data);
          history.push("/");
        })
        .catch((error) => {
          message.error(`Error: ${error.response?.data.message}`)
        })
        .finally(() => setLoading(false))
    }).catch(handleFieldError);
  }
  
  if(isLogin()) return <Redirect to="/"/>

  return (
    <LogForm title="Login">
      <RForm form={form} onEnter={onLogin}>
        <RInput
          label="Email"
          placeholder="Type email..."
          name="email"
          rules={{ required: true, type: 'email' }}
          prefix={<UserOutlined />}
        />

        <RPassword
          label="Password"
          placeholder="Type password here..."
          name="password"
          rules={{ required: true }}
          prefix={<LockOutlined />}
        />

        <Button loading={loading} onClick={onLogin} style={{ marginTop: 5 }} block type="primary">
          Submit
        </Button>
      </RForm>
    </LogForm>
  );
}

export default Login;

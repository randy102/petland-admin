import React from "react";
import { Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import RInput from "components/Shared/RForm/RInput";
import RForm from "components/Shared/RForm";
import RPassword from "components/Shared/RForm/RPassword";
import LogForm from "components/LoginForm";
import { logIn } from "utils/auth";
import { useMutation } from "utils/request";
import { useHistory } from "react-router-dom";
import "./Login.scss";

function Login() {
  const requestLogin = useMutation({api: "/login",method: "post"});
  const [form] = Form.useForm();
  const history = useHistory()

  const onLogin = () => {
    form.validateFields().then((inputs) => {
      requestLogin(inputs)
        .then((res) => {
          logIn(res.data);
          history.push('/user');
        })
        .catch((error) => {
          console.table("error", error.response);
        });
    });

  }

  return (
    <LogForm title="Đăng nhập">
      <RForm form={form} onEnter={onLogin}>
        <RInput
          label="Tên đăng nhập"
          placeholder="Nhập tên..."
          name="username"
          rules={{ required: true }}
          prefix={<UserOutlined />}
        />

        <RPassword
          label="Mật khẩu"
          placeholder="Nhập mật khẩu..."
          name="password"
          rules={{ required: true }}
          prefix={<LockOutlined />}
        />

        <Button onClick={onLogin} style={{ marginTop: 5 }} block type="primary">
          Đăng nhập
        </Button>
      </RForm>
    </LogForm>
  );
}

export default Login;

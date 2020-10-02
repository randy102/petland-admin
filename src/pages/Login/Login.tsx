import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useGlobalStore } from '../../components/GlobalStore';
import './Login.scss';

function Login() {
  const [state, dispatch] = useGlobalStore()

  console.log(state)

  const onLogin = useCallback(() => {
    dispatch({
      type: "SAVE_USER_INFO",
      payload: {
        username: "test",
        token: "wertrwer"
      }
    })
  }, [dispatch])

  return (
    <div className="Login">
      Login Page
      <Button onClick={onLogin}>Login</Button>
    </div>
  );
}

export default Login;

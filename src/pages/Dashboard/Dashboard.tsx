import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import Layout from '../../components/Layout/Layout';
import './Dashboard.scss';

function Dashboard() {
  const routerHistory = useHistory()
  const goToLogin = useCallback(() => {
    routerHistory.push("/login")
  }, [routerHistory])
  return (
    <Layout>
      <div className="Dashboard">
        Dashboard Page
        <Button onClick={goToLogin}>Login Pge</Button>
      </div>
    </Layout>
  );
}

export default Dashboard;

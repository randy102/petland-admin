import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Admin from "./Admin";
import { Login } from "./Login";
import Logout from "./Logout";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  LOGOUT: "/logout"
}

document.title = 'Daidung Back-office';

export default function RootPage() {
  return (
    <Router>
        <Switch>
          <Route path={ROUTES.LOGIN}>
            <Login />
          </Route>
          <Route path={ROUTES.LOGOUT}>
            <Logout/>
          </Route>
          <Route path={ROUTES.HOME}>
            <Admin/>
          </Route>
        </Switch>
    </Router>
  );
}
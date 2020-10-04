import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ROUTES } from "./RouteConfig";
import User from "./User";

export default function Routes() {
  const match = useRouteMatch();
  return (
    <div id="admin-content-wrap">
      <Switch>
        {ROUTES.map((route) => {
          return (
            <Route
              key={route.path}
              path={"/admin" + route.path}
              component={route.component}
            />
          );
        })}
        <Route path={`${match.url}/`} component={User} />
      </Switch>
    </div>
  );
}

import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import { useAuth } from "../utils/context";

const ProtectedRoute: React.FC<RouteProps> = ({ isExact, path, Component }) => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (auth?.currentUser === null) {
      history.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Route exact={isExact} path={path} component={Component} />;
};

export default ProtectedRoute;

import { LOCAL_STORAGE } from "../constants/localstorage";
import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import LayoutAdmin from "components/layout/adminLayout";

const AdminRoute = (props) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  return (
    <>
      {accessToken ? (
        <LayoutAdmin>
          <Route {...props} />
        </LayoutAdmin>
      ) : (
        <Route
          render={(props) => (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default AdminRoute;

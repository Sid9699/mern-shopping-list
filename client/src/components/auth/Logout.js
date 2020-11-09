import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "reactstrap";
import { logout } from "../../redux/auth/authActions";

function Logout() {
  const dispatch = useDispatch();
  return (
    <>
      <NavLink
        onClick={() => {
          dispatch(logout());
        }}
        href="#"
      >
        Logout
      </NavLink>
    </>
  );
}

export default Logout;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "reactstrap";
import { logout } from "../../redux/auth/authActions";
import { clearItems } from "../../redux/items/itemActions";

function Logout() {
  const dispatch = useDispatch();
  return (
    <>
      <NavLink
        onClick={() => {
          dispatch(logout());
          dispatch(clearItems());
        }}
        href="#"
      >
        Logout
      </NavLink>
    </>
  );
}

export default Logout;

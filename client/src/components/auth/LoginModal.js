import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authActions";
import { clearErrors } from "../../redux/error/errorActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";

function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [error, isAuthenticated]);

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(clearErrors());
    setModal((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                className="mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                className="mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button color="dark" style={{ margin: "2rem 0" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginModal;

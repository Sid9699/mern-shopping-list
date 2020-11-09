import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/items/itemActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function ItemModal() {
  const [name, setName] = useState(false);
  const [modal, setModal] = useState("");

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const toggle = () => {
    setModal((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      dispatch(addItem(name, user.id));
    }
    if (user._id) {
      dispatch(addItem(name, user._id));
    }

    toggle();
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      {isAuthenticated ? (
        <Button onClick={toggle}>Add Item</Button>
      ) : (
        <h4 className="mb-3 ml-4">Please Log In to manage items.</h4>
      )}
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Add to shopping List.</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={(e) => setName(e.target.value)}
              />
              <Button color="dark" style={{ margin: "2rem 0" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ItemModal;

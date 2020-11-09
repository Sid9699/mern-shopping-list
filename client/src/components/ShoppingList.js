import React, { useEffect } from "react";
import { removeItem, getItems } from "../redux/items/itemActions";
import { useDispatch, useSelector } from "react-redux";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function ShoppingList() {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getItems(user._id));
    }
  }, [user]);

  const items = useSelector((state) => state.items);

  return (
    <div>
      <Container>
        <ListGroup>
          <TransitionGroup className="shooping-list">
            {isAuthenticated &&
              items.map((item) => (
                <CSSTransition key={item._id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => {
                        dispatch(removeItem(item._id));
                      }}
                    >
                      &times;
                    </Button>
                    {item.name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    </div>
  );
}

export default ShoppingList;

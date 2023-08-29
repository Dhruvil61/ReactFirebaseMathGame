import React, { useEffect } from "react";
import { Navbar, Nav, NavLink, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { changeIsLogin } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const isUserLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(changeIsLogin(true));
      navigate("/home");
    }
  }, []);

  return (
    <Navbar bg="dark" expand="md" variant="dark">
      <Navbar.Collapse id="basic-navbar-nav">
        <Container>
          <Nav className="mr-auto">
            {isUserLogin ? (
              <>
                <NavLink as={Link} to="/home">
                  Home
                </NavLink>
                <NavLink as={Link} to="/logout">
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink as={Link} to="/">
                  Login
                </NavLink>
                <NavLink as={Link} to="/signup">
                  SignUp
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavigationBar;

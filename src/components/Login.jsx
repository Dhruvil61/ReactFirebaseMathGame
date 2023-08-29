import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { changeIsLogin } from "../store";
import { useDispatch
 } from "react-redux";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('user', user.uid);
            dispatch(changeIsLogin(true));
            navigate("/home");
        })
        .catch((error) => {
            setErrorMessage('Email or password is not correct.');
            console.log("Error while login : ",error)
        });
  };

  const inputChange = (e) => {
    setErrorMessage('');
    setCredentials((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={signin}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            required
            onChange={inputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            required
            onChange={inputChange}
          />
        </Form.Group>
        {errorMessage && <p className="red">{errorMessage}</p>}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};
export default Login;

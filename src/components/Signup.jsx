import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, ref as databaseRef, set } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phoneNo: "",
    dob: "",
  });

  const [disabledSignUp, setDisableSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (userDetails.firstname.length > 1 && userDetails.lastname.length > 1) {
      var decimal =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (userDetails.password.match(decimal)) {
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (userDetails.phoneNo.match(phoneno)) {
          return true;
        } else {
          setErrorMessage("Mobile No format is not valid");
          return false;
        }
      } else {
        setErrorMessage(
          "Password must be strong. Note: 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
        );
        return false;
      }
    } else {
      setErrorMessage(
        "First name and last name length should be greater than 1"
      );
      return false;
    }
  };

  const signup = (e) => {
    e.preventDefault();
    setDisableSignUp(true);
    if (validate()) {
      setLoadingMessage("Creating user...");
      createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      )
        .then((userCreated) => {
          const user = userCreated.user;
          const file = document.getElementById("profilePic").files[0];
          uploadImage(user.uid, file, userDetails);
        })
        .catch((error) => {
          setErrorMessage("Error in user creation");
          setDisableSignUp(false);
          console.log("Error in user creation", error);
        });
    } else {
      setDisableSignUp(false);
    }
  };

  const uploadImage = (uid, file, userDetails) => {
    const storage = getStorage();
    const strgRef = storageRef(storage, uid);

    uploadBytes(strgRef, file).then((snapshot) => {
      getDownloadURL(strgRef)
        .then((url) => {
          updateProfileData(uid, userDetails, url);
        })
        .catch((error) => {
          setErrorMessage("Error while fetching profile pic");
          console.log("Error while fetching profile pic", error);
        });
    });
  };

  const updateProfileData = (uid, userDetails, profilePicURL) => {
    const db = getDatabase();
    const dbRef = databaseRef(db, "users/" + uid);
    set(dbRef, {
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      email: userDetails.email,
      phoneNo: userDetails.phoneNo,
      profilePicture: profilePicURL,
      dob: userDetails.dob,
    }).then((resp) => {
      navigate("/");
    });
  };

  const inputChange = (e) => {
    setErrorMessage("");
    setUserDetails((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Container>
      <h1>Register User</h1>
      <Form onSubmit={signup}>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              required
              onChange={inputChange}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              required
              onChange={inputChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Mobile No.</Form.Label>
          <Form.Control
            type="text"
            placeholder="1234567890"
            name="phoneNo"
            required
            onChange={inputChange}
          />
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            required
            onChange={inputChange}
          />
        </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            required
            onChange={inputChange}
          />
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.png,.jpeg"
            id="profilePic"
            required
          />
        </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            required
            onChange={inputChange}
          />
        </Form.Group>
        {errorMessage && <p className="red">{errorMessage}</p>}
        {loadingMessage && <h6 className="yellow">{loadingMessage}</h6>}
        <Button variant="primary" type="submit" disabled={disabledSignUp}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};
export default Signup;

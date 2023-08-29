import React, { useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { Button, Container, Form, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const userData = useSelector((state) => state.user);
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(setUser(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const startGame = () => {
    navigate("/game");
  };

  return (
    <Container>
      <h1>User Profile</h1>
      {Object.keys(userData).length ? (
        <>
          <div className="d-flex justify-content-center">
          <Image
            src={userData.profilePicture ? userData.profilePicture : ""}
            width={150}
            height={150}
            className="mb-3"
            roundedCircle 
          />
          </div>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control value={userData.firstname} disabled/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last name</Form.Label>
                <Form.Control value={userData.lastname} disabled />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control value={userData.phoneNo} disabled/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control value={userData.dob} disabled />
              </Form.Group>
            </Row>

           
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control value={userData.email} disabled/>
            </Form.Group>
          </Form>
          <Button onClick={startGame}>Start Game</Button>
        </>
      ) : (
        <>Loading...</>
      )}
    </Container>
  );
};
export default Home;

import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store";
import { useDispatch, useSelector
} from "react-redux";

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
      <h1>Profile</h1>
      {Object.keys(userData).length ? (
        <>
          <img
            src={userData.profilePicture ? userData.profilePicture : ""}
            width={100}
            height={100}
          />
          <h3>
            Name : {userData.firstname} {userData.lastname}
          </h3>
          <h4>Mobile No : {userData.phoneNo}</h4>
          <h4>Email : {userData.email}</h4>
          <h4>Date of Birth : {userData.dob}</h4>
          <Button onClick={startGame}>Start Game</Button>
        </>
      ) : (
        <>Loading...</>
      )}
    </Container>
  );
};
export default Home;

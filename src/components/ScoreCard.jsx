import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
 
const ScoreCard = ({ score }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Results</h2>
            <h4>Your score: {score}/10</h4>
            <Button variant="primary" onClick={()=> navigate("/home")} >Home Page!</Button>{' '}
        </div>
    );
}

export default ScoreCard;
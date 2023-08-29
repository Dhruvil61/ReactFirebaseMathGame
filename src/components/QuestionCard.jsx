import React, {useEffect, useState} from "react";
import Options from "./Options";
import { Button, Row, Col, Form } from "react-bootstrap";
 
const QuestionCard = ({question, onOptionChange, onSubmit, questionNo, selectedOption}) => {
    const [counter, setCounter] = useState(30);
    const [array, setArray] = useState(question.questionVal);
   
    useEffect(() => {
        setArray(question.questionVal);
    }, [question.questionVal]);

    useEffect(() => {
        const timer =
          counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if(!timer){
            alert("Timer runs out");
            onSubmit();
            setCounter(30);
        }
        return () => {
            clearInterval(timer);
        }
    }, [counter]);

    const onQuestionSubmit = () => {
        onSubmit();
        setCounter(30);
    }
    return(
        <div className="">
            <h3>Question {questionNo} / 10</h3> <h5>Timer: {counter}s</h5>
            <p className="red">Note: When timer finishes it go to the next question.</p>
            <Row>
                <Col>
                <Form.Control value={array[0]} disabled/>
                </Col>
                <Col>
                <Form.Control value={array[1]} disabled/>
                </Col>
                <Col>
                <Form.Control value={array[2]} disabled/>
                </Col>
            </Row>
                <Options
                    options={question.options}
                    onOptionChange={onOptionChange}
                    selectedOption={selectedOption}
                />
                <Button type="button" onClick={onQuestionSubmit} className="btn btn-primary mt-2">
                    SUBMIT
                </Button>
                
        </div>
    )
}
 
export default QuestionCard;
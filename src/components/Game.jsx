import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import QuestionCard from "./QuestionCard";
import ScoreCard from "./ScoreCard";

const Game = () => {
  const uniqueQuestion = {};
  const totalQuestion = 10;
  const symbols = ["+", "-", "*", "/"];

  const [questionDetails, setQuestionDetails] = useState({
    questions: [],
    currentQuestion: 0,
    score: 0,
    quizFinished: false,
    selectedOption: "",
  });

  useEffect(() => {
    if (
      Object.keys(uniqueQuestion).length === 0 &&
      Object.keys(uniqueQuestion).length < totalQuestion
    )
      createQuestion();
  }, []);

  const handleOptionChange = (e) => {
    e.preventDefault();
    setQuestionDetails((prevState) => ({
      ...prevState,
      selectedOption: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    checkAnswer();
    handleNextQuestion();
  };

  useEffect(() => {
    console.log(setQuestionDetails.selectedOption);
  }, [setQuestionDetails.selectedOption])

  const checkAnswer = () => {
    const { questions, currentQuestion, selectedOption } = questionDetails;
    console.log(selectedOption, questions[currentQuestion].answer.toString())
    if (selectedOption === questions[currentQuestion].answer.toString()) {
      setQuestionDetails((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
      }));
    }
  };

  const handleNextQuestion = () => {
    const { questions, currentQuestion } = questionDetails;
    if (currentQuestion + 1 < questions.length) {
      setQuestionDetails((prevState) => ({
        ...prevState,
        currentQuestion: prevState.currentQuestion + 1,
        selectedOption: "",
      }));
    } else {
      setQuestionDetails((prevState) => ({
        ...prevState,
        quizFinished: true,
      }));
    }
  };

  const generateEquation = () => {
    const val1 = Math.floor(Math.random() * 10);
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const val2 = Math.floor(Math.random() * 10);
    return val1 + symbol + val2;
  };

  const generateUniqueOption = (answer) => {
    var uniqueOptions = [];
    while (uniqueOptions.length < 3) {
      var uniqueOption = Math.floor(Math.random() * 100) + 1;
      if (!uniqueOptions.includes(uniqueOption) && uniqueOption !== answer) {
        uniqueOptions.push(uniqueOption);
      }
    }
    return uniqueOptions;
  };

  const createQuestion = () => {
    var questionArray = [];
    for (var i = 0; i < totalQuestion; i++) {
      var equation = generateEquation();
      while (uniqueQuestion[equation]) {
        equation = generateEquation();
      }
      const answer = parseInt(eval(equation));
      const randomOptions = generateUniqueOption(answer);
      const options = [];
      const randomAnswerIndex = Math.floor(Math.random() * 4);
      var randomOptionsIndex = 0;
      for (var j = 0; j < 4; j++) {
        if (randomAnswerIndex == j) {
          options.push(answer.toString());
        } else {
          options.push(randomOptions[randomOptionsIndex].toString());
          randomOptionsIndex++;
        }
      }
      var questionObj = {
        question: equation,
        questionVal: equation.split(""),
        answer,
        options: options,
      };

      questionArray.push(questionObj);
      uniqueQuestion[equation] = 1;
    }
    setQuestionDetails((prevState) => ({
      ...prevState,
      questions: questionArray,
    }));
  };

  return (
    <Container>
      {!questionDetails.quizFinished &&
        questionDetails.questions.length === totalQuestion && (
          <QuestionCard
            question={
              questionDetails.questions[questionDetails.currentQuestion]
            }
            questionNo={questionDetails.currentQuestion + 1}
            onOptionChange={handleOptionChange}
            onSubmit={handleSubmit}
            selectedOption={questionDetails.selectedOption}
          />
        )}

      {questionDetails.quizFinished && (
        <ScoreCard score={questionDetails.score} />
      )}
    </Container>
  );
};
export default Game;

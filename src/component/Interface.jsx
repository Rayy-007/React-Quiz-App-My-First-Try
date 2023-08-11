import React from "react";
import Question from "./Question";
import QandA from "../data";
import { nanoid } from "nanoid";
function Interface() {
  const [start, setStart] = React.useState(false);

  //Fetch data
  const [data, setData] = React.useState(QandA);

  //For chedking the answer
  const [selectedAnswer, setSelectedAnswer] = React.useState([]);

  //Clicked Button (MuliChoices)
  // const [clicked, setClicked] = React.useState([]);
  // const [checkClickedValue, SetCheckClickedValue] = React.useState(false);

  // Geting the questiono and answer from ((data API)),

  const newQuestions = data.map((question) => {
    const combinedAnswers = [
      question.correct_answer,
      ...question.incorrect_answers,
    ];
    const answersWithIds = combinedAnswers.map((answer) => ({
      answer,
      id: nanoid(),
      isSlected: false,
    }));
    return {
      question: question.question,
      answers: { answersWithIds },
      answerCorrect: question.correct_answer, // i can do it like that 'answers: answerWidhIds' <== It might more simple than it was *** but I choose the hard way so that i can create my own problme 😂
    };
  });
  // console.log(newQuestions);
  const [quiz, setQuiz] = React.useState(newQuestions);

  // async function getQ() {
  //   const log = await data.question;
  // }

  // getQ();

  // console.log(data[0].incorrect_answers);
  //   React.useEffect(() => {
  //     fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  //       .then((res) => res.json())
  //       .then((fetchData) => setData(fetchData.results));
  //   }, []);
  //   React.useEffect(() => {
  //     async function getData() {
  //       const res = await fetch(
  //         "https://opentdb.com/api.php?amount=5&type=multiple"
  //       );
  //       const fetchData = await res.json();
  //       setData(fetchData.results);
  //     }
  //     getData();
  //   }, []);
  //   console.log(data[0].question);

  function changeBgColor(event) {
    const { value, id } = event.target;

    setSelectedAnswer((prevSlAns) => {
      return [...prevSlAns, value];
    });

    console.log(value, id);
    setQuiz((prevQuiz) => {
      return prevQuiz.map((q) => {
        return {
          ...q,
          answers: {
            answersWithIds: q.answers.answersWithIds.map((i) => {
              return i.id === id ? { ...i, isSlected: !i.isSlected } : i;
            }),
          },
        };
      });
    });

    // setClicked((prev) => [...prev, value]);
  }
  // console.log(" clicked", clicked);
  // console.log(quiz);
  console.log("selected answer", selectedAnswer);
  // console.log("isANser true? : ");

  function getStart() {
    setStart(true);
  }

  function checkAnswer() {
    setQuiz((prevQuiz) => {
      return prevQuiz.map((q) => {
        return {
          ...q,
          answers: {
            answersWithIds: q.answers.answersWithIds.map((i, index) => {
              const isAnswerCorrect = selectedAnswer.includes(i.answer);
              // console.log("isANswerCorrect ::", isAnswerCorrect);
              return isAnswerCorrect ? { ...i, isAnswerTrue: true } : i;
            }),
          },
        };
      });
    });
    // console.log(
    //   "isANser true? : ",
    //   quiz[0].answers.answersWithIds[0].isAnswerTrue
    // );
    // const correctAns = quiz.map((q) => {
    //   return q.answers.answersWithIds.map((a) => a.answer);
    // });
    // console.log("C", correctAns);

    // let ccCorrectAns;
    // for (let i = 0; i < correctAns.length; i++) {
    //   ccCorrectAns = correctAns[i];
    // }

    // const isAnswerCorrect = selectedAnswer.map((ans) => {
    //   return ans === ccCorrectAns[0] ? true : false;
    // });
    // console.log("for loop correctAns  ", ccCorrectAns[0]);
    // console.log("isAnswerCorrect", isAnswerCorrect);

    // const isAnswerCorrect = correctAns
    //   .map((mcA) =>
    //     console.log(
    //       "mcaM",
    //       selectedAnswer.every((slA) => mcA.map((mcaM) => mcaM[0] === slA))
    //     )
    //   )
    //   .every((cA) => console.log("ca", cA));

    // // console.log("new array", newArray);
    // // console.log("SC", selectedAnswer);
    // console.log("isC", isAnswerCorrect);
  }

  const questionElement = quiz.map((q) => {
    return (
      <Question
        key={q.question}
        // id={generatingId()}
        question={q.question}
        answers={q.answers}
        onHandleClick={changeBgColor}
        // checkingC={}
      />
    );
  });

  return (
    <div className="container">
      {start ? (
        <div className="question-container">
          {questionElement}
          <button onClick={checkAnswer} className="check-btn">
            Check answers
          </button>
        </div>
      ) : (
        <div className="intro-container">
          <h1>Quizzical</h1>
          <p>Get Take A Challanges</p>
          <button onClick={getStart}>Start quiz</button>
        </div>
      )}
    </div>
  );
}

export default Interface;

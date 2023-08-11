import React from "react";
import Choices from "./Choices";
function Question(props) {
  const choicesElement = props.answers.answersWithIds.map((c) => {
    return (
      <Choices
        key={c.id}
        id={c.id}
        multiChoices={c.answer}
        onHandleClick2={props.onHandleClick}
        isSlected={c.isSlected}
        isAnswerTrue={c.isAnswerTrue}
      />
    );
  });

  return (
    <>
      <div className="main-container">
        <h2>{props.question}</h2>
        <div className="btn-container">
          {choicesElement}
          {/* <div className="btn">{props.correctAnswer}</div> */}
          {/* <span className="btn">Adiós</span>
          <span className="btn">Hola</span>
          <span className="btn">Au Revoir</span>
          <span className="btn">Rubik’s Cube</span> */}
        </div>
      </div>
    </>
  );
}

export default Question;

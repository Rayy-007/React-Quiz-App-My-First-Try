import React from "react";
function Choices(props) {
  const styles = {
    background: props.isAnswerTrue === true ? "green" : "",
  };

  return (
    <>
      <input
        onClick={(e) => props.onHandleClick2(e)}
        id={props.id}
        className={props.isSlected ? "btn clickedBtn" : "btn"}
        type="button"
        value={props.multiChoices}
        style={styles}
      />
    </>
  );
}

export default Choices;

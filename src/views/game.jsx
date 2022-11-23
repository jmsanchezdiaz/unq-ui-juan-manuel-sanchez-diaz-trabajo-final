import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { API } from "../service";

const Game = () => {
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [winner, setWinner] = useState(false);
  const [answerObject, setAnswerObject] = useState(null);
  const { id, question, ...options } = currentQuestion;
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const difficulty = queryParams.get("difficulty") || "easy";

  const correctCount =
    questions.indexOf(currentQuestion) >= 0
      ? questions.indexOf(currentQuestion)
      : 0;

  const startGame = () => {
    API.getQuestions(difficulty).then((response) => {
      setWinner(false);
      setAnswerObject(null);
      setQuestions(response.data);
      setCurrentQuestion(response.data[0]);
    });
  };

  useEffect(startGame, [queryParams]);

  const nextQuestion = () => {
    const nextQuestionIndex = questions.indexOf(currentQuestion) + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(questions[nextQuestionIndex]);
      setAnswerObject(null);
    } else setWinner(true);
  };

  if (winner) {
    return <h1>Winner!</h1>;
  }

  return (
    <div className="space-y-5">
      <header className="flex justify-between px-2 align-middle">
        <span className="font-bold text-2xl ">
          <span className="text-green-500">{correctCount}</span>/
          {questions.length}
        </span>
        <h3 className="font-bold font-mikado text-3xl tracking-widest">
          {difficulty.toUpperCase()}
        </h3>
        <button onClick={() => navigate("/")} aria-label="go-to-home">
          <AiOutlineHome size={30} />
        </button>
      </header>
      <p className="text-2xl py-2">{question}</p>
      <div className="flex flex-col gap-3 ">
        {Object.entries(options).map(([key, value]) => {
          const selectedButtonStyle =
            answerObject?.option === key && answerObject?.answer
              ? "rounded-lg px-4 py-2 bg-green-500 hover:bg-green:800 text-white font-bold"
              : "rounded-lg  text-white font-bold px-4 py-2 bg-violet-600  hover:bg-violet-800";
          return (
            <button
              key={key}
              onClick={() => {
                !answerObject &&
                  API.answer(id, key).then((response) =>
                    setAnswerObject({ ...response.data, option: key })
                  );
              }}
              className={selectedButtonStyle}>
              {value}
            </button>
          );
        })}
      </div>

      {answerObject && answerObject.answer && (
        <button
          onClick={nextQuestion}
          className="px-4 py-2 rounded-lg  w-full my-2 bg-green-600 text-white font-bold hover:bg-green-800">
          Next Question
        </button>
      )}
      {answerObject && !answerObject.answer && (
        <button
          onClick={startGame}
          className="px-4 py-2 rounded-lg w-full my-2 bg-yellow-600 text-white font-bold hover:bg-yellow-800">
          Play Again
        </button>
      )}
      <footer>
        <p className="text-center text-gray-500">
          Made with ❤️ by Juan Manuel Sanchez Diaz
        </p>
      </footer>
    </div>
  );
};

export default Game;

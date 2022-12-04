import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { API } from "../service";
import Spinner from "../components/spinner";
import WinnerModal from "../components/winnerModal";
import useAudio from "../hooks/useAudio";

const Game = () => {
  const { play, changeFor } = useAudio();
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [winner, setWinner] = useState(false);
  const [loading, setLoading] = useState(true);
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
    API.getQuestions(difficulty)
      .then((response) => {
        setWinner(false);
        setAnswerObject(null);
        setQuestions(response.data);
        setCurrentQuestion(response.data[0]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(startGame, [queryParams]);

  useEffect(() => {
    if (answerObject) {
      changeFor(
        answerObject.answer
          ? "/public/assets/sounds/correct_sound.wav"
          : "/public/assets/sounds/wrong_sound.wav"
      );
      play();
    }
  }, [answerObject]);

  const nextQuestion = () => {
    const nextQuestionIndex = questions.indexOf(currentQuestion) + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(questions[nextQuestionIndex]);
      setAnswerObject(null);
    } else setWinner(true);
  };

  if (loading) return <Spinner />;

  if (winner) {
    return ReactDOM.createPortal(
      <WinnerModal open />,
      document.getElementById("container")
    );
  }

  return (
    <div className="space-y-5 ">
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
      <div className="flex flex-col gap-3 w-full ">
        {Object.entries(options).map(([key, value]) => {
          let selectedButtonStyle = "text-2xl button-violet";

          if (answerObject?.answer && answerObject?.option === key) {
            selectedButtonStyle = "text-2xl button-success";
          }
          if (!answerObject?.answer && answerObject?.option === key) {
            selectedButtonStyle = "text-2xl button-danger";
          }

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
          className=" text-2xl w-full my-2 button-success">
          Next Question
        </button>
      )}
      {answerObject && !answerObject.answer && (
        <button
          onClick={startGame}
          className="button-warning text-2xl w-full my-2 ">
          Play Again
        </button>
      )}
      <footer>
        <p className="text-center text-2xl text-gray-500">
          Made with ❤️ by Juan Manuel Sanchez Diaz
        </p>
      </footer>
    </div>
  );
};

export default Game;

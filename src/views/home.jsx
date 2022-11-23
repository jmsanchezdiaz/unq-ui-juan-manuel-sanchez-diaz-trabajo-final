import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WinnerModal from "../components/winnerModal";
import { API } from "../service";

const Home = () => {
  const navigate = useNavigate();
  const [difficultyOptions, setDifficultyOptions] = useState([]);

  useEffect(() => {
    API.getDifficulties().then((response) => {
      setDifficultyOptions(response.data);
    });
  }, []);

  return (
    <div className="space-y-2 text-center">
      <h2 className="text-5xl font-mikado">Preguntados</h2>
      <h5 className="text-gray-700 font-bold text-xl">Choose a difficulty</h5>
      <div className="flex flex-col gap-4">
        {difficultyOptions.map((difficulty) => (
          <button
            onClick={() =>
              navigate(difficulty ? `/game?difficulty=${difficulty}` : "/game")
            }
            className="px-4 py-2 rounded-lg w-full bg-violet-600 text-white font-bold hover:bg-violet-800">
            {difficulty.toUpperCase()}
          </button>
        ))}
      </div>
      <WinnerModal open />
    </div>
  );
};

export default Home;

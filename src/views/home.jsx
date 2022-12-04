import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import { API } from "../service";

const Home = () => {
  const navigate = useNavigate();
  const [difficultyOptions, setDifficultyOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getDifficulties()
      .then((response) => {
        setDifficultyOptions(response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-5xl font-mikado">Preguntados</h2>
      <h5 className="text-gray-400 font-bold text-xl">Choose a difficulty</h5>
      <div className="flex flex-col gap-4">
        {!loading &&
          difficultyOptions.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() =>
                navigate(
                  difficulty ? `/game?difficulty=${difficulty}` : "/game"
                )
              }
              className="px-4 text-2xl py-2 rounded-lg w-full button-violet">
              {difficulty.toUpperCase()}
            </button>
          ))}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Home;

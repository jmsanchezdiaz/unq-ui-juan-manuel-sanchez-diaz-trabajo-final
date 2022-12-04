import React, { useEffect } from "react";
import { AiOutlineSound } from "react-icons/ai";
import useAudio from "../hooks/useAudio";

const Layout = ({ children }) => {
  const { play, toggle, audioTurnOff } = useAudio(
    "/public/assets/sounds/background_music.mp3"
  );

  useEffect(() => {
    !audioTurnOff && play(true);
  }, []);

  return (
    <div
      id="container"
      className="h-screen text-4xl p-2 flex flex-col text-white">
      <button
        aria-label="toggle sound"
        className="self-end justify-self-stretch"
        onClick={toggle}>
        <AiOutlineSound />
      </button>
      <section className="max-w-lg mx-auto py-2 ">{children}</section>
    </div>
  );
};

export default Layout;

import React, { useEffect } from "react";

const useAudio = (url) => {
  const audioRef = React.useRef(new Audio(url));
  const [audioTurnOff, setAudioTurnOff] = React.useState(
    JSON.parse(window.localStorage.getItem("audioTurnOff")) || false
  );

  useEffect(
    () => window.localStorage.setItem("audioTurnOff", audioTurnOff),
    [audioTurnOff]
  );

  const toggle = () =>
    audioRef.current && audioRef.current.paused ? play() : pause();

  const play = (loop) => {
    if (audioRef?.current) {
      audioRef.current.loop = loop;
      audioRef.current.play();
      setAudioTurnOff(false);
    }
  };

  const volume = (value) =>
    audioRef.current && (audioRef.current.volume = value);

  const pause = () => {
    audioRef?.current && audioRef.current.pause();
    setAudioTurnOff(true);
  };
  const stop = () => {
    audioRef?.current &&
      audioRef.current.pause() &&
      (audioRef.current.currentTime = 0);
  };
  const changeFor = (url) => (audioRef.current.src = url);

  return {
    audioRef,
    audioTurnOff,
    play,
    pause,
    volume,
    toggle,
    stop,
    changeFor
  };
};

export default useAudio;

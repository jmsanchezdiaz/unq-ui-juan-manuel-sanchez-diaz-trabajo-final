import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAudio from "../hooks/useAudio";

const WinnerModal = ({ open }) => {
  const { play } = useAudio("/public/assets/sounds/winner_sound.wav");
  const modalRef = useRef();
  const navigate = useNavigate();
  const closeModal = () => modalRef.current && modalRef.current.close();

  const handleModalClose = () => {
    closeModal();
    navigate("/");
  };

  useEffect(() => {
    if (open) {
      play();
    }
  }, []);

  return (
    <dialog
      open={open}
      ref={modalRef}
      onClose={handleModalClose}
      className="fixed z-10 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative  mx-auto p-3 border w-96 shadow-lg rounded-md bg-white space-y-3">
        <h2 className="text-2xl font-bold">Congratulations! 🏆</h2>
        <p className="text-lg">
          You have completed the quiz. You can now go back to the home page.
        </p>
        <img
          src="public/assets/image/winner meme.gif"
          className="w-full"
          alt="winner meme gif"
        />
        <div className="flex justify-end">
          <button
            onClick={handleModalClose}
            className="px-4 py-2 rounded-lg text-2xl w-full my-2 bg-green-600 text-white font-bold hover:bg-green-800">
            Go to Home
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default WinnerModal;

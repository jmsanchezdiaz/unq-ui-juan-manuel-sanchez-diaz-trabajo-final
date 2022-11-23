import React, { useRef } from "react";

const WinnerModal = ({ open }) => {
  const modalRef = useRef();
  const closeModal = () => modalRef.current && modalRef.current.close();

  return (
    <dialog
      open={open}
      ref={ref}
      onClose={() => console.log("closing")}
      className="fixed z-10 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white space-y-3">
        Holasasdasd
        <button onClick={closeModal}>x</button>
      </div>
    </dialog>
  );
};

export default WinnerModal;

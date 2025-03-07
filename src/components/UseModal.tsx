import React from "react";

interface AppModalProps {
  title: string;
  content: string;
  onClose?: () => void;
}

export const AppModal: React.FC<AppModalProps> = ({
  title,
  content,
  onClose = () => {},
}) => {
  const modalDOMId = "modal_dialog";

  return (
    <dialog id={modalDOMId} className="rounded-md">
      <div className="bg-white px-14 p-5 rounded-xl">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{content}</p>
        <div>
          <form method="dialog">
            <button
              onClick={() => onClose()}
              className="px-5 p-1 focus:outline-none rounded-md bg-gray-200 hover:bg-gray-400 border-gray-200 text-black"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const modalDOMId = "modal_dialog";

export const triggerModal = () => {
  const modalElement = document.getElementById(modalDOMId) as HTMLDialogElement;
  if (modalElement) {
    modalElement.showModal();
  }
};

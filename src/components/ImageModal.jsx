import React from "react";
import "../styles/Image.scss";

const ImageModal = ({ imageUrl, onClose }) => {
  const closeModal = () => onClose();

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Full Size" className="modal-image" />
      </div>
    </div>
  );
};

export default ImageModal;

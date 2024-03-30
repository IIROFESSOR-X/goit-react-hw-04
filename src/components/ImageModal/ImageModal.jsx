import Modal from "react-modal";

 Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onRequestClose, image }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
             <div>
                {image && (
                    <img
                        src={image.urls.regular}
                        alt={image.description}
                    />
                )}
                <button onClick={onRequestClose}>Close</button>
            </div>
        </Modal>
         );
};


export default ImageModal;

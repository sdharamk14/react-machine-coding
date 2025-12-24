import { useEffect, useRef, useState } from "react";
import "./modal.css";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  onClose,
  open,
  title = "",
  showActionButton = false,
  okButtonText = "Ok",
  handleOk = () => {},
  closeWithEscKey = true,
}) => {
  const containerRef = useRef();

  function handleKeyDown(e) {
    e.stopPropagation();
    if (closeWithEscKey && e.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!open) return null;

  const showClose = onClose && typeof onClose === "function";
  const bodyEl = document.getElementsByTagName("body")?.[0];

  return createPortal(
    <div ref={containerRef} className="dialog">
      <div className="dialog-backdrop"></div>
      <div className="dialog-content">
        <div className="dialog-title">
          <h2>{title}</h2>
          {showClose && <button onClick={onClose}>&times;</button>}
        </div>
        <div className="dialog-body">{children}</div>
        {showClose && (
          <div className="dialog-footer">
            <button onClick={onClose}>Close</button>
            {showActionButton && (
              <button onClick={handleOk}>{okButtonText}</button>
            )}
          </div>
        )}
      </div>
    </div>,
    bodyEl
  );
};

export const ModalDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open Modal {open.toString()}
      </button>
      <Modal onClose={() => setOpen(false)} open={open}>
        <h1>Modal</h1>
      </Modal>
    </>
  );
};

export default Modal;

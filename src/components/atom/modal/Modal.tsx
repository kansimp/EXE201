import React, { useEffect, useRef, ReactNode } from "react";
import Headline from "./Headline";

// Định nghĩa kiểu props
interface ModalProps {
  children: ReactNode;
  className?: string;
  show: boolean;
  onHide: () => void;
  size?: "sm" | "md" | "lg" | "xs" | "auto";
}

// Khung cơ bản cho Modal
const Modal: React.FC<ModalProps> = ({ children, className = "", show, onHide, size = "sm" }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = (event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement;

    if (modalRef.current && !modalRef.current.contains(target) && target.classList.contains("modal-container")) {
      onHide();
    }

    if (target.classList.contains("cancel-mark") || target.closest(".cancel-mark")) {
      onHide();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onHide();
      }
    };

    if (show) {
      document.body.style.overflow = "hidden";
      document.body.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      document.body.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onHide]);

  const modalSizeClasses = {
    lg: "max-w-[1400px]",
    md: "max-w-[1100px]",
    sm: "max-w-[600px]",
    xs: "max-w-[400px]",
    auto: "max-w-full",
  };

  return (
    <div data-testid="modal-test">
      <div
        className={`modal-container fixed inset-0 bg-black bg-opacity-80 transition-opacity ${
          show ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        onKeyDown={handleClose}
      >
        <div
          className={`modal ${className} ${
            show ? "translate-y-0" : "-translate-y-20"
          } transition-transform rounded-2xl bg-white shadow-lg mx-auto mt-20 ${modalSizeClasses[size]}`}
          ref={modalRef}
          onClick={handleClose}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Modal Header
const ModalHeader: React.FC<{ content?: string; className?: string }> = ({
  content = "New Content",
  className = "",
}) => (
  <div
    data-testid="modal-test-header"
    className={`modal-header flex justify-center items-center bg-gray-800 rounded-t-2xl p-2 ${className}`}
  >
    <Headline content={content} type={"h4"} className="text-white font-bold text-center flex-grow" />
  </div>
);

// Modal Body
const ModalBody: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div data-testid="modal-test-body" className="modal-body max-h-550 overflow-auto">
    {children}
  </div>
);

// Modal Footer
const ModalFooter: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`modal-footer ${className}`}>{children}</div>
);

export { Modal, ModalHeader, ModalBody, ModalFooter };

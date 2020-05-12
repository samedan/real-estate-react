import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const BwmModal = ({
  title = 'Modal window',
  subtitle = 'Confirm your data',
  openBtn: OpenBtn, // alias
  onModalSubmit,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!OpenBtn ? (
        <button className="btn btn-success" onClick={() => setIsOpen(true)}>
          Open
        </button>
      ) : (
        <div onClick={() => setIsOpen(true)}>{OpenBtn}</div>
      )}

      <Modal
        focusTrapped={false}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        classNames={{ modal: 'bwm-modal' }}
      >
        <h4 className="modal-title title">{title}</h4>
        <p className="modal-subtitle">{subtitle}</p>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            onClick={onModalSubmit}
            type="button"
            className="btn btn-bwm-main"
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-alert"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BwmModal;

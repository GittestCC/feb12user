// Example options
// {
//   onConfirm: someFunctionCallBack() // required
//   text: { title, message, confirmText, cancelText, confirmClass, cancelClass } // at least one is required
//   isOpen: boolean // required
//   onClose: functionToCloseCallBack() // optional
//   className: "super-special-modal-class" // optional
// }

import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

const ConfirmModal = ({ options }) => {
  return (
    <Modal
      isOpen={options.isOpen}
      className={`kh-modal ${options.className ? options.className : ''}`}
    >
      <div className="kh-modal-title">{options.text.title}</div>
      <div className="kh-modal-body">
        {options.text.message && (
          <div className="full-width-field">
            <h4>{options.text.message}</h4>
          </div>
        )}

        <div className="kh-modal-actions">
          <button
            onClick={() => options.onClose}
            className={`button secondary ${options.text.cancelClass
              ? options.text.cancelClass
              : ''}`}
          >
            Cancel
          </button>

          <button
            onClick={() => options.onConfirm}
            className={`button ${options.text.confirmClass
              ? options.text.confirmClass
              : ''}`}
          >
            Add New Environment
          </button>
        </div>
      </div>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  options: PropTypes.object.isRequired
}

export default ConfirmModal

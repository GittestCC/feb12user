import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import VersionCreateForm from './VersionCreateForm'

const VersionCreateModal = ({
  isOpen,
  title,
  submitLabel,
  baseVersions,
  onClose,
  onSubmit
}) => {
  return (
    <Modal
      isOpen={isOpen}
      className="kh-modal"
      overlayClassName="kh-overlay"
      contentLabel="New Version Modal"
      shouldCloseOnOverlayClick={false}
    >
      <div className="kh-modal-title">{title}</div>
      <div className="kh-modal-body">
        <VersionCreateForm
          onClose={onClose}
          onSubmit={onSubmit}
          submitLabel={submitLabel}
          baseVersions={baseVersions}
        />
      </div>
    </Modal>
  )
}

VersionCreateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  baseVersions: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default VersionCreateModal

import React from 'react'
import Modal from 'react-modal'
import VersionCreateForm from './VersionCreateForm'

const VersionCreateModal = ({
  isOpen,
  title,
  submitLabel,
  onClose,
  onSubmit,
  baseVersions
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

export default VersionCreateModal

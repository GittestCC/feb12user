import React from 'react'
import Modal from 'react-modal'
import {
  AddNewEnvironmentModalForm,
  DeployModalForm,
  CancelDeploymentForm,
  ShutDown
} from './childModals'

const KintoAppEnvironmentModal = ({
  isOpen,
  onClose,
  modalType,
  kintoApp,
  environment,
  addNewEnvironment,
  deployEnvironment
}) => {
  const getModal = modalType => {
    switch (modalType) {
      case 'add':
        return (
          <AddNewEnvironmentModalForm
            onClose={onClose}
            addNewEnvironment={addNewEnvironment}
            kintoApp={kintoApp}
          />
        )
      case 'deploy':
      case 'new':
        return (
          <DeployModalForm
            onClose={onClose}
            deployEnvironment={deployEnvironment}
            kintoApp={kintoApp}
            environment={environment}
          />
        )
      case 'testing':
        return (
          <CancelDeploymentForm
            onClose={onClose}
            deployEnvironment={deployEnvironment}
            kintoApp={kintoApp}
            environment={environment}
          />
        )
      case 'shutDown':
        return (
          <ShutDown
            onClose={onClose}
            deployEnvironment={deployEnvironment}
            kintoApp={kintoApp}
            environment={environment}
          />
        )
      default:
        return <h1>{modalType} This modalType is not defined</h1>
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      className="kh-modal environment"
      overlayClassName="kh-overlay"
      contentLabel="New Environment Modal"
      shouldCloseOnOverlayClick={false}
    >
      {getModal(modalType)}
    </Modal>
  )
}

export default KintoAppEnvironmentModal

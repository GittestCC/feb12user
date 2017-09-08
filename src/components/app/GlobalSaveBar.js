import React from 'react'
import { Button } from '../forms'

const GlobalSaveBar = ({ isShown, formId, submitLabel }) => (
  <div className={`global-save-bar ${isShown ? 'show' : ''}`}>
    <Button form={formId}>{submitLabel}</Button>
  </div>
)

export default GlobalSaveBar

import React from 'react'
import { Button } from '../forms'

const GlobalSaveBar = ({ isShown, submitLabel, onSubmit }) => (
  <div className={`global-save-bar ${isShown ? 'show' : ''}`}>
    <Button onClick={onSubmit}>{submitLabel}</Button>
  </div>
)

export default GlobalSaveBar

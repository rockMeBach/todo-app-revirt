import React from 'react'
import './Dialog.css'
import { Alert } from 'react-bootstrap'

const Dialog = ({message}) => {
  return (
    <div className='Dialog'>
        <Alert variant="dark">
            {message}
        </Alert>
    </div>
  )
}

export default Dialog
import React from 'react'
import './Loading.css'
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className='Loading'>
        <Spinner animation="border" role="status" style={
            {
                padding: 30,
                alignSelf: 'center',
                color: 'white'
            }
        } />
    </div>
  )
}

export default Loading
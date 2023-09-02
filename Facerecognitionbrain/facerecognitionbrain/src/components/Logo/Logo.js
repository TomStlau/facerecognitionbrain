import React from 'react'
import { Tilt } from 'react-tilt'

const defaultOptions = {
  reverse: true, // reverse the tilt direction
  max: 40, // max tilt rotation (degrees)
  perspective: 200, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: 'cubic-bezier(.03,.98,.52,.99)' // Easing on enter/exit.
}

const Logo = () => {
  return (
    <div className='ma4 mt0' style={{ width: '150px' }}>
      <Tilt options={defaultOptions}>
        <div
          className='br4 shadow-2'
          style={{
            height: 150,
            width: 150,
            background: 'linear-gradient(270deg, #FF5EDF 0%, #04C8DE 100%)'
          }}
        >
          <div className='pa3'>
            <img
              style={{ paddingTop: '5px', height: 100, width: 100 }}
              alt='brain logo'
              src='https://img.icons8.com/ios/452/brain.png'
            />
          </div>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo

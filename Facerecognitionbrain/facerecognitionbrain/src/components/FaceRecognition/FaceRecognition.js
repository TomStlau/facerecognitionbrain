import React from 'react'

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center flex justify-around'>
      <div className='absolute mt2'>
        <img
          id='inputimage'
          alt=''
          src={imageUrl}
          width='500px'
          height='auto'
        />
        {box.length > 0 &&
          box.map((box, index) => (
            <div
              key={index}
              className='bounding-boxes'
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
              }}
            ></div>
          ))}
      </div>
    </div>
  )
}

export default FaceRecognition

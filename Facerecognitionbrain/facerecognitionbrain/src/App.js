import './App.css'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import React from 'react'
import Rank from './components/Rank/Rank'
import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import ParticlesCongig from './components/ParticlesConfig/ParticlesConfig'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'

function App () {
  const [route, setRoute] = React.useState('signin')
  const [input, setInput] = React.useState('')
  const [myImage, setMyImage] = React.useState('')

  const PAT = 'e8fa55844ea24587969cfd8b31d4410a'
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'tomstlau'
  const APP_ID = 'test'
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection'
  const IMAGE_URL = input

  const [signedIn, setSignedIn] = React.useState(false)

  const onRouteChange = route => {
    if (route === 'signout') {
      setSignedIn(false)
    } else if (route === 'home') {
      setSignedIn(true)
    }

    setRoute(route)
  }
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL
          }
        }
      }
    ]
  })

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT
    },
    body: raw
  }
  const particlesInit = useCallback(async engine => {
    await loadFull(engine)
  }, [])

  const onInputChange = event => {
    setInput(event.target.value)
  }
  const calculateFaceLocation = data => {
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return data.outputs[0].data.regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      }
    })
  }

  const [faceBox, setFaceBox] = React.useState({})

  const displayFaceBox = box => {
    setFaceBox(box)
  }

  const onButtonSubmit = () => {
    setMyImage(input)
    fetch(
      'https://api.clarifai.com/v2/models/' + MODEL_ID + '/outputs',
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        const faceLocation = calculateFaceLocation(result)
        displayFaceBox(faceLocation)
      })

      .catch(error => console.log('error', error))
  }

  return (
    <div className='App'>
      <Particles
        id='tsparticles'
        init={particlesInit}
        style={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        options={ParticlesCongig}
      />
      <Navigation onRouteChange={onRouteChange} isSignedIn={signedIn} />
      {route === 'home' ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={myImage} box={faceBox} />
        </div>
      ) : route === 'signin' ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  )
}

export default App
